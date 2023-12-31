import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsUrl, IsNumber, IsPositive, IsArray } from "class-validator";
import { Category } from "../entities/category.entity";

export class CreateProductDto {

    @ApiProperty({ description: `Product's name` })
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty({ description: `Product's description` })
    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @ApiProperty({ description: `Product's price` })
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    readonly price: number;

    @ApiProperty({ description: `Product's stock` })
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    readonly stock: number;

    @ApiProperty({ description: `Product's image or photo` })
    @IsNotEmpty()
    @IsUrl()
    readonly image: string;

    @ApiProperty({ description: `Product's brand`})
    @IsNotEmpty()
    @IsPositive()
    readonly brandId: number;

    @ApiProperty({ description: `Product's categories`})
    @IsNotEmpty()
    @IsArray()
    readonly categoriesIds: number[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) { }

