import { ApiProperty } from '@nestjs/swagger/dist';
import { IsObject, IsString } from 'class-validator';
import { Country } from 'src/places/entities/country.entity';

export class CreateStateDto {
  @ApiProperty({ description: `State's name` })
  @IsString()
  name: string;
  @ApiProperty({ description: `State's country` })
  @IsObject()
  country: Country;
}
