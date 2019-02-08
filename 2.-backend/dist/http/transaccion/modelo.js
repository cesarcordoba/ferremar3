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
const modelo_1 = require("../version/modelo");
const modelo_2 = require("../margen/modelo");
const modelo_3 = require("../promo/modelo");
const modelo_4 = require("../descuento/modelo");
const modelo_5 = require("../precio/modelo");
const modelo_6 = require("../orden/modelo");
const modelo_7 = require("../entrega/modelo");
let Transaccion = class Transaccion extends sequelize_typescript_1.Model {
    constructor(values, options) {
        super(values, options);
    }
};
__decorate([
    sequelize_typescript_1.Column({ primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], Transaccion.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Transaccion.prototype, "cantidad", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Transaccion.prototype, "total", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Transaccion.prototype, "status", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => modelo_1.Version, 'IdVersion'),
    __metadata("design:type", modelo_1.Version)
], Transaccion.prototype, "Version", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => modelo_1.Version),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Transaccion.prototype, "IdVersion", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => modelo_2.Margen, 'transacciones_margenes', 'IdTransaccion', 'IdMargen'),
    __metadata("design:type", Array)
], Transaccion.prototype, "Margenes", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => modelo_3.Promo, 'IdPromo'),
    __metadata("design:type", modelo_3.Promo)
], Transaccion.prototype, "Promo", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => modelo_3.Promo),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Transaccion.prototype, "IdPromo", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => modelo_4.Descuento, 'transacciones_descuentos', 'IdTransaccion', 'IdDescuento'),
    __metadata("design:type", Array)
], Transaccion.prototype, "Descuentos", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => modelo_5.Precio, 'IdPrecio'),
    __metadata("design:type", modelo_5.Precio)
], Transaccion.prototype, "Precio", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => modelo_5.Precio),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Transaccion.prototype, "IdPrecio", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => modelo_6.Orden, 'IdOrden'),
    __metadata("design:type", modelo_6.Orden)
], Transaccion.prototype, "Orden", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => modelo_6.Orden),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Transaccion.prototype, "IdOrden", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => modelo_7.Entrega, 'IdEntrega'),
    __metadata("design:type", modelo_7.Entrega)
], Transaccion.prototype, "Entrega", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => modelo_7.Entrega),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Transaccion.prototype, "IdEntrega", void 0);
Transaccion = __decorate([
    sequelize_typescript_1.Table({
        timestamps: true,
        tableName: 'transacciones'
    }),
    __metadata("design:paramtypes", [Object, Object])
], Transaccion);
exports.Transaccion = Transaccion;
