import './preview.css';
import { useEffect, useRef } from 'react';

interface PreviewProps {
	code: string;
	err: string;
}

const html = `
		<html>
			<head></head>
			<body>
				<div id="root"></div>
				<script>
					const handleError = (err) => {
						const root = document.querySelector('#root');
						root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
						console.log(err);
					};

					window.addEventListener('error', e => {
						e.preventDefault();
						handleError(e.error);
					});
					
					window.addEventListener('message', e => {
						try {
							eval(e.data);
						} catch (err) {
							handleError(err);
						}
					}, false);
				</script>
			</body>
		</html>
	`;

const Preview = ({ code, err }: PreviewProps) => {
	const iframe = useRef<any>();

	useEffect(() => {
		iframe.current.srcdoc = html;
		setTimeout(() => {
			iframe.current.contentWindow.postMessage(code, '*');
		}, 50);
	}, [code]);

	console.log(err);

	return (
		<div className='preview-wrapper'>
			<iframe
				ref={iframe}
				title='codePreview'
				sandbox='allow-scripts'
				srcDoc={html}
			/>
			{err && <div className='preview-error'>{err}</div>}
		</div>
	);
};

export default Preview;
