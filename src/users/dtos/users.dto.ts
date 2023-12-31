import { IsString, IsNotEmpty, IsEmail, Length, IsPositive, IsOptional } from 'class-validator';
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

    @ApiProperty({ description: `Customer's id to which the record relates` })
    @IsPositive()
    @IsOptional()
    @IsNotEmpty()
    readonly customerId: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) { }
