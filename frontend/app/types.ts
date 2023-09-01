export type Book = {
  ID: number;
  Title: string;
  Status: BookStatus
}

export type BookStatus = 'to-read' | 'in-progress' | 'completed';
export type ColumnName = 'To read' | 'In progress' | 'Completed';