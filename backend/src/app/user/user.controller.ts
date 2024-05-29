import { Body, Controller, Delete, Param, HttpStatus, Post, UseGuards, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDTO } from '../libs/helpers';
import { MongoIdValidationPipe } from '../libs/pipes';

import { RequestWithUser } from './interfaces/request-with-user.interface';

import { UserMessage } from './user.constant';
import { UserService } from './user.service';

import { LocalAuthGuard } from './guards/local-auth.guard';
import { JWTAuthGuard } from './guards/jwt-auth.guard';

import { UserRDO } from './rdo/user.rdo';
import { LoggedUserRDO } from './rdo/logged-user.rdo';
import { LoginUserDTO } from './dto/login-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';


@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ){}


  @Post('register')
  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.CREATED,
    description: UserMessage.SUCCESS.CREATED
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: UserMessage.ERROR.ALREADY_EXISTS
  })
  public async create(@Body() registerUserDto: CreateUserDTO) {
    const newUser = await this.userService.register(registerUserDto);

    return fillDTO(UserRDO, newUser.toPOJO());
  }

  @Post('login')
  @UseGuards(LocalAuthGuard) // Верификация перенесена в гард через LocalStrategy
  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.OK,
    description: UserMessage.SUCCESS.LOGGED_IN
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: UserMessage.ERROR.INCORRECT_CREDENTIALS
  })
  // LocalAuthGuard выкидывает результат своей работы в
  // объект Request, в свойство user. Из него мы и возьмем информацию,
  // которую нам возвращает UserService.validate() через LocalAuthGuard
  public async login(@Body() dto: LoginUserDTO, @Req() { user: loggedUser }: RequestWithUser) {
    const userToken = await this.userService.createToken(loggedUser);

    const loggedUserWithPayload = {
      ...loggedUser.toPOJO(),
      ...userToken
    };

    return fillDTO(LoggedUserRDO, loggedUserWithPayload);
  }

  @Post('check')
  @UseGuards(JWTAuthGuard)
  public async checkToken(@Req() { user: tokenPayload }: RequestWithUser) {
    return tokenPayload;
  }

  @Post('/')
  @ApiOperation({ summary: UserMessage.DESCRIPTION.USER_DETAIL })
  @ApiResponse({
    type: UserRDO,
    status: HttpStatus.OK,
    description: UserMessage.SUCCESS.FOUND
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: UserMessage.ERROR.NOT_FOUND
  })
  public async show(@Body('userId') userId: string): Promise<LoggedUserRDO> {
    const userDetail = await this.userService.getUserDetail(userId);

    return fillDTO(LoggedUserRDO, userDetail.toPOJO());
  }

  @Delete(':userId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: UserMessage.SUCCESS.DELETED
  })
  public async deleteUser(@Param('userId', MongoIdValidationPipe) userId: string): Promise<void> {
    await this.userService.deleteUser(userId);
  }
}
