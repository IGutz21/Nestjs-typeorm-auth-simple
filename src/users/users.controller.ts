import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/createUserDto';
import { UsersService } from './users.service';
import { CommentsService } from 'src/comments/comments.service';
import { JwtAuthGuard } from 'src/auth/guards';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly commentService: CommentsService,
  ) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/comments')
  getUserComment(@Param('id') id: string) {
    return this.commentService.findUserCommentsById(id);
  }

  // @UsePipes(ZodValidationPipe)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
}
