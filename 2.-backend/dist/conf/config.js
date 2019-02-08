"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env = process.env.NODE_ENV; // 'dev' or 'prod'
class Config {
    constructor(NODE_ENV) {
        if (NODE_ENV == 'dev') {
            console.log("\x1b[33m", 'En Desarrolo');
            this._mode = NODE_ENV;
            this.desarrollo();
        }
        if (NODE_ENV == 'prod') {
            console.log("\x1b[32m", 'En Producción');
            this._mode = NODE_ENV;
            this.produccion();
        }
    }
    get urlAllowOrigin() {
        return this._url_allow_origin;
    }
    get mode() {
        return this._mode;
    }
    get token_secreto() {
        return this._token_secreto;
    }
    get app() {
        return this._app;
    }
    get db() {
        return this._db;
    }
    get keys() {
        return this._keys;
    }
    desarrollo() {
        this._url_allow_origin = ['http://localhost:4200', 'http://lvh.me:4200'];
        this._token_secreto = 'zukulencia';
        this._app = { port: 5000 };
        this._db = { host: '127.0.0.1', port: 8889, database: 'gigante', username: 'root', password: '1234', dialec: 'mysql' };
        this._keys = {
            url: 'http://localhost:4200/',
            facebook: {
                clientID: '870496999775638',
                clientSecret: '890cc3007255067044a4a862a6fcedfc',
                callbackURL: 'http://api.lvh.me:5000/login/facebook/callback'
            },
            google: {
                clientID: "412848032319-eepoh2v0v11u9rhgbgm2vj94nnfkkbhq.apps.googleusercontent.com",
                clientSecret: "gkhm4UF3LIViTwVXjM4fg6_0",
                callbackURL: "http://api.lvh.me:5000/login/google/callback"
            },
            twitter: {
                consumerKey: "OabNHqICoIV9WAviIb0gkpiom",
                consumerSecret: "4IFGuDpxM2QxxGvUlLafr8gnfES4bKSSE1tTWUS3xhXKQm4c28",
                callbackURL: "http://api.lvh.me:5000/login/twitter/callback"
            },
            instagram: {
                clientID: "54a3c81dabf94f89ae1e473e707f28d6",
                clientSecret: "c5b2a01a367c49f5a2d2f8f8e1cee94a",
                callbackURL: "http://api.lvh.me:5000/login/instagram/callback"
            }
        };
        this._aws_keys = {
            accessKeyId: 'AKIAJEYX66PCBH6V4VHQ',
            secretAccessKey: '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',
            region: 'us-east-1'
        };
    }
    produccion() {
        this._url_allow_origin = ['https://www.elgigantedelosazulejos.com.mx', 'https://admin.elgigantedelosazulejos.com.mx', 'https://elgigantedelosazulejos.com.mx', 'http://lvh.me:4200'];
        this._token_secreto = 'zukulenciamaspro';
        this._app = { port: 5000 };
        this._db = { host: '35.184.112.23', port: 3306, database: 'gigante', username: 'root', password: '1234', dialec: 'mysql' };
        this._keys = {
            url: 'https://elgigantedelosazulejos.com.mx/',
            facebook: {
                clientID: '2026186280804066',
                clientSecret: 'cbd67093e3408b5aa3dfca81fa7221bb',
                callbackURL: 'https://api.elgigantedelosazulejos.com.mx/login/facebook/callback'
            },
            google: {
                clientID: "412848032319-eepoh2v0v11u9rhgbgm2vj94nnfkkbhq.apps.googleusercontent.com",
                clientSecret: "gkhm4UF3LIViTwVXjM4fg6_0",
                callbackURL: "https://api.elgigantedelosazulejos.com.mx/login/google/callback"
            },
            twitter: {
                consumerKey: "OabNHqICoIV9WAviIb0gkpiom",
                consumerSecret: "4IFGuDpxM2QxxGvUlLafr8gnfES4bKSSE1tTWUS3xhXKQm4c28",
                callbackURL: "https://api.elgigantedelosazulejos.com.mx/login/twitter/callback"
            },
            instagram: {
                clientID: "54a3c81dabf94f89ae1e473e707f28d6",
                clientSecret: "c5b2a01a367c49f5a2d2f8f8e1cee94a",
                callbackURL: "https://api.elgigantedelosazulejos.com.mx/login/instagram/callback"
            }
        };
    }
}
let config = new Config(env);
exports.config = config;
