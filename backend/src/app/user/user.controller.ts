import { Body, Controller, Delete, Param, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillDTO } from '@backend/libs/helpers/';
import { MongoIdValidationPipe } from '@backend/libs/pipes';

import { UserMessage } from './user.constant';

import { UserRDO } from './rdo/user.rdo';
import { LoggedUserRDO } from './rdo/logged-user.rdo';
import { UserService } from './user.service';


@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ){}

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
