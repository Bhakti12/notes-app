import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schema/user.schema";
import { UserCreateDto } from "src/auth/dto/user-create.dto";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "src/auth/dto/login.dto";
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from "src/schema/refresh-token.schema";
import { ResetToken } from "src/schema/reset-token,schema";

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private UserModel: Model<User>, @InjectModel(RefreshToken.name)
    private RefreshTokenModel: Model<RefreshToken>,
        @InjectModel(ResetToken.name)
        private ResetTokenModel: Model<ResetToken>, private jwtService: JwtService,) { }

    async signUp(signUpDto: UserCreateDto) {
        const { email, password, name } = signUpDto;

        const emailInUse = await this.UserModel.findOne({
            email: signUpDto.email
        });
        if (emailInUse) {
            throw new BadRequestException('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.UserModel.create({ name, email, password: hashedPassword });

        return user;
    }

    async login(credentials: LoginDto) {
        const { email, password } = credentials;
        //Find if user exists by email
        const user = await this.UserModel.findOne({ email });
        if (!user) {
            throw new UnauthorizedException('Wrong credentials');
        }

        //Compare entered password with existing password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new UnauthorizedException('Wrong credentials');
        }

        //Generate JWT tokens
        const tokens = await this.generateUserTokens(user._id);
        return {
            ...tokens,
            userId: user._id,
        };
    }

    async refreshTokens(refreshToken: string) {
        const token = await this.RefreshTokenModel.findOne({
            token: refreshToken,
            expiryDate: { $gte: new Date() },
        });

        if (!token) {
            throw new UnauthorizedException('Refresh Token is invalid');
        }
        return this.generateUserTokens(token.userId);
    }

    async generateUserTokens(userId) {
        const accessToken = this.jwtService.sign({ userId }, { expiresIn: '10h' });
        const refreshToken = uuidv4();

        await this.storeRefreshToken(refreshToken, userId);
        return {
            accessToken,
            refreshToken,
        };
    }

    async storeRefreshToken(token: string, userId: string) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 3);

        await this.RefreshTokenModel.updateOne(
            { userId },
            { $set: { expiryDate, token } },
            {
                upsert: true,
            },
        );
    }

    async changePassword(userId, oldPassword: string, newPassword: string) {
        //Find the user
        const user = await this.UserModel.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found...');
        }

        const passwordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!passwordMatch) {
            throw new UnauthorizedException('Wrong credentials');
        }

        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = newHashedPassword;
        const changedPassword = await user.save();

        return changedPassword;
    }
}
