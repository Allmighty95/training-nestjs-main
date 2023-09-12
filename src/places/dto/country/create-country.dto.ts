import { ApiProperty } from '@nestjs/swagger/dist';
import { IsArray, IsObject, IsString } from 'class-validator';
import { Continent } from 'src/places/entities/continent.entity';
import { State } from 'src/places/entities/state.entity';

export class CreateCountryDto {
  @ApiProperty({ description: `Country's name` })
  @IsString()
  name: string;

  @ApiProperty({ description: `Country's continent` })
  @IsObject()
  continent: Continent;
  
  @ApiProperty({ description: `Country's states` })
  @IsArray()
  states: State[];

}
