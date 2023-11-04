import { IsNotEmpty } from 'class-validator';
import { SaveUserDto } from './save-users.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(SaveUserDto) {
  @IsNotEmpty()
  id: string;
}
