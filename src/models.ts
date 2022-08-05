export interface Item {
  id: number;
  title: string;
}

export interface Board {
  id: number;
  title: string;
  items: Item[];
}