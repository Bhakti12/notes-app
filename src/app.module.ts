import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { config } from './config/envConfig';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TaskModule, AuthModule,
    MongooseModule.forRoot(config.DB, { dbName: 'Notes_DB' }),
    // MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    // MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ]
})
export class AppModule { }
