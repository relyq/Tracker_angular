export interface Comment {
  id: number;
  ticketId: number;
  authorId: number;
  parentId?: number;
  content: string;
  created: Date;
}
