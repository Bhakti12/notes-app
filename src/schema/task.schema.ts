import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Task{
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);