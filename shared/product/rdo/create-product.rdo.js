"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductRDO = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const types_1 = require("../../../backend/src/app/libs/types");
const product_constant_1 = require("../../../backend/src/app/product/product.constant");
const class_transformer_1 = require("class-transformer");
class CreateProductRDO {
}
exports.CreateProductRDO = CreateProductRDO;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Product id',
        example: 'pv9230ndfg92381203i9hn-g0924',
    }),
    (0, class_transformer_1.Expose)(),
    tslib_1.__metadata("design:type", String)
], CreateProductRDO.prototype, "id", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Product created date',
        example: '2024-05-28 15:01:51.449',
    }),
    (0, class_transformer_1.Expose)(),
    tslib_1.__metadata("design:type", Date)
], CreateProductRDO.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Product updated date',
        example: '2024-05-28 15:01:51.449',
    }),
    (0, class_transformer_1.Expose)(),
    tslib_1.__metadata("design:type", Date)
], CreateProductRDO.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Product vendor code',
        example: 'pv9230ndfg92381203i9hn-g0924',
        minimum: product_constant_1.ProductValidation.VENDOR_CODE.MIN_LENGTH,
        maximum: product_constant_1.ProductValidation.VENDOR_CODE.MAX_LENGTH,
    }),
    (0, class_transformer_1.Expose)(),
    tslib_1.__metadata("design:type", String)
], CreateProductRDO.prototype, "vendorCode", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Product title',
        example: 'Richie Sambora`s guitar',
        minimum: product_constant_1.ProductValidation.TITLE.MIN_LENGTH,
        maximum: product_constant_1.ProductValidation.TITLE.MAX_LENGTH,
    }),
    (0, class_transformer_1.Expose)(),
    tslib_1.__metadata("design:type", String)
], CreateProductRDO.prototype, "title", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Product description',
        example: 'It`s a perfect and rair guitar, that was firstly presented on LP concert',
        minimum: product_constant_1.ProductValidation.DESCRIPTION.MIN_LENGTH,
        maximum: product_constant_1.ProductValidation.DESCRIPTION.MAX_LENGTH,
    }),
    (0, class_transformer_1.Expose)(),
    tslib_1.__metadata("design:type", String)
], CreateProductRDO.prototype, "description", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Product photo URL (.jpg/.png)',
        example: 'http://some.interesting/photo.jpg',
    }),
    (0, class_transformer_1.Expose)(),
    tslib_1.__metadata("design:type", String)
], CreateProductRDO.prototype, "photo", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Product type',
        example: 'electro',
        enum: types_1.ProductType,
    }),
    (0, class_transformer_1.Expose)(),
    tslib_1.__metadata("design:type", String)
], CreateProductRDO.prototype, "type", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Product strings count',
        example: '4',
        enum: types_1.StringsCount,
        minimum: product_constant_1.ProductValidation.STRINGS_COUNT.MIN,
        maximum: product_constant_1.ProductValidation.STRINGS_COUNT.MAX,
    }),
    (0, class_transformer_1.Expose)(),
    tslib_1.__metadata("design:type", Object)
], CreateProductRDO.prototype, "stringsCount", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Product price',
        example: '100000',
        minimum: product_constant_1.ProductValidation.PRICE.MIN,
        maximum: product_constant_1.ProductValidation.PRICE.MAX,
    }),
    (0, class_transformer_1.Expose)(),
    tslib_1.__metadata("design:type", Number)
], CreateProductRDO.prototype, "price", void 0);
//# sourceMappingURL=create-product.rdo.js.map