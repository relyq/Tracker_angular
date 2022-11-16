export interface User {
  id: string;
  username: string;
  email: string;
  organizationsId: string[];
  firstName?: string;
  lastName?: string;
  created?: Date;
}
