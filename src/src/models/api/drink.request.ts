export interface DrinkRequest {
  name: string;
  description: string;
  favourite: boolean;
  public: boolean;
  tags: string[];
  positions: Position[];
}

interface Position {
  amount: string;
  ingredient: number;
}
