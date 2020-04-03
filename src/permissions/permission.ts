import { permissions as accPermissions } from './accountSettings';
import { permissions as phoneMangerPermissions } from './phoneNumberManager';


export const roles: { [key: string]: any } = {
  master_admin: {
    permissions: [
      ...accPermissions.master_admin,
      ...accPermissions.admin,
      ...accPermissions.staff,
      ...accPermissions.junior_staff,

      ...phoneMangerPermissions.master_admin,
      ...phoneMangerPermissions.admin,
      ...phoneMangerPermissions.staff,
      ...phoneMangerPermissions.junior_staff
    ]
  },
  admin: {
    permissions: [
      ...phoneMangerPermissions.admin,
      ...phoneMangerPermissions.staff,
      ...phoneMangerPermissions.junior_staff
    ]
  },
  staff: {
    permissions: [
      ...phoneMangerPermissions.staff,
      ...phoneMangerPermissions.junior_staff
    ]
  },
  junior_staff: {
    permissions: [...phoneMangerPermissions.junior_staff]
  }
}
