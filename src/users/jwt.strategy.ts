import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./repositories/user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UnauthorizedException } from "@nestjs/common";
import { AuthCredentialsInput } from "./dto/auth-credentials.input";
import { sign } from "jsonwebtoken";

export class JwtStrategy extends PassportStrategy( Strategy ) {
    constructor (
        @InjectRepository( UserRepository )
        private userRepository: UserRepository
    )
    {
        super( {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
            secretOrKey: "secretkey123@#"
        } );
    }

    async validate( payload: AuthCredentialsInput ): Promise<User>
    {
        const { email } = payload;
        const user = await this.userRepository.findOne( { email } );

        if ( !user )
        {
            throw new UnauthorizedException();
        }
        return user;
    }
}