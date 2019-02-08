import * as passport from 'passport'
import * as localStrategy from 'passport-local';
import * as facebookStrategy from 'passport-facebook';
import * as twitterStrategy from 'passport-twitter';
import * as googleStrategy from 'passport-google-oauth20';
import * as jwt from 'jsonwebtoken';

import * as _ from 'lodash'



import { FB } from 'fb';


import { config } from '../../conf/config';

import { Avatar } from '../avatar/modelo';
import { Llave } from '../llave/modelo';
import { Usuario } from '../usuario/modelo';
import { Log } from '../log/modelo';

var isProduction = false;
var resource_name = 'https://sandbox-api.openpay.mx'
//class
var Openpay = require('openpay');
//instantiation
var openpay = new Openpay('mzbzo4aoqvcld7vl9f9s', 'sk_6d675d731d594f29ba1466f2ee379e50', [isProduction]);

openpay.setMerchantId('mzbzo4aoqvcld7vl9f9s');
openpay.setPrivateKey('sk_6d675d731d594f29ba1466f2ee379e50');
openpay.setProductionReady(false);


FB.options({version: 'v3.2'});
FB.setAccessToken('2026186280804066|I5JLMlJX4lusSeAkzt73eMT9cXA');


var crearCliente = (usuario) => new Promise((resolve, reject) => {

	usuario.$get('Llave')
	.then(llave =>
		_.isNull(llave.IdOpenpay) ?
			openpay.customers.create({ 'name': usuario.nombre, 'email': usuario.correo, 'requires_account': false }, (error, customer) =>
		        Llave.update({IdOpenpay : customer.id}, {where : {IdUsuario :  usuario.id }}).then(() => resolve(usuario)))
			: resolve(usuario))

})

export class AutentificacionController {


	//  Inicia el constructor

	constructor() {
		passport.serializeUser<any, any>((user, done) => done(null, { id: user.id, nombre: user.nombre, correo: user.correo }));

		passport.deserializeUser<any, any>((user, done) => done(null, user));

		passport.use('login', new localStrategy.Strategy({
			usernameField: 'correo', passwordField: 'password', passReqToCallback: true
		}, (req, username, password, done) => Usuario.findOne({ where: { 'correo': username }, include: [Llave] })
			.then(user => {
				if (user == null)
					return done(null, false);

				if(user.Llave.password === password){
					Log.create({IdUsuario : user.id })
					return done(null, user);
				}
				// if (user.autenticacion(password))
				// 	return done(null, user);

				return done(null, false);
			})
		));

		passport.use('registro', new localStrategy.Strategy({
			usernameField: 'correo', passwordField: 'Llave[password]', passReqToCallback: true
		}, (req, username, password, done) =>
			Usuario.findOrCreate({ where: { 'correo': username }, include: [ Llave ], defaults: Object.assign(req.body, {  tipo : 'usuario', status : 0 })})
			.spread((user, created) => created ? crearCliente(user).then(user => done(null, user))  : done(null, false)).error(err => done(err, null))));

		passport.use('twitter', new twitterStrategy.Strategy({
			consumerKey: config.keys.twitter.consumerKey,
			consumerSecret: config.keys.twitter.consumerSecret,
			callbackURL: config.keys.twitter.callbackURL,
			includeEmail: true
		}, (token, tokenSecret, profile, done) =>
				process.nextTick(() => this.socializar('IdTwitter', 'fb_avatar', profile, done, 'twitter'))
		));

		passport.use('facebook', new facebookStrategy.Strategy({
			clientID: config.keys.facebook.clientID,
			clientSecret: config.keys.facebook.clientSecret,
			callbackURL: config.keys.facebook.callbackURL,
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
			process.nextTick(() => this.socializar('IdFacebook', 'fb_avatar', profile, done, 'facebook'))
		}
		));

		passport.use('google', new googleStrategy.Strategy({
			clientID: config.keys.google.clientID,
			clientSecret: config.keys.google.clientSecret,
			callbackURL: config.keys.google.callbackURL,
		}, (token, tokenSecret, profile, done) =>
				process.nextTick(() => this.socializar('IdGoogle', 'fb_avatar', profile, done, 'google'))
		));
	}

	// Termina el constructor
	//
	// Metodos

	token = (req, res, next) => jwt.verify(req.params.token, config.token_secreto, (err, decoded) => {
		if (err)
			res.send({ success: false, message: 'token invlid' })
		else
			res.json(decoded)
	});

	login = (req, res, next) => passport.authenticate('login', (err, user, info) => {
		if (err)
			return next(err);

		if (!user)
			return res.send({ success: false, message: 'Incorrect username or password.' });

		req.login(user, (err) => {
			if (err)
				return next(err);

			var token = jwt.sign({
				user: user
			}, config.token_secreto, { expiresIn: '24h' });
			return res.send({ success: true, message: 'Authentication succeeded', token: token });
		});
	})(req, res, next);

