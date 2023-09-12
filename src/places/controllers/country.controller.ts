import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CountryService } from '../services/country.service';
import { CreateCountryDto } from '../dto/country/create-country.dto';
import { IsPublic } from '../../auth/decorators/public.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags(`Country`)
@Controller('country')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  @ApiOperation({ summary: `Create country` })
  create(@Body() createUserDto: CreateCountryDto) {
    return this.countryService.create(createUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: `Find country` })
  findOne(@Param('id') id: string) {
    return this.countryService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: `Find all contries` })
  findAll() {
    return this.countryService.findAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete selected country' })
  deleteCountry(@Param('id') id: string) {
    return this.countryService.delete(id);
  }
}
