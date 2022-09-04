export interface Comment {
  id: number;
  ticketId: number;
  authorId: string;
  parentId?: number;
  content: string;
  created: Date;
}
