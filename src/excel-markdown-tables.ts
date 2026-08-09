import * as helper from './excel-markdown-helpers';

const LINE_ENDING = "\n"

/**
 * Converts a string payload into a Markdown formatted table
 * @param rawData A table-like string
 */
export function excelToMarkdown(rawData: string): string {
    let data = rawData.trim();
    var intraCellNewlineReplacedData = helper.replaceIntraCellNewline(data)
    var rows = helper.splitIntoRowsAndColumns(intraCellNewlineReplacedData);
    var {columnWidths, colAlignments } = helper.getColumnWidthsAndAlignments(rows);
    const markdownRows = helper.addMarkdownSyntax(rows, columnWidths);

    return helper.addAlignmentSyntax(markdownRows, columnWidths, colAlignments).join(LINE_ENDING);
}

export function getExcelRows(rawData: string): string[][] {
    let data = rawData.trim();
    var intraCellNewlineReplacedData = helper.replaceIntraCellNewline(data)
    return helper.splitIntoRowsAndColumns(intraCellNewlineReplacedData);
}

export function excelRowsToMarkdown(rows: string[][]): string {
    var {columnWidths, colAlignments } = helper.getColumnWidthsAndAlignments(rows);
    const markdownRows = helper.addMarkdownSyntax(rows, columnWidths);

    return helper.addAlignmentSyntax(markdownRows, columnWidths, colAlignments).join(LINE_ENDING);
}

export function isExcelData(rows: string[][]): boolean {
    if (!(rows && rows[0] && rows[0].length > 1)) {
        return false;
    }
    // If we have multiple entries per row, each if this is the case for all rows.
    const width: number = rows[0].length;
    for (var row of rows) {
        console.log("lenght: " + row.length);
        if (row.length != width) { return false; }
    }
    return true;
}
