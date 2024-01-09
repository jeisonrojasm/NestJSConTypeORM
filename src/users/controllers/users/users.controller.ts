import { Controller, Get, Post, Put, Delete, Param, Query, Body, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/users.dto';
import { UsersService } from 'src/users/services/users/users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @ApiOperation({ summary: `List all users` })
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @ApiOperation({ summary: 'Return a user searched by id' })
    @Get(':id')
    get(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
    }

    @ApiOperation({ summary: 'Create a new user' })
    @Post()
    create(@Body() payload: CreateUserDto) {
        return this.usersService.create(payload);
    }

    @ApiOperation({ summary: 'Update a users searched by id' })
    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() payload: UpdateUserDto,
    ) {
        return this.usersService.update(id, payload);
    }

    @ApiOperation({ summary: 'Delete a user searched by id' })
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.remove(id);
    }
}
