import './text-editor.css';
import { useEffect, useRef, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';

const TextEditor = () => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [editing, setEditing] = useState(false);
	const [value, setValue] = useState<string | undefined>('# Header');

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
					value={value}
					onChange={setValue}
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
					source={value}
				/>
			</div>
		</div>
	);
};

export default TextEditor;
