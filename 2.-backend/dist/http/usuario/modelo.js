"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const modelo_1 = require("../sucursal/modelo");
const modelo_2 = require("../orden/modelo");
const modelo_3 = require("../llave/modelo");
const modelo_4 = require("../avatar/modelo");
const modelo_5 = require("../favorito/modelo");
const modelo_6 = require("../version/modelo");
const modelo_7 = require("../log/modelo");
const modelo_8 = require("../accion/modelo");
const modelo_9 = require("../direccion/modelo");
const modelo_10 = require("../tarjeta/modelo");
let Usuario = class Usuario extends sequelize_typescript_1.Model {
    constructor(values, options) {
        super(values, options);
    }
};
__decorate([
    sequelize_typescript_1.Column({ primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], Usuario.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Usuario.prototype, "nombre", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Usuario.prototype, "apellido", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Usuario.prototype, "correo", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Usuario.prototype, "status", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Usuario.prototype, "tipo", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => modelo_1.Sucursal, 'IdSucursal'),
    __metadata("design:type", modelo_1.Sucursal)
], Usuario.prototype, "Sucursal", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => modelo_1.Sucursal),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Usuario.prototype, "IdSucursal", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => modelo_2.Orden, 'IdUsuario'),
    __metadata("design:type", Array)
], Usuario.prototype, "Ordenes", void 0);
__decorate([
    sequelize_typescript_1.HasOne(() => modelo_3.Llave, 'IdUsuario'),
    __metadata("design:type", modelo_3.Llave)
], Usuario.prototype, "Llave", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => modelo_4.Avatar, 'IdUsuario'),
    __metadata("design:type", Array)
], Usuario.prototype, "Avatares", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => modelo_7.Log, 'IdUsuario'),
    __metadata("design:type", Array)
], Usuario.prototype, "Logs", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => modelo_8.Accion, 'IdUsuario'),
    __metadata("design:type", Array)
], Usuario.prototype, "Acciones", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => modelo_9.Direccion, 'IdUsuario'),
    __metadata("design:type", Array)
], Usuario.prototype, "Direcciones", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => modelo_10.Tarjeta, 'IdUsuario'),
    __metadata("design:type", Array)
], Usuario.prototype, "Tarjetas", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => modelo_6.Version, () => modelo_5.Favorito, 'IdUsuario', 'IdVersion'),
    __metadata("design:type", Array)
], Usuario.prototype, "Versiones", void 0);
Usuario = __decorate([
    sequelize_typescript_1.Table({
        timestamps: true,
        tableName: 'usuarios'
    }),
    __metadata("design:paramtypes", [Object, Object])
], Usuario);
exports.Usuario = Usuario;
