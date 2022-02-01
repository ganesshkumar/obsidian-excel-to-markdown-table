import { Editor, MarkdownView, Plugin } from 'obsidian';
import {excelToMarkdown} from './excel-markdown-tables';

export default class ExcelToMarkdownTablePlugin extends Plugin {
	async onload() {
		this.addCommand({
			id: 'excel-to-markdown-table',
			name: 'Excel to Markdown',
			hotkeys: [
				{
					modifiers: ["Ctrl", "Shift"],
					key: "v"
				}
			],
			editorCallback: async (editor: Editor, view: MarkdownView) => {
				const text = await navigator.clipboard.readText()
				editor.replaceSelection(excelToMarkdown(text))
			}
		});
	}

	onunload() {
	}
}
