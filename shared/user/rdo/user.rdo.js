"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRDO = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class UserRDO {
}
exports.UserRDO = UserRDO;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Uniq user ID',
        example: 'g83h4y0943-nv934819843-jv934h8t-n923g48n9438',
    }),
    (0, class_transformer_1.Expose)(),
    tslib_1.__metadata("design:type", String)
], UserRDO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Created at date',
        example: '2024-04-26 13:02:24.847'
    }),
    (0, class_transformer_1.Expose)(),
    tslib_1.__metadata("design:type", Date)
], UserRDO.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Updated at date',
        example: '2024-04-26 13:02:24.847'
    }),
    (0, class_transformer_1.Expose)(),
    tslib_1.__metadata("design:type", Date)
], UserRDO.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User name',
        example: 'Tony'
    }),
    (0, class_transformer_1.Expose)(),
    tslib_1.__metadata("design:type", String)
], UserRDO.prototype, "name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User email',
        example: 'iron-man@starkindustries.it'
    }),
    (0, class_transformer_1.Expose)(),
    tslib_1.__metadata("design:type", String)
], UserRDO.prototype, "email", void 0);
//# sourceMappingURL=user.rdo.js.map