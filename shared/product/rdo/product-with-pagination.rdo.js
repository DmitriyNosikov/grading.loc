"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductWithPaginationRDO = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const create_product_rdo_1 = require("./create-product.rdo");
class ProductWithPaginationRDO {
}
exports.ProductWithPaginationRDO = ProductWithPaginationRDO;
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'Product entities array',
        type: create_product_rdo_1.CreateProductRDO,
    }),
    (0, class_transformer_1.Type)(() => create_product_rdo_1.CreateProductRDO),
    tslib_1.__metadata("design:type", Array)
], ProductWithPaginationRDO.prototype, "entities", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'Paginated product pages count',
        example: 2
    }),
    tslib_1.__metadata("design:type", Number)
], ProductWithPaginationRDO.prototype, "totalPages", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'Total producs count',
        example: 23
    }),
    tslib_1.__metadata("design:type", Number)
], ProductWithPaginationRDO.prototype, "totalItems", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'Current page number in pagination',
        example: 1
    }),
    tslib_1.__metadata("design:type", Number)
], ProductWithPaginationRDO.prototype, "currentPage", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'product per page',
        example: 7
    }),
    tslib_1.__metadata("design:type", Number)
], ProductWithPaginationRDO.prototype, "itemsPerPage", void 0);
//# sourceMappingURL=product-with-pagination.rdo.js.map