import { TokenInterface } from '@backend/libs/interfaces';
import { UserRDO } from './user.rdo';
export declare class LoggedUserRDO extends UserRDO implements TokenInterface {
    accessToken: string;
}
