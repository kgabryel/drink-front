export interface ReorderPhotoRequest {
  order: OrderData[];
}

interface OrderData {
  id: number;
  index: number;
}
