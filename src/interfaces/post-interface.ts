export interface PostAttributes {
  id: number;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  userId: number;
}
