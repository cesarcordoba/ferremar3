"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const localStrategy = require("passport-local");
const facebookStrategy = require("passport-facebook");
const twitterStrategy = require("passport-twitter");
const googleStrategy = require("passport-google-oauth20");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const fb_1 = require("fb");
const config_1 = require("../../conf/config");
const modelo_1 = require("../avatar/modelo");
const modelo_2 = require("../llave/modelo");
const modelo_3 = require("../usuario/modelo");
const modelo_4 = require("../log/modelo");
var isProduction = false;
var resource_name = 'https://sandbox-api.openpay.mx';
//class
var Openpay = require('openpay');
//instantiation
var openpay = new Openpay('mzbzo4aoqvcld7vl9f9s', 'sk_6d675d731d594f29ba1466f2ee379e50', [isProduction]);
openpay.setMerchantId('mzbzo4aoqvcld7vl9f9s');
openpay.setPrivateKey('sk_6d675d731d594f29ba1466f2ee379e50');
openpay.setProductionReady(false);
fb_1.FB.options({ version: 'v3.2' });
fb_1.FB.setAccessToken('2026186280804066|I5JLMlJX4lusSeAkzt73eMT9cXA');
var crearCliente = (usuario) => new Promise((resolve, reject) => {
    usuario.$get('Llave')
        .then(llave => _.isNull(llave.IdOpenpay) ?
        openpay.customers.create({ 'name': usuario.nombre, 'email': usuario.correo, 'requires_account': false }, (error, customer) => modelo_2.Llave.update({ IdOpenpay: customer.id }, { where: { IdUsuario: usuario.id } }).then(() => resolve(usuario)))
        : resolve(usuario));
});
class AutentificacionController {
    //  Inicia el constructor
    constructor() {
        // Termina el constructor
        //
        // Metodos
        this.token = (req, res, next) => jwt.verify(req.params.token, config_1.config.token_secreto, (err, decoded) => {
            if (err)
                res.send({ success: false, message: 'token invlid' });
            else
                res.json(decoded);
        });
        this.login = (req, res, next) => passport.authenticate('login', (err, user, info) => {
            if (err)
                return next(err);
            if (!user)
                return res.send({ success: false, message: 'Incorrect username or password.' });
            req.login(user, (err) => {
                if (err)
                    return next(err);
                var token = jwt.sign({
                    user: user
                }, config_1.config.token_secreto, { expiresIn: '24h' });
                return res.send({ success: true, message: 'Authentication succeeded', token: token });
            });
        })(req, res, next);
        this.registro = (req, res, next) => passport.authenticate('registro', (err, user, info) => {
            if (err)
                return next(err);
            if (!user)
                return res.send({ success: false, message: info });
            req.login(user, (err) => {
                if (err)
                    return next(err);
                var token = jwt.sign({
                    user: user
                }, config_1.config.token_secreto, { expiresIn: '24h' });
                return res.send({ success: true, message: 'Authentication succeeded', token: token, usuario: user });
            });
        })(req, res, next);
        this.tokenSocial = (req, res, next) => modelo_3.Usuario.findOne({ where: { 'correo': req.user.correo } })
            .then(usering => jwt.sign({ user: usering }, config_1.config.token_secreto, { expiresIn: '1h' }))
            .then(token => res.redirect(config_1.config.keys.url + 'social/' + token));
        this.avatar = (req, res, next) => modelo_3.Usuario.findById(req.params.id, { include: [modelo_2.Llave] })
            .then(user => res.status(200).json(user));
        this.facebook = (req, res, next) => passport.authenticate('facebook', { scope: ['email'] })(req, res, next);
        this.facebookcallback = (req, res, next) => passport.authenticate('facebook', { successRedirect: '/token', failureRedirect: '/' })(req, res, next);
        this.twitter = (req, res, next) => passport.authenticate('twitter', { scope: ['email'] })(req, res, next);
        this.twittercallback = (req, res, next) => passport.authenticate('twitter', { successRedirect: '/token', failureRedirect: '/' })(req, res, next);
        this.google = (req, res, next) => passport.authenticate('google', { scope: ['email'] })(req, res, next);
        this.googlecallback = (req, res, next) => passport.authenticate('google', { successRedirect: '/token', failureRedirect: '/' })(req, res, next);
        this.instagram = (req, res, next) => passport.authenticate('instagram', { scope: ['basic', 'public_content', 'follower_list', 'comments', 'relationships', 'likes'] })(req, res, next);
        this.instagramcallback = (req, res, next) => passport.authenticate('instagram', { successRedirect: '/token', failureRedirect: '/' })(req, res, next);
        passport.serializeUser((user, done) => done(null, { id: user.id, nombre: user.nombre, correo: user.correo }));
        passport.deserializeUser((user, done) => done(null, user));
        passport.use('login', new localStrategy.Strategy({
            usernameField: 'correo', passwordField: 'password', passReqToCallback: true
        }, (req, username, password, done) => modelo_3.Usuario.findOne({ where: { 'correo': username }, include: [modelo_2.Llave] })
            .then(user => {
            if (user == null)
                return done(null, false);
            if (user.Llave.password === password) {
                modelo_4.Log.create({ IdUsuario: user.id });
                return done(null, user);
            }
            // if (user.autenticacion(password))
            // 	return done(null, user);
            return done(null, false);
        })));
        passport.use('registro', new localStrategy.Strategy({
            usernameField: 'correo', passwordField: 'Llave[password]', passReqToCallback: true
        }, (req, username, password, done) => modelo_3.Usuario.findOrCreate({ where: { 'correo': username }, include: [modelo_2.Llave], defaults: Object.assign(req.body, { tipo: 'usuario', status: 0 }) })
            .spread((user, created) => created ? crearCliente(user).then(user => done(null, user)) : done(null, false)).error(err => done(err, null))));
        passport.use('twitter', new twitterStrategy.Strategy({
            consumerKey: config_1.config.keys.twitter.consumerKey,
            consumerSecret: config_1.config.keys.twitter.consumerSecret,
            callbackURL: config_1.config.keys.twitter.callbackURL,
            includeEmail: true
        }, (token, tokenSecret, profile, done) => process.nextTick(() => this.socializar('IdTwitter', 'fb_avatar', profile, done, 'twitter'))));
        passport.use('facebook', new facebookStrategy.Strategy({
            clientID: config_1.config.keys.facebook.clientID,
            clientSecret: config_1.config.keys.facebook.clientSecret,
            callbackURL: config_1.config.keys.facebook.callbackURL,
            profileFields: [
                'id',
                'emails',
                'displayName',
                'picture',
                'cover',
                'first_name',
                'last_name',
                'locale',
                'gender',
                'hometown'
            ]
        }, (accessToken, refreshToken, profile, done) => {
            process.nextTick(() => this.socializar('IdFacebook', 'fb_avatar', profile, done, 'facebook'));
        }));
        passport.use('google', new googleStrategy.Strategy({
            clientID: config_1.config.keys.google.clientID,
            clientSecret: config_1.config.keys.google.clientSecret,
            callbackURL: config_1.config.keys.google.callbackURL,
        }, (token, tokenSecret, profile, done) => process.nextTick(() => this.socializar('IdGoogle', 'fb_avatar', profile, done, 'google'))));
    }
    socializar(red_id, avatar_id, profile, done, red) {
        let avatar_image = profile.photos != undefined ? profile.photos[0].value : 'assets/images/perfil.png';
        modelo_2.Llave.find({
            where: {
                [red_id]: profile.id
            },
            include: [{ model: modelo_3.Usuario }]
        })
            .then(Key => {
            if (Key) {
                this.fijarAvatars(Key.Usuario, Key, red);
                Key.Usuario ?
                    Key.Usuario.update({ nombre: profile.name.givenName, apellido: profile.name.familyName }).then(user => done(null, user)) : null;
            }
            else {
                modelo_3.Usuario.findOrCreate({
                    where: {
                        correo: profile.emails[0].value
                    },
                    defaults: {
                        nombre: profile.name.givenName,
                        apellido: profile.name.familyName,
                        correo: profile.emails[0].value,
                        sexo: profile.gender,
                        status: 0,
                        tipo: 'usuario'
                    },
                    include: [modelo_2.Llave]
                }).spread((user, created) => created ?
                    this.usuarioCreado(user, red_id, avatar_id, profile, done, avatar_image, red)
                    :
                        this.usuarioEncontrado(user, red_id, avatar_id, profile, done, avatar_image, red));
            }
        }, (err) => done(err));
    }
    usuarioEncontrado(user, red_id, avatar_id, profile, done, avatar_image, red) {
        this.fijarAvatars(user, user.Llave, red);
        if (user.Llave) {
            user.Llave.update({ [red_id]: profile.id })
                .then(algo => done(null, user));
        }
        else {
            user.$create('Llave', { [red_id]: profile.id })
                .then((keysito) => done(null, user));
        }
    }
    usuarioCreado(user, red_id, avatar_id, profile, done, avatar_image, red) {
        user.$create('Llave', { [red_id]: profile.id })
            .then((keysito) => {
            this.fijarAvatars(user, keysito, red);
            crearCliente(user).then(user => done(null, user));
        });
    }
    fijarAvatars(usuario, llave, red) {
        if (red === 'facebook') {
            modelo_1.Avatar.findAll({ where: { IdUsuario: usuario.id } })
                .then((avatares) => Promise.all([50, 100, 200, 400].map(async (dimension) => fb_1.FB.api('/' + llave.IdFacebook + '/picture', 'GET', {
                redirect: false, "height": dimension
            }, (picture) => {
                let avatar = avatares.find(n => n.height === dimension);
                if (avatar && avatar.link === picture.url) {
                }
                else {
                    modelo_1.Avatar.create({
                        link: picture.data.url,
                        IdUsuario: usuario.id,
                        height: dimension,
                        width: dimension,
                        dimension: dimension + 'x' + dimension
                    }).then(response => {
                        if (avatar) {
                            avatar.destroy();
                        }
                    });
                }
            }))));
        }
        if (red === 'google') {
        }
    }
}
exports.AutentificacionController = AutentificacionController;
