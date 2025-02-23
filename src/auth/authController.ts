import { Body, Controller, Post, Put, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./authService";
import { UserCreateDto } from "src/auth/dto/user-create.dto";
import { LoginDto } from "src/auth/dto/login.dto";
import { RefreshTokenDto } from "src/auth/dto/refresh-token.dto";
import { ChangePasswordDto } from "src/auth/dto/change-password.dto";
import { AuthenticationGuard } from "./authntication.guard";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('auth')
export class authController {
    constructor(private readonly authService: AuthService) {

    }

    @Post('signup')
    @ApiCreatedResponse({
        description: 'created sucessfully',
        isArray: false,
        schema: {
            example: {
                "name": "Bhakti",
                "email": "bhakti@yopmail.com",
                "password": "$2b$10$10ywtq/QbOmE/t9IcsvzWOvo7MuGRkRsjLtyEdDJHWkcIp9CO.F7y",
                "_id": "67bac8f1f6933ce0bca2d75d",
                "__v": 0
            }
        }
    })
    @ApiBadRequestResponse({
        description: 'Bad Request',
        schema: {
            oneOf: [
                {
                    example: {
                        statusCode: 400,
                        message: ["name must be a string"],
                        error: "Bad Request"
                    }
                },
                {
                    example: {
                        statusCode: 400,
                        message: [
                            "name must be a string",
                            "password must be longer than or equal to 6 characters"
                        ],
                        error: "Bad Request"
                    }
                },
                {
                    example: {
                        statusCode: 400,
                        message: "Email already in use",
                        error: "Bad Request"
                    }
                },
                {
                    example: {
                        statusCode: 400,
                        message: ["email must be an email"],
                        error: "Bad Request"
                    }
                },
                {
                    example: {
                        statusCode: 400,
                        message: ["password must be longer than or equal to 6 characters"],
                        error: "Bad Request"
                    }
                }
            ]
        }
    })
    async SignUp(@Body() userDto: UserCreateDto) {
        return this.authService.signUp(userDto);
    }

    @Post('login')
    @ApiCreatedResponse({
        description: 'login sucessfully',
        schema: {
            example: {
                statusCode: 200,
                "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2JhYzhmMWY2OTMzY2UwYmNhMmQ3NWQiLCJpYXQiOjE3NDAyOTQ1MTMsImV4cCI6MTc0MDMzMDUxM30.6NWD15kzgudw_eLLkASFCyeTrOc6GTj4ceGl-auMycg",
                "refreshToken": "b2c5d1d6-a8dc-4269-bb06-0b813b43174b",
                "userId": "67bac8f1f6933ce0bca2d75d"
            }

        }
    })
    @ApiBadRequestResponse({
        description: 'Bad Request',
        schema: {
            example: {
                statusCode: 400,
                "message": [
                    "email must be an email"
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
                "message": "Wrong credentials",
                "error": "Unauthorized",
            }
        }
    })
    async login(@Body() credentials: LoginDto) {
        return this.authService.login(credentials);
    }

    @Post('refresh')
    @ApiCreatedResponse({
        description: 'refresh token generate successfully',
        schema: {
            example: {
                statusCode: 200,
                "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2JhYzhmMWY2OTMzY2UwYmNhMmQ3NWQiLCJpYXQiOjE3NDAyOTQ2MzAsImV4cCI6MTc0MDMzMDYzMH0.7yJh2EH8J9TscUGxwNqlTC0WZbDho7AKS0h6pS4AwsY",
                "refreshToken": "365701bc-dd7a-4f7a-bc83-a6b76bdff4fb"
            }
        }
    })
    @ApiUnauthorizedResponse({
        description: 'Unauthorized',
        schema: {
            example: {
                statusCode: 401,
                "message": "Refresh Token is invalid",
                "error": "Unauthorized",
            }
        }
    })
    async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
        return this.authService.refreshTokens(refreshTokenDto.refreshToken);
    }

    @UseGuards(AuthenticationGuard)
    @Put('change-password')
    @ApiCreatedResponse({
        description: 'password changed successfully',
        schema: {
            example: {
                statusCode: 200,
                "_id": "67bac8f1f6933ce0bca2d75d",
                "name": "Bhakti",
                "email": "bhakti@yopmail.com",
                "password": "$2b$10$60wEZhSosLJuDFXFh8I70.UkuF8YWJJa6.T.4RPyJk8vQQQSFnnKq",
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
    @ApiBadRequestResponse({
        description: 'Bad Request',
        schema: {
            example: {
                statusCode: 400,
                "message": [
                    "Password must contain at least one number",
                    "newPassword must be longer than or equal to 6 characters",
                    "newPassword must be a string"
                ],
                "error": "Bad Request",
            }
        }
    })
    async changePassword(
        @Body() changePasswordDto: ChangePasswordDto,
        @Req() req,
    ) {
        return this.authService.changePassword(
            req.userId,
            changePasswordDto.oldPassword,
            changePasswordDto.newPassword,
        );
    }
}