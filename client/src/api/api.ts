export * from './entityManagement.service';
import { EntityManagementService } from './entityManagement.service';
export * from './userAuthorization.service';
import { UserAuthorizationService } from './userAuthorization.service';
export const APIS = [EntityManagementService, UserAuthorizationService];
