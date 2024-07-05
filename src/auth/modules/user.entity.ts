// user.entity.ts
import { Borrow } from 'src/books/modules/Borrow.entity';
import { Book } from 'src/books/modules/book.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: ["Admin", "User"],
  })
  role: string;

  @OneToMany(() => Borrow, borrow => borrow.book)
  borrows: Borrow[];

  @ManyToMany(() => Book, Book => Book.users)
  // @JoinTable({ name: 'borrow', joinColumn: { name: 'userId' }, inverseJoinColumn: { name: 'bookId' } })
  books: Book[];
}
