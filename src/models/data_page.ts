export interface DataPage<T> {
  data: T[];
  total?: number;
  next?: string;
}
