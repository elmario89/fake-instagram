import {iUser} from "../models/user.model";
import { Request } from 'express';

export interface iUserRequest extends Request {
    user?: iUser;
}