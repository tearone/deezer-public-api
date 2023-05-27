export interface DzDataPage<T> {
  data: T[];
  total?: number;
  next?: string;
}
