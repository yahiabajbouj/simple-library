import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { Borrow } from '../modules/Borrow.entity';
import { Book } from '../modules/book.entity';
import { CreateBorrowDto } from '../Dto/CreateBorrowDto';
import { User } from 'src/auth/modules/user.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class BorrowService {
    constructor(
        @InjectRepository(Borrow)
        private borrowRepository: Repository<Borrow>,
        @InjectRepository(Book) private booksRepository: Repository<Book>,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) { }

    async borrowBook(borrowDto: CreateBorrowDto, user: User): Promise<Borrow> {
        const book = await this.booksRepository.findOne({ where: { id: +borrowDto.bookId } });
        const userAssign = await this.userRepository.findOne({ where: { id: +user.id } });

        const borrow = new Borrow();
        borrow.user = userAssign;
        borrow.book = book;
        borrow.borrowDate = borrowDto.borrowDate;
        borrow.returnDate = borrowDto.returnDate;
        return this.borrowRepository.save(borrow);
    }

    async findAllBorrows(): Promise<Borrow[]> {
        const oneDayBeforeReturn = new Date();
        oneDayBeforeReturn.setDate(oneDayBeforeReturn.getDate() - 1);

        return await this.borrowRepository.find({
            where: {
                returnDate: oneDayBeforeReturn
            }
        });
    }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async checkDueDates() {
        const borrows = await this.findAllBorrows();
        const now = new Date();

        borrows.forEach(borrow => {
            // Send notification to user
        });
    }
}
