export interface Ticket {
  id?: number;
  projectId: number;
  title: string;
  description: string;
  priority: number;
  type: string;
  status: string;
  submitterId?: string;
  submitter: string;
  assigneeId?: string;
  assignee: string;
  created: Date;
  closed?: Date;
}
