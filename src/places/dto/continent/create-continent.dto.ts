import { ApiProperty } from '@nestjs/swagger/dist';
import { IsArray, IsString } from 'class-validator';
import { Country } from 'src/places/entities/country.entity';

export class CreateContinentDto {
  @ApiProperty({ description: `Continent's name` })
  @IsString()
  name: string;

  
  @ApiProperty({ description: `Continent's contries` })
  @IsArray()
  states: Country[];

}
