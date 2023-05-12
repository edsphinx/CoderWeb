import './text-editor.css';
import { useEffect, useRef, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';

interface TextEditorProps {
	cell: Cell;
}

const TextEditor = ({ cell }: TextEditorProps) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [editing, setEditing] = useState(false);
	const { updateCell } = useActions();

	useEffect(() => {
		const listener = (e: MouseEvent) => {
			if (ref.current && e.target && ref.current.contains(e.target as Node)) {
				return;
			}

			setEditing(false);
		};
		document.addEventListener('click', listener, { capture: true });

		return () => {
			document.removeEventListener('click', listener, { capture: true });
		};
	}, []);

	if (editing) {
		return (
			<div ref={ref}>
				<MDEditor
					className='text-editor'
					value={cell.content}
					onChange={(v) => updateCell(cell.id, v || '')}
				/>
			</div>
		);
	}

	return (
		<div
			className='text-editor card'
			onClick={() => setEditing(true)}
		>
			<div>
				<MDEditor.Markdown
					className='card-content'
					source={cell.content || '## Click to edit'}
				/>
			</div>
		</div>
	);
};

export default TextEditor;
