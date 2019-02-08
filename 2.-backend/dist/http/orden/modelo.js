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
const modelo_2 = require("../usuario/modelo");
const modelo_3 = require("../transaccion/modelo");
const modelo_4 = require("../direccion/modelo");
const modelo_5 = require("../tarjeta/modelo");
const modelo_6 = require("../entrega/modelo");
const modelo_7 = require("../cargo/modelo");
let Orden = class Orden extends sequelize_typescript_1.Model {
    constructor(values, options) {
        super(values, options);
    }
};
__decorate([
    sequelize_typescript_1.Column({ primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], Orden.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Orden.prototype, "status", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Orden.prototype, "IdOpenpay", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Orden.prototype, "total", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => modelo_1.Sucursal, 'IdSucursal'),
    __metadata("design:type", modelo_1.Sucursal)
], Orden.prototype, "Sucursal", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => modelo_1.Sucursal),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Orden.prototype, "IdSucursal", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => modelo_2.Usuario, 'IdUsuario'),
    __metadata("design:type", modelo_2.Usuario)
], Orden.prototype, "Usuario", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => modelo_2.Usuario),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Orden.prototype, "IdUsuario", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => modelo_3.Transaccion, 'IdOrden'),
    __metadata("design:type", Array)
], Orden.prototype, "Transacciones", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => modelo_4.Direccion, 'IdDireccion'),
    __metadata("design:type", modelo_4.Direccion)
], Orden.prototype, "Direccion", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => modelo_4.Direccion),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Orden.prototype, "IdDireccion", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => modelo_5.Tarjeta, 'IdTarjeta'),
    __metadata("design:type", modelo_5.Tarjeta)
], Orden.prototype, "Tarjeta", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => modelo_5.Tarjeta),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Orden.prototype, "IdTarjeta", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => modelo_6.Entrega, 'IdOrden'),
    __metadata("design:type", Array)
], Orden.prototype, "Entregas", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => modelo_7.Cargo, 'IdOrden'),
    __metadata("design:type", Array)
], Orden.prototype, "Cargos", void 0);
Orden = __decorate([
    sequelize_typescript_1.Table({
        timestamps: true,
        tableName: 'ordenes'
    }),
    __metadata("design:paramtypes", [Object, Object])
], Orden);
exports.Orden = Orden;
