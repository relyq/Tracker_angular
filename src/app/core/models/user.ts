export interface User {
  id: string;
  username: string;
  email: string;
  organizationId: string;
  firstName?: string;
  lastName?: string;
  created?: Date;
}
