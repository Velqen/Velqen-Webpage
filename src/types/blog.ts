export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  category: string;
  date: string;
  image: string;
  content: string | string[]; 
};