	registro = (req, res, next) => passport.authenticate('registro', (err, user, info) => {
		if (err)
			return next(err);

		if (!user)
			return res.send({ success: false, message: info });

		req.login(user, (err) => {
			if (err)
				return next(err);

			var token = jwt.sign({
				user: user
			}, config.token_secreto, { expiresIn: '24h' });
			return res.send({ success: true, message: 'Authentication succeeded', token: token, usuario : user });
		});
	})(req, res, next);


	tokenSocial = (req, res, next) => Usuario.findOne({ where: { 'correo': req.user.correo } })
		.then(usering => jwt.sign({ user: usering }, config.token_secreto, { expiresIn: '1h' }))
		.then(token => res.redirect( config.keys.url + 'social/' + token))

	avatar = (req, res, next) => Usuario.findById(req.params.id, { include: [Llave] })
		.then(user => res.status(200).json(user))


	facebook = (req, res, next) => passport.authenticate('facebook', { scope: ['email'] })(req, res, next);

	facebookcallback = (req, res, next) => passport.authenticate('facebook', { successRedirect: '/token', failureRedirect: '/' })(req, res, next);

	twitter = (req, res, next) => passport.authenticate('twitter', { scope: ['email'] })(req, res, next);

	twittercallback = (req, res, next) => passport.authenticate('twitter', { successRedirect: '/token', failureRedirect: '/' })(req, res, next);

	google = (req, res, next) => passport.authenticate('google', { scope: ['email'] })(req, res, next);

	googlecallback = (req, res, next) => passport.authenticate('google', { successRedirect: '/token', failureRedirect: '/' })(req, res, next);

	instagram = (req, res, next) => passport.authenticate('instagram', { scope: ['basic', 'public_content', 'follower_list', 'comments', 'relationships', 'likes'] })(req, res, next);

	instagramcallback = (req, res, next) => passport.authenticate('instagram', { successRedirect: '/token', failureRedirect: '/' })(req, res, next);

	private socializar(red_id, avatar_id, profile, done, red) {

			let avatar_image = profile.photos != undefined ? profile.photos[0].value : 'assets/images/perfil.png'


			Llave.find({
				where: {
					[red_id]: profile.id
				},
				include: [{ model: Usuario }]
			})
			.then(Key => {

				if (Key) {

					this.fijarAvatars( Key.Usuario, Key, red  )
					Key.Usuario ?
						Key.Usuario.update({ nombre: profile.name.givenName, apellido : profile.name.familyName }).then(user => done(null, user)) : null;

				} else {
					Usuario.findOrCreate({
						where: {
							correo: profile.emails[0].value
						},
						defaults: {
							nombre: profile.name.givenName,
							apellido : profile.name.familyName,
							correo: profile.emails[0].value,
							sexo: profile.gender,
							status : 0,
							tipo : 'usuario'
						},
						include: [Llave]
					}).spread((user: Usuario, created) =>
						created ?
							this.usuarioCreado(user, red_id, avatar_id, profile, done, avatar_image, red)
							:
							this.usuarioEncontrado(user, red_id, avatar_id, profile, done, avatar_image, red));

				}
			}, (err) => done(err))
	}

	private usuarioEncontrado(user: Usuario, red_id, avatar_id, profile, done, avatar_image, red) {

		this.fijarAvatars( user, user.Llave, red )

		if (user.Llave) {
			user.Llave.update({ [red_id]: profile.id })
			.then(algo => done(null, user))

		} else {
			user.$create('Llave', { [red_id]: profile.id })
				.then((keysito: Llave) => done(null, user))
		}
	}

	private usuarioCreado(user: Usuario, red_id, avatar_id, profile, done, avatar_image, red) {

		user.$create('Llave', { [red_id]: profile.id })
			.then((keysito: Llave) => {

				this.fijarAvatars( user, keysito , red )

				crearCliente(user).then(user => done(null, user))

			})
	}

	fijarAvatars(usuario, llave, red){

		if(red === 'facebook'){
			Avatar.findAll({where : { IdUsuario : usuario.id } })
				.then((avatares : any) => Promise.all([50, 100, 200, 400 ].map(
					async (dimension) =>
						FB.api('/' + llave.IdFacebook +'/picture', 'GET',{
								redirect: false, "height": dimension },
							  	(picture) => {

									let avatar = avatares.find(n => n.height === dimension)
									if(avatar && avatar.link === picture.url){

									}else{

										Avatar.create({
											link : picture.data.url,
											IdUsuario : usuario.id,
											height : dimension,
											width : dimension,
											dimension : dimension + 'x' + dimension
										}).then(response => {
											if(avatar){
												avatar.destroy()
											}
										})

									}

							  }
						)
				)))
		}

		if(red === 'google'){



		}
	}

}
