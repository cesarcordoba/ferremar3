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
const modelo_1 = require("../transaccion/modelo");
const modelo_2 = require("../orden/modelo");
let Entrega = class Entrega extends sequelize_typescript_1.Model {
    constructor(values, options) {
        super(values, options);
    }
};
__decorate([
    sequelize_typescript_1.Column({ primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], Entrega.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.DATE),
    __metadata("design:type", Date)
], Entrega.prototype, "fecha", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], Entrega.prototype, "status", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Entrega.prototype, "descripcion", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => modelo_1.Transaccion, 'IdEntrega'),
    __metadata("design:type", Array)
], Entrega.prototype, "Transacciones", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => modelo_2.Orden, 'IdOrden'),
    __metadata("design:type", modelo_2.Orden)
], Entrega.prototype, "Orden", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => modelo_2.Orden),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Entrega.prototype, "IdOrden", void 0);
Entrega = __decorate([
    sequelize_typescript_1.Table({
        timestamps: true,
        tableName: 'entregas'
    }),
    __metadata("design:paramtypes", [Object, Object])
], Entrega);
exports.Entrega = Entrega;
