import * as cheerio from 'cheerio';

/**
 * Parse HTML content into text with \t and \n
 * @param table_html The raw html from clipboard
 * @returns Text string similiar to the row content from excel
 */
export function parseHtml(table_html: string): string {
    const $ = cheerio.load(table_html);
    let trs : cheerio.Cheerio<cheerio.Element> = $('tbody').find('tr');

    let table_str: string = "";
    trs.each((r_idx: number, row: cheerio.Element) => {
        const cells: cheerio.Cheerio<cheerio.Element> = $(row).find('td,th');
        const row_text: string[] = [];
        cells.each((c_idx: number, cell: cheerio.Element) => {
            // ignore hidden rows
            const style: string | undefined = $(row).attr('style');
            if (style) {
                const m = style.match(/.*display.*:.*none.*/g);
                if (m && m.length > 0) return;
            }

            // only consider cell text and ignore html
            const content: string = $(cell).text().trim();
            row_text.push(content);

        });
        table_str = table_str + row_text.join("\t") + "\n";
    });
    return table_str;
}
