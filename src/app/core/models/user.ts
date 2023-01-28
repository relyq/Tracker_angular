export interface User {
  id: string;
  username: string;
  email: string;
  organizationsId: string[];
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  roles: OrganizationRole[];
  created?: Date;
}

export interface OrganizationRole {
  organizationId: string;
  roleId: string;
}
