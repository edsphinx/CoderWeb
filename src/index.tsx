import { useState } from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
	const [input, setInput] = useState('');
	const [code, setCode] = useState('');
	return (
		<div>
			<textarea></textarea>
			<div>
				<button>Submit</button>
			</div>
			<pre>{code}</pre>
		</div>
	);
};

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el!);

root.render(<App />);
