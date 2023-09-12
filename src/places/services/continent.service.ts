import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateContinentDto } from '../dto/continent/create-continent.dto';
import { UpdateContinentDto } from '../dto/continent/update-continent.dto';
import { Continent } from '../entities/continent.entity';

@Injectable()
export class ContinentService {
  constructor(
    @InjectRepository(Continent)
    private readonly countryRepository: Repository<Continent>,
  ) {}

  async findOne(id: string) {
    const country = await this.countryRepository.findOne({
      where: { id },
    });

    if (!country)
      throw new ConflictException(`Continent do not exist (USFO-001)`);
    return country;
  }

  async findAll() {
    const country = await this.countryRepository.find();

    if (country.length === 0)
      throw new ConflictException(`No users registered (USFA-001)`);
    return country;
  }

  async create(createContinentDto: CreateContinentDto) {
    const { name } = createContinentDto;

    const country = await this.countryRepository.findOne({
      where: { name },
    });

    if (country)
      throw new ConflictException(`Continent not available (USC-001)`);

    return { id: (await this.countryRepository.save(createContinentDto)).id };
  }

  async delete(id:string) {
    this.countryRepository.delete({ id });
  }
}
