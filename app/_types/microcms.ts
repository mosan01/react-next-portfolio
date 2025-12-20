export type MicroCMSDate = {
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  revisedAt?: string;
};

export type Blog = MicroCMSDate & {
  id: string;
  title: string;
  content: string;
  description?: string;
};
