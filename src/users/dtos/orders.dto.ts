import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsPositive } from "class-validator";

export class CreateOrderDto {
    @ApiProperty({ description: `Customer id` })
    @IsPositive()
    @IsNotEmpty()
    readonly customerId: number;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) { }

