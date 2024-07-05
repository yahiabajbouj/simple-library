import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateBookDto {
    @IsNotEmpty()
    @ApiProperty({ example: 'The Great Gatsby' })
    name: string;

    @IsNotEmpty()
    @ApiProperty({ example: '1234567890' })
    isbn: string;

    @IsNotEmpty()
    @ApiProperty({ example: 'https://example.com/image.jpg' })
    image: string;

    @IsNotEmpty()
    @ApiProperty({ example: 'A novel by F. Scott Fitzgerald' })
    description: string;

    @IsNotEmpty()
    @ApiProperty({ example: 'Fiction' })
    category: string;

    @IsNotEmpty()
    @ApiProperty({ example: true })
    is_hot: boolean;
}
