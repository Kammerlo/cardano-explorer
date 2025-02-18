/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { BoxProps } from "@mui/material";

import { Option } from "src/components/commons/Filter";

export interface ColumnType {
  [key: string | number | symbol]: any;
}

export interface Column<T extends ColumnType = any> {
  key: string;
  title?: React.ReactNode;
  width?: number | string;
  minWidth?: number | string;
  isHiddenBorder?: boolean;
  maxWidth?: number | string;
  fixed?: boolean;
  leftFixed?: number | string;
  render?: (data: T, index: number) => ReactNode;
  sort?: ({ columnKey, sortValue }: { columnKey: string; sortValue: string }) => void;
}

export type TableHeaderProps<T extends ColumnType> = Pick<
  TableProps<T>,
  "columns" | "loading" | "defaultSort" | "showTabView" | "selected"
> & {
  selectable?: boolean;
  toggleSelectAll?: (checked: boolean) => void;
  isModal?: boolean;
  isSelectAll?: boolean;
};

export type TableRowProps<T extends ColumnType> = Pick<TableProps, "columns"> & {
  row: T;
  screen?: string;
  dataLength?: number;
  index: number;
  onClickExpandedRow?: (e: React.MouseEvent, record: T) => void;
  handleOpenDetail?: (e: React.MouseEvent, record: T) => void;
  showTabView?: boolean;
  selected?: boolean;
  selectedProps?: {
    className?: string;
    style?: React.CSSProperties;
  };
  selectable?: boolean;
  toggleSelection?: (row: T) => void;
  isSelected?: (item: T) => boolean;
  isModal?: boolean;
  onCallBackHeight?: (height: number) => void;
  expandedTable?: boolean;
};

export interface TableProps<T extends ColumnType = any> {
  isFullTableHeight?: boolean;
  columns: Column<T>[];
  data?: T[] | null;
  screen?: string;
  className?: string;
  emptyClassName?: string;
  style?: React.CSSProperties;
  loading?: boolean;
  initialized?: boolean;
  error?: React.ReactNode;
  statusError?: number | undefined;
  total?: {
    count: number;
    title: string;
    isDataOverSize?: boolean | null;
  };
  defaultSort?: string;
  pagination?: {
    onChange?: (page: number, size: number) => void;
    page?: number;
    size?: number;
    total?: number;
    handleCloseDetailView?: () => void;
    hideLastPage?: boolean;
  };
  allowSelect?: boolean;
  onClickRow?: (e: React.MouseEvent, record: T) => void;
  onClickExpandedRow?: (data: T) => void;
  expandedRowData?: { label: string; value: string; isFormatADA?: boolean }[];
  expandedTable?: boolean;
  showTabView?: boolean;
  /**
   * @default This props default is row index. If value is string, key of row is row[rowKey].
   * If rowKey is function, key is result of that fuction
   */
  rowKey?: string | ((record: T) => string | number | symbol);
  selected?: (string | number | symbol | null)[];
  selectedProps?: {
    className?: string;
    style?: React.CSSProperties;
  };
  showPagination?: boolean;
  selectable?: boolean;
  toggleSelection?: (row: T) => void;
  isSelected?: (row: T) => boolean;
  selectionKey?: string;
  onSelectionChange?: (items: string[]) => void;
  tableTitle?: string | React.ReactNode | React.ReactElement;
  fliterOptions?: Option[];
  renderAction?: (items, clearSelection: () => void) => React.ReactElement;
  onFilterChange?: (value: string, option?: Option) => void;
  isShowingResult?: boolean;
  /**
   * @deprecated: This props is deprecated. Please pass maxHeight attribute to tableWrapperProps.
   */
  maxHeight?: number | string;
  minHeight?: number | string;
  height?: number | string;
  tableWrapperProps?: BoxProps;
  isModal?: boolean;
  onCallBackHeight?: (height: number) => void;
}

export interface FooterTableProps {
  total?: TableProps["total"];
  pagination: TableProps["pagination"];
  loading: boolean;
  clearSelection?: () => void;
  optionList?: number[];
}

export interface TableTopHeaderProps {
  title?: string | React.ReactNode | React.ReactElement;
  fliterOptions?: Option[];
  renderAction?: (items) => React.ReactNode;
  selectedItems?: string[];
  isModal?: boolean;
  isSelectAll?: boolean;
  totalShowingResult?: number | boolean;
  onFilterChange?: (value: string, option?: Option) => void;
}
