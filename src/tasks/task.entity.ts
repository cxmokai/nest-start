import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: false })
  isDone: boolean;

  // @Column({
  //   type: 'timestamp',
  //   default: () => 'CURRENT_TIMESTAMP',
  // })
  @CreateDateColumn()
  @Index()
  createTime: Date;

  // @Column({
  //   type: 'timestamp',
  //   default: () => 'CURRENT_TIMESTAMP',
  //   onUpdate: 'CURRENT_TIMESTAMP',
  // })
  @UpdateDateColumn()
  updateTime: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
