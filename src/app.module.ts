import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { authModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { TaskSchema } from './schema/task.schema';

@Module({
  imports: [UserModule, TaskModule, authModule, 
    MongooseModule.forRoot('mongodb://localhost:27017', {dbName: 'Notes_DB'}),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }])
  ]
})
export class AppModule {}
