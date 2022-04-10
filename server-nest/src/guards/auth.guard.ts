import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    public constructor(private readonly reflector: Reflector,
                       private readonly jwtService: JwtService) {}

    public canActivate( context: ExecutionContext ): boolean {
        const isPublic = this.reflector.get<boolean>( "isPublic", context.getHandler() );

        if (isPublic) {
            return true;
        }

        const req = context.switchToHttp().getRequest();
        try {
            const authHeader = req.headers.authorization;
            const [bearer, token] = authHeader.split(' ');

            if (bearer !== 'Bearer' || !token) {
                throw new HttpException("You have to authorize to use this method", HttpStatus.FORBIDDEN);
            }

            const user = this.jwtService.verify(token);
            req.requestUser = user;

            return true;
        } catch (err) {
            throw new HttpException("You have to authorize to use this method", HttpStatus.FORBIDDEN);
        }

        return false;
    }
}