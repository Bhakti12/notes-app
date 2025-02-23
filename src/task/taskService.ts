import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Task } from "src/schema/task.schema";
import { TaskCreateDto } from "./dto/task-create.dto";

@Injectable()
export class TaskService {
    constructor(@InjectModel(Task.name) private readonly taskModel: Model<Task>) {

    }

    async create(taskData: TaskCreateDto) {
        const task = new this.taskModel(taskData);
        return task.save();
    }

    async findAll() {
        return this.taskModel.find().exec();
    }

    async findOne(id: string) {
        return this.taskModel.findById(id).exec();
    }

    async update(id: string, taskData: TaskCreateDto) {
        return this.taskModel.findByIdAndUpdate(id, taskData, { new: true }).exec();
    }

    async remove(id: string) {
        await this.taskModel.findByIdAndDelete(id).exec();
        return 'Task is deleted successfully';
    }

}