import { Ticket } from './ticket';

export interface Project {
  id: number;
  name: string;
  description: string;
  created?: Date;
}
