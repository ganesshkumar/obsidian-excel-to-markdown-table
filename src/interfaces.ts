export interface TableCellAlignment {
  prefix: string,
  postfix: string,
  adjust: number
}

export interface TableSizeMetadata {
  columnWidths: number[],
  colAlignments: string[]
}
