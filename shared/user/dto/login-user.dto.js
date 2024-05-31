"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserDTO = void 0;
const tslib_1 = require("tslib");
const user_constant_1 = require("../../../backend/src/app/user/user.constant");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class LoginUserDTO {
}
exports.LoginUserDTO = LoginUserDTO;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User email',
        example: 'iron-man@starkindustries.it',
    }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], LoginUserDTO.prototype, "email", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User password',
        example: 'jarvis-iron-hearth123',
        minimum: user_constant_1.UserValidation.PASSWORD.MAX_LENGTH,
        maximum: user_constant_1.UserValidation.PASSWORD.MIN_LENGTH,
    }),
    (0, class_validator_1.MaxLength)(user_constant_1.UserValidation.PASSWORD.MAX_LENGTH),
    (0, class_validator_1.MinLength)(user_constant_1.UserValidation.PASSWORD.MIN_LENGTH),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], LoginUserDTO.prototype, "password", void 0);
//# sourceMappingURL=login-user.dto.js.map