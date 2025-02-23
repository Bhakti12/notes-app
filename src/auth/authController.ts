import { Body, Controller, Post, Put, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./authService";
import { UserCreateDto } from "src/auth/dto/user-create.dto";
import { LoginDto } from "src/auth/dto/login.dto";
import { RefreshTokenDto } from "src/auth/dto/refresh-token.dto";
import { ChangePasswordDto } from "src/auth/dto/change-password.dto";
import { AuthenticationGuard } from "./authntication.guard";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('auth')
export class authController {
    constructor(private readonly authService: AuthService) {

    }
    
    @Post('signup')
    async SignUp(@Body() userDto: UserCreateDto) {
        return this.authService.signUp(userDto);
    }

    @Post('login')
    async login(@Body() credentials: LoginDto) {
        return this.authService.login(credentials);
    }

    @Post('refresh')
    async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
        return this.authService.refreshTokens(refreshTokenDto.refreshToken);
    }

    @UseGuards(AuthenticationGuard)
    @Put('change-password')
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