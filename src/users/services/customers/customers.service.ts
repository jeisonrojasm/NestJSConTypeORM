import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCustomerDto, UpdateCustomerDto } from 'src/users/dtos/customers.dto';
import { Customer } from 'src/users/entities/customer.entity';

@Injectable()
export class CustomersService {

    constructor(@InjectRepository(Customer) private readonly customersRepository: Repository<Customer>) { }

    findAll() {
        return this.customersRepository.find();
    }

    async findOne(id: number) {
        const customer = await this.customersRepository.findOne({ where: { id } });
        if (!customer) {
            throw new NotFoundException(`Customer #${id} not found`);
        }
        return customer;
    }

    create(data: CreateCustomerDto) {
        const newCustomer = this.customersRepository.create(data);
        return this.customersRepository.save(newCustomer)

    }

    async update(id: number, changes: UpdateCustomerDto) {
        const customer = await this.customersRepository.findOne({ where: { id } });
        this.customersRepository.merge(customer, changes);
        return this.customersRepository.save(customer);
    }

    remove(id: number) {
        return this.customersRepository.delete(id)
    }
}
