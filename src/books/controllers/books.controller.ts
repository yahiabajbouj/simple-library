import { Controller, Get, Post, Delete, Put, Param, Body, UseGuards, SetMetadata, Req } from '@nestjs/common';
import { BooksService } from '../services/books.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateBookDto } from '../Dto/CreateBookDto';
import { UpdateBookDto } from '../Dto/UpdateBookDto';
import { Book } from '../modules/book.entity';
import { AuthGuard } from 'src/auth/guard/auth-guard.guard';
import { BorrowService } from '../services/brorrow.service';
import { CreateBorrowDto } from '../Dto/CreateBorrowDto';
import { Borrow } from '../modules/Borrow.entity';

@ApiTags('books')
@Controller('books')
@UseGuards(AuthGuard)
export class BooksController {
    constructor(
        private readonly booksService: BooksService,
        private readonly borrowService: BorrowService,
    ) { }

    @Get()
    findAll(): Promise<Book[]> {
        return this.booksService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Book> {
        return this.booksService.findOne(id);
    }

    @Post()
    @SetMetadata('role', 'Admin')
    create(@Body() book: CreateBookDto): Promise<Book> {
        return this.booksService.create(book);
    }

    @Put(':id')
    @SetMetadata('role', 'Admin')
    update(@Param('id') id: string, @Body() book: UpdateBookDto) {
        return this.booksService.update(id, book);
    }

    @Delete(':id')
    @SetMetadata('role', 'Admin')
    remove(@Param('id') id: string): Promise<void> {
        return this.booksService.remove(id);
    }

    @Post('borrow_book')
    @SetMetadata('role', 'User')
    borrowBook(@Req() req, @Body() borrow: CreateBorrowDto): Promise<Borrow> {
        return this.borrowService.borrowBook(borrow, req.user);
    }
}
