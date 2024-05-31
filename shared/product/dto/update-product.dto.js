"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductDTO = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const types_1 = require("../../../backend/src/app/libs/types");
const product_constant_1 = require("../../../backend/src/app/product/product.constant");
class UpdateProductDTO {
}
exports.UpdateProductDTO = UpdateProductDTO;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Product vendor code',
        example: 'pv9230ndfg92381203i9hn-g0924',
        minimum: product_constant_1.ProductValidation.VENDOR_CODE.MIN_LENGTH,
        maximum: product_constant_1.ProductValidation.VENDOR_CODE.MAX_LENGTH,
    }),
    (0, class_validator_1.MaxLength)(product_constant_1.ProductValidation.VENDOR_CODE.MAX_LENGTH),
    (0, class_validator_1.MinLength)(product_constant_1.ProductValidation.VENDOR_CODE.MIN_LENGTH),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateProductDTO.prototype, "vendorCode", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Product title',
        example: 'Richie Sambora`s guitar',
        minimum: product_constant_1.ProductValidation.TITLE.MIN_LENGTH,
        maximum: product_constant_1.ProductValidation.TITLE.MAX_LENGTH,
    }),
    (0, class_validator_1.MaxLength)(product_constant_1.ProductValidation.TITLE.MAX_LENGTH),
    (0, class_validator_1.MinLength)(product_constant_1.ProductValidation.TITLE.MIN_LENGTH),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateProductDTO.prototype, "title", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Product description',
        example: 'It`s a perfect and rair guitar, that was firstly presented on LP concert',
        minimum: product_constant_1.ProductValidation.DESCRIPTION.MIN_LENGTH,
        maximum: product_constant_1.ProductValidation.DESCRIPTION.MAX_LENGTH,
    }),
    (0, class_validator_1.MaxLength)(product_constant_1.ProductValidation.DESCRIPTION.MAX_LENGTH),
    (0, class_validator_1.MinLength)(product_constant_1.ProductValidation.DESCRIPTION.MIN_LENGTH),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateProductDTO.prototype, "description", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Product photo URL (.jpg/.png)',
        example: 'http://some.interesting/photo.jpg',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateProductDTO.prototype, "photo", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Product type',
        example: 'electro',
        enum: types_1.ProductType,
        minimum: product_constant_1.ProductValidation.TITLE.MIN_LENGTH,
        maximum: product_constant_1.ProductValidation.TITLE.MAX_LENGTH,
    }),
    (0, class_validator_1.IsIn)(types_1.productTypeList),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], UpdateProductDTO.prototype, "type", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Product strings count',
        example: '4',
        enum: types_1.StringsCount,
        minimum: product_constant_1.ProductValidation.TITLE.MIN_LENGTH,
        maximum: product_constant_1.ProductValidation.TITLE.MAX_LENGTH,
    }),
    (0, class_validator_1.IsIn)(types_1.StringsCount),
    (0, class_validator_1.Min)(product_constant_1.ProductValidation.STRINGS_COUNT.MIN),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], UpdateProductDTO.prototype, "stringsCount", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Product price',
        example: '100000',
        minimum: product_constant_1.ProductValidation.TITLE.MIN_LENGTH,
        maximum: product_constant_1.ProductValidation.TITLE.MAX_LENGTH,
    }),
    (0, class_validator_1.IsIn)(types_1.StringsCount),
    (0, class_validator_1.Min)(product_constant_1.ProductValidation.PRICE.MIN),
    (0, class_validator_1.Max)(product_constant_1.ProductValidation.PRICE.MAX),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], UpdateProductDTO.prototype, "price", void 0);
//# sourceMappingURL=update-product.dto.js.map