import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IsPeriodValid } from '../decorators/is-period-valid.decorator';

export class CreateBorrowDto {
    @IsNotEmpty()
    @ApiProperty({ example: 2 })
    bookId: string;

    @IsNotEmpty()
    @ApiProperty({ example: '2023-01-11' })
    borrowDate: Date;
    
    @IsNotEmpty()
    @ApiProperty({ example: '2024-01-11' })
    @IsPeriodValid('borrowDate', { message: 'the max period between the borrow date and return date is 30 days' })
    returnDate: Date;
}
