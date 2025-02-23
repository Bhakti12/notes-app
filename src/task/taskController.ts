import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { TaskService } from "./taskService";
import { TaskCreateDto } from "./dto/task-create.dto";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AuthenticationGuard } from "src/auth/authntication.guard";

@ApiTags('Task')
@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {

    }

    @UseGuards(AuthenticationGuard)
    @Post()
    @ApiCreatedResponse({
        description: 'login sucessfully',
        schema: {
            example: {
                statusCode: 200,
                "title": "Daily standup",
                "content": "Your daily updates will be share here",
                "_id": "67bacc1785a717ae5c609940",
                "createdAt": "2025-02-23T07:19:51.814Z",
                "__v": 0
            }

        }
    })
    @ApiBadRequestResponse({
        description: 'Bad Request',
        schema: {
            example: {
                statusCode: 400,
                "message": [
                    "content should not be empty",
                    "content must be a string"
                ],
                "error": "Bad Request",
            }
        }
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
        schema: {
            example: {
                statusCode: 401,
                "message": "Invalid token",
                "error": "Unauthorized",
            }
        }
    })
    async create(@Body() taskData: TaskCreateDto) {
        return this.taskService.create(taskData);
    }

    @UseGuards(AuthenticationGuard)
    @Get()
    @ApiCreatedResponse({
        description: 'login sucessfully',
        schema: {
            example: {
                statusCode: 200,
                "_id": "67bacc1785a717ae5c609940",
                "title": "Daily standup",
                "content": "Your daily updates will be share here",
                "createdAt": "2025-02-23T07:19:51.814Z",
                "__v": 0
            }
        }
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
        schema: {
            example: {
                statusCode: 401,
                "message": "Invalid token",
                "error": "Unauthorized",
            }
        }
    })
    async findAll() {
        return this.taskService.findAll();
    }

    @UseGuards(AuthenticationGuard)
    @Get(':id')
    @ApiCreatedResponse({
        description: 'login sucessfully',
        schema: {
            example: {
                statusCode: 200,
                "_id": "67bacc1785a717ae5c609940",
                "title": "Daily standup",
                "content": "Your daily updates will be share here",
                "createdAt": "2025-02-23T07:19:51.814Z",
                "__v": 0
            }
        }
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
        schema: {
            example: {
                statusCode: 401,
                "message": "Invalid token",
                "error": "Unauthorized",
            }
        }
    })
    async findOne(@Param('id') id: string) {
        return this.taskService.findOne(id);
    }

    @UseGuards(AuthenticationGuard)
    @Put(':id')
    @ApiCreatedResponse({
        description: 'login sucessfully',
        schema: {
            example: {
                statusCode: 200,
                "_id": "67bacc1785a717ae5c609940",
                "title": "Daily standup",
                "content": "Your daily updates will be share here 1231233",
                "createdAt": "2025-02-23T07:19:51.814Z",
                "__v": 0
            }
        }
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
        schema: {
            example: {
                statusCode: 401,
                "message": "Invalid token",
                "error": "Unauthorized",
            }
        }
    })
    async update(@Param('id') id: string, @Body() taskData: TaskCreateDto) {
        return this.taskService.update(id, taskData);
    }

    @UseGuards(AuthenticationGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.taskService.remove(id);
    }
}