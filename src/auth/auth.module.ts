import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { config } from 'src/config/envConfig';
// import { JwtStrategy } from 'src/auth/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schema/user.schema';
import { RefreshToken, RefreshTokenSchema } from 'src/schema/refresh-token.schema';
import { ResetToken, ResetTokenSchema } from 'src/schema/reset-token,schema';
import { authController } from './authController';
import { AuthService } from './authService';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }, {
            name: RefreshToken.name,
            schema: RefreshTokenSchema,
        },
        {
            name: ResetToken.name,
            schema: ResetTokenSchema,
        },]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: config.SECRET_KEY,
            signOptions: { expiresIn: '60s' }
        })
    ],
    controllers: [ authController ],
    providers: [AuthService],
    exports: [JwtModule, PassportModule, AuthService]
})
export class AuthModule { }