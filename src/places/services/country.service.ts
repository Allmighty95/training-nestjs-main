import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateCountryDto } from '../dto/country/create-country.dto';
import { UpdateCountryDto } from '../dto/country/update-country.dto';
import { Country } from '../entities/country.entity';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async findOne(id: string) {
    const country = await this.countryRepository.findOne({
      where: { id },
    });

    if (!country)
      throw new ConflictException(`Country do not exist (USFO-001)`);
    return country;
  }

  async findAll() {
    const country = await this.countryRepository.find();

    if (country.length === 0)
      throw new ConflictException(`No users registered (USFA-001)`);
    return country;
  }

  async create(createCountryDto: CreateCountryDto) {
    const { name } = createCountryDto;

    const country = await this.countryRepository.findOne({
      where: { name },
    });

    if (country) throw new ConflictException(`Country not available (USC-001)`);

    return { id: (await this.countryRepository.save(createCountryDto)).id };
  }

  async delete(id: string) {
    this.countryRepository.delete({ id });
  }
}
