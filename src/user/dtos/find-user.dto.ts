// src/user/dto/find-user-by-id.dto.ts

import { IsInt } from 'class-validator';

export class FindUserDto {
  @IsInt() 
  id: number;
}
