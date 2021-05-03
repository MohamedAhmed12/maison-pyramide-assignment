
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {
    constructor ()
    {
        super( {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "secretkey123@#",
        } );
    }

    validate( payload: any )
    {
        return { name: payload.username, id: payload.sub };
    }
}