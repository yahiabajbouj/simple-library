import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

enum UserRolesEnum {
  Admin = 'Admin',
  User = 'User',
}

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'Yahia Bajbouj' })
  username: string;

  @IsNotEmpty()
  @ApiProperty({ example: '123456789' })
  password: string;

  @IsNotEmpty()
  @IsEnum(UserRolesEnum)
  @ApiProperty({ example: 'User' })
  role: string;
}