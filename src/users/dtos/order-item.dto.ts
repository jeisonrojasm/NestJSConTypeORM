import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsPositive } from "class-validator";


export class CreateOrderItemDto {
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty({ description: `Order id to identify to which order it belongs to` })
    readonly orderId: number;

    @IsPositive()
    @IsNotEmpty()
    @ApiProperty({ description: `Products that belongs to this item` })
    readonly productId: number;

    @IsPositive()
    @IsNotEmpty()
    @ApiProperty({ description: `Number of products that the customer bought` })
    readonly quantity: number;
}

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) { }

