import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { User } from "../users/users.model";
import 'dotenv/config'

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: '24h',
        algorithm: 'ES512'
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  exports: [AuthService],
})
export class AuthModule {}
