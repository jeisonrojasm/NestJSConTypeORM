import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ description: `User's email` })
    @IsString()
    @IsEmail()
    readonly email: string;

    @ApiProperty({ description: `User's password` })
    @IsString()
    @IsNotEmpty()
    @Length(6)
    readonly password: string;

    @ApiProperty({ description: `User's role` })
    @IsNotEmpty()
    readonly role: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) { }
