import { Product } from "src/products/entities/product.entity";
import { User } from "./user.entity";
import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany
} from "typeorm";
import { Customer } from "./customer.entity";
import { OrderItem } from "./order-item.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP'
    })
    updatedAt: Date;

    @ManyToOne(() => Customer, customer => customer.orders)
    customer: Customer;

    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    items: OrderItem[];
}

