import './code-editor.css';
import './syntax.css';
import { useRef } from 'react';
import MonacoEditor, { Monaco, OnMount } from '@monaco-editor/react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import traverse from '@babel/traverse';
import { parse } from '@babel/parser';
import MonacoJSXHighlighter from 'monaco-jsx-highlighter';

interface CodeEditorProps {
	initialValue: string;
	onChange(value: string): void;
}

const CodeEditor = ({ onChange, initialValue }: CodeEditorProps) => {
	const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();

	const onEditorMount: OnMount = (
		editor: monaco.editor.IStandaloneCodeEditor,
		monacoEditor: Monaco
	) => {
		editorRef.current = editor;
		editor.onDidChangeModelContent(() => {
			onChange(editor.getValue());
		});
		editor.getModel()?.updateOptions({ tabSize: 2 });

		const defaultOptions = {
			parser: 'babel', // for reference only, only babel is supported right now
			isHighlightGlyph: true, // if JSX elements should decorate the line number gutter
			iShowHover: false, // if JSX types should  tooltip with their type info
			isUseSeparateElementStyles: false, // if opening elements and closing elements have different styling
			// you can pass your own custom APIs, check core/ and uitls/ for more details
			// monacoEditorManager: null,
			// decoratorMapper: null,
			// jsxCommenter: null,
		};

		const highlighter = new MonacoJSXHighlighter(
			//@ts-ignore
			window.monaco,
			parse,
			traverse,
			editor,
			defaultOptions
		);

		// highlighter.highLightOnDidChangeModelContent(
		// 	() => {},
		// 	() => {},
		// 	undefined,
		// 	() => {}
		// );

		highlighter.highlightOnDidChangeModelContent(100);
		highlighter.addJSXCommentCommand();
	};

	const onFormatClick = () => {
		if (editorRef.current) {
			const unformatted = editorRef.current.getValue();

			const formatted = prettier
				.format(unformatted, {
					parser: 'babel',
					plugins: [parser],
					useTabs: false,
					semi: true,
					singleQuote: true,
				})
				.replace(/\n$/, '');

			editorRef.current?.setValue(formatted);
		}
	};

	return (
		<div className='editor-wrapper'>
			<button
				className='button button-format is-primary is-small'
				onClick={onFormatClick}
			>
				Format
			</button>
			<MonacoEditor
				onMount={onEditorMount}
				value={initialValue}
				language='javascript'
				height='500px'
				theme='vs-dark'
				options={{
					wordWrap: 'on',
					minimap: { enabled: false },
					showUnused: false,
					folding: false,
					lineNumbersMinChars: 3,
					fontSize: 16,
					scrollBeyondLastLine: false,
					automaticLayout: true,
				}}
			/>
		</div>
	);
};

export default CodeEditor;
