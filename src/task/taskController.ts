import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { TaskService } from "./taskService";
import { TaskCreateDto } from "./dto/task-create.dto";
import { ApiTags } from "@nestjs/swagger";
import { AuthenticationGuard } from "src/auth/authntication.guard";

@ApiTags('Task')
@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {

    }

    @UseGuards(AuthenticationGuard)
    @Post()
    async create(@Body() taskData: TaskCreateDto) {
        return this.taskService.create(taskData);
    }

    @UseGuards(AuthenticationGuard)
    @Get()
    async findAll() {
        return this.taskService.findAll();
    }

    @UseGuards(AuthenticationGuard)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.taskService.findOne(id);
    }

    @UseGuards(AuthenticationGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() taskData: TaskCreateDto) {
        return this.taskService.update(id, taskData);
    }

    @UseGuards(AuthenticationGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.taskService.remove(id);
    }
}