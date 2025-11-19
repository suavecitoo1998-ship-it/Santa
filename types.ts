export interface WishItem {
  id: string;
  title: string;
  price: number | null;
  url: string;
  description?: string;
  purchased: boolean;
  aiLoading?: boolean;
}

export interface AddItemFormProps {
  onAdd: (title: string, price: string, url: string) => void;
}
