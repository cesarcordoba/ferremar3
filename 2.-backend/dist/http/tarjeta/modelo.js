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
const modelo_1 = require("../usuario/modelo");
const modelo_2 = require("../orden/modelo");
const modelo_3 = require("../cargo/modelo");
let Tarjeta = class Tarjeta extends sequelize_typescript_1.Model {
    constructor(values, options) {
        super(values, options);
    }
};
__decorate([
    sequelize_typescript_1.Column({ primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], Tarjeta.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Tarjeta.prototype, "marca", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Tarjeta.prototype, "numero", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Tarjeta.prototype, "mes", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Tarjeta.prototype, "periodo", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Tarjeta.prototype, "nombre", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING),
    __metadata("design:type", String)
], Tarjeta.prototype, "IdOpenpay", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Tarjeta.prototype, "principal", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => modelo_1.Usuario, 'IdUsuario'),
    __metadata("design:type", modelo_1.Usuario)
], Tarjeta.prototype, "Usuario", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => modelo_1.Usuario),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Tarjeta.prototype, "IdUsuario", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => modelo_2.Orden, 'IdTarjeta'),
    __metadata("design:type", Array)
], Tarjeta.prototype, "Ordenes", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => modelo_3.Cargo, 'IdTarjeta'),
    __metadata("design:type", Array)
], Tarjeta.prototype, "Cargos", void 0);
Tarjeta = __decorate([
    sequelize_typescript_1.Table({
        timestamps: true,
        tableName: 'tarjetas'
    }),
    __metadata("design:paramtypes", [Object, Object])
], Tarjeta);
exports.Tarjeta = Tarjeta;
