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

import { StateService } from '../services/state.service';
import { CreateStateDto } from '../dto/state/create-state.dto';
import { IsPublic } from '../../auth/decorators/public.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags(`State`)
@Controller('state')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class StateController {
  constructor(private readonly countryService: StateService) {}

  @Post()
  @ApiOperation({ summary: `Create state` })
  create(@Body() createUserDto: CreateStateDto) {
    return this.countryService.create(createUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: `Find state` })
  findOne(@Param('id') id: string) {
    return this.countryService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: `Find all contries` })
  findAll() {
    return this.countryService.findAll();
  }

    
  @Delete(':id')
  @ApiOperation({ summary: 'Delete selected state' })
  deleteState(@Param('id') id: string) {
    return this.countryService.delete(id);
  }
}
