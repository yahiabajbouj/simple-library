import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class LoginDto {
    @IsNotEmpty()
    @ApiProperty({ example: 'Yahia Bajbouj' })
    username: string;

    @IsNotEmpty()
    @ApiProperty({ example: '123456789' })
    password: string;
}