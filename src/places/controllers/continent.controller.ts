import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ContinentService } from '../services/continent.service';
import { CreateContinentDto } from '../dto/continent/create-continent.dto';
import { IsPublic } from '../../auth/decorators/public.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags(`Continent`)
@Controller('continent')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ContinentController {
  constructor(private readonly countryService: ContinentService) {}

  @Post()
  @ApiOperation({ summary: `Create continent` })
  create(@Body() createUserDto: CreateContinentDto) {
    return this.countryService.create(createUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: `Find continent` })
  findOne(@Param('id') id: string) {
    return this.countryService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: `Find all contries` })
  findAll() {
    return this.countryService.findAll();
  }
  
  @Delete(':id')
  @ApiOperation({ summary: 'Delete selected continent' })
  deleteContinent(@Param('id') id: string) {
    return this.countryService.delete(id);
  }
}
