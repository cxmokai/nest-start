import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Task } from 'src/tasks/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Index()
  username: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  passwordHash: string;

  @Column({ default: true })
  isActive: boolean;

  // @Column({
  //   type: 'timestamp',
  //   default: () => 'CURRENT_TIMESTAMP',
  // })
  @CreateDateColumn()
  createTime: Date;

  // @Column({
  //   type: 'timestamp',
  //   default: () => 'CURRENT_TIMESTAMP',
  //   onUpdate: 'CURRENT_TIMESTAMP',
  // })
  @UpdateDateColumn()
  updateTime: Date;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
