import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AuthGuard implements CanActivate {
    public constructor( private readonly reflector: Reflector ) {
    }

    public canActivate( context: ExecutionContext ): boolean {
        const isPublic = this.reflector.get<boolean>( "isPublic", context.getHandler() );

        if ( isPublic ) {
            return true;
        }

        // Make sure to check the authorization, for now, just return false to have a difference between public routes.
        return false;
    }
}