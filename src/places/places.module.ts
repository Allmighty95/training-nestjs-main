import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CountryService } from './services/country.service';
import { CountryController } from './controllers/country.controller';
import { Country } from './entities/country.entity';
import { ContinentService } from './services/continent.service';
import { StateService } from './services/state.service';
import { ContinentController } from './controllers/continent.controller';
import { StateController } from './controllers/state.controller';
import { Continent } from './entities/continent.entity';
import { State } from './entities/state.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Continent, Country, State])],
  controllers: [ContinentController, CountryController, StateController],
  providers: [ContinentService, CountryService, StateService],
  exports: [ContinentService, CountryService, StateService, TypeOrmModule],
})
export class PlacesModule {}
