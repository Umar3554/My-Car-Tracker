import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = authHeader;
    if (!token) {
      throw new UnauthorizedException('Access token is missing');
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
        id: string;
        name: string;
        email: string;
        role: string;
      };

      // Attach only the `id` to the request object
      request['userId'] = decoded.id;

      return true; // Allow access to the route
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }
  }
}
