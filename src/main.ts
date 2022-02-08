import { Editor, MarkdownView, Plugin } from 'obsidian';
import { excelToMarkdown, getExcelRows, isExcelData, excelRowsToMarkdown } from './excel-markdown-tables';

export default class ExcelToMarkdownTablePlugin extends Plugin {
	pasteHandler = (evt: ClipboardEvent, editor: Editor) => {
		if (evt.clipboardData === null) {
			return;
		}

		const rawData = evt.clipboardData.getData("text");
		const rows = getExcelRows(rawData);
		
		if (isExcelData(rows)) {
			const markdownData = excelRowsToMarkdown(rows);
			editor.replaceSelection(markdownData + '\n');
			evt.preventDefault();
		}
	}

	async onload() {
		this.addCommand({
			id: 'excel-to-markdown-table',
			name: 'Excel to Markdown',
			hotkeys: [
				{
					modifiers: ["Mod", "Alt"],
					key: "v"
				}
			],
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				const text = await navigator.clipboard.readText()
				editor.replaceSelection(excelToMarkdown(text))
			}
		});

		this.app.workspace.on("editor-paste", this.pasteHandler);
	}

	onunload() {
		this.app.workspace.off("editor-paste", this.pasteHandler);
	}
}
