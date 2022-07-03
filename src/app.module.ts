import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'todo.sql',
      synchronize: true,
      autoLoadEntities: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    UsersModule,
    TasksModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
  exports: [],
})
export class AppModule {}
