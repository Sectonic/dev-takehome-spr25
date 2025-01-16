export interface PaginationProps {
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  onPageChange: (page: number) => void;
}