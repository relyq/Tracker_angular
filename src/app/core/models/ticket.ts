export interface Ticket {
  id: number;
  projectId: number;
  title: string;
  description: string;
  priority: number;
  type: string;
  status: string;
  submitterId: string;
  assigneeId: string;
  created?: Date;
  activity?: Date;
  closed?: Date;
}
