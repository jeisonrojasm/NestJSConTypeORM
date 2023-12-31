import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCustomerDto {
    @ApiProperty({ description: `Customer's name` })
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({ description: `Customer's lastname` })
    @IsString()
    @IsNotEmpty()
    readonly lastName: string;

    @ApiProperty({ description: `Customer's phone` })
    @IsPhoneNumber()
    @IsNotEmpty()
    readonly phone: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) { }
