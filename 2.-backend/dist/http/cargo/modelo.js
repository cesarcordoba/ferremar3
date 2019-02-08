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
const modelo_1 = require("../orden/modelo");
const modelo_2 = require("../tarjeta/modelo");
let Cargo = class Cargo extends sequelize_typescript_1.Model {
    constructor(values, options) {
        super(values, options);
    }
};
__decorate([
    sequelize_typescript_1.Column({ primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], Cargo.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Cargo.prototype, "descripcion", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Cargo.prototype, "request", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Cargo.prototype, "status", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Cargo.prototype, "fee", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Cargo.prototype, "tax", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Cargo.prototype, "amount", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Cargo.prototype, "autorizacion", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Cargo.prototype, "error", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Cargo.prototype, "http", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => modelo_1.Orden, 'IdOrden'),
    __metadata("design:type", modelo_1.Orden)
], Cargo.prototype, "Orden", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => modelo_1.Orden),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Cargo.prototype, "IdOrden", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => modelo_2.Tarjeta, 'IdTarjeta'),
    __metadata("design:type", modelo_2.Tarjeta)
], Cargo.prototype, "Tarjeta", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => modelo_2.Tarjeta),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Cargo.prototype, "IdTarjeta", void 0);
Cargo = __decorate([
    sequelize_typescript_1.Table({
        timestamps: true,
        tableName: 'cargos'
    }),
    __metadata("design:paramtypes", [Object, Object])
], Cargo);
exports.Cargo = Cargo;
