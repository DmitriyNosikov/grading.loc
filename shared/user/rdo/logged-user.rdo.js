"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggedUserRDO = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const user_rdo_1 = require("./user.rdo");
class LoggedUserRDO extends user_rdo_1.UserRDO {
}
exports.LoggedUserRDO = LoggedUserRDO;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User JWT Token',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpFVCJ9.eyJ1c2VySWQiOiI2NjM4ZDIzZDgyNGQ3ZTdkNzQ3NzNjYmIiLCJlbWFpbCI6Imlyb24tbWFuM0BzdGFya2luZHVzdHJpZXMuaXQiLCJmaXJzdG5hbWUiOiJUb255IiwibGFzdG5hbWUiOiJTdGFyazEyMyIsImlhdCI6MTcxNTAwMDYyMCwiZXhwIjoxNzE1MDAwOTIwfQ.TgH1861ix-vw6XGtoCLfDymnH_9yQIYp0Z3m7TT3jxY'
    }),
    (0, class_transformer_1.Expose)(),
    tslib_1.__metadata("design:type", String)
], LoggedUserRDO.prototype, "accessToken", void 0);
//# sourceMappingURL=logged-user.rdo.js.map