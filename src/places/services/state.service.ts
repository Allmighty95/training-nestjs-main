import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateStateDto } from '../dto/state/create-state.dto';
import { UpdateStateDto } from '../dto/state/update-state.dto';
import { State } from '../entities/state.entity';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(State)
    private readonly countryRepository: Repository<State>,
  ) {}

  async findOne(id: string) {
    const country = await this.countryRepository.findOne({
      where: { id },
    });

    if (!country) throw new ConflictException(`State do not exist (USFO-001)`);
    return country;
  }

  async findAll() {
    const country = await this.countryRepository.find();

    if (country.length === 0)
      throw new ConflictException(`No users registered (USFA-001)`);
    return country;
  }

  async create(createStateDto: CreateStateDto) {
    const { name } = createStateDto;

    const country = await this.countryRepository.findOne({
      where: { name },
    });

    if (country) throw new ConflictException(`State not available (USC-001)`);

    return { id: (await this.countryRepository.save(createStateDto)).id };
  }

  async delete(id: string) {
    this.countryRepository.delete({ id });
  }
}
