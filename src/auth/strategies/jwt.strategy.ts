import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Request } from 'express'
import { IJwtPayload } from '../interfaces/jwt-payload.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request & { cookies?: { [key: string]: string } }) => req?.cookies?.token || null,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    })
  }

  validate(payload: IJwtPayload) {
    return { sub: payload.sub, email: payload.email, role: payload.role }
  }
}
