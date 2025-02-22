import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Task{
    @Prop()
    title: string;

    @Prop()
    content: string;

    @Prop()
    createdAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);