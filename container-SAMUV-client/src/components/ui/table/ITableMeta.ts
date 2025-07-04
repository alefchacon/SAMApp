import { Table } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends unknown> {
    updateData: (rowIndex: number, path: string, value: any) => void;
  }
}
