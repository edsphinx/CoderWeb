import { useEffect, useRef } from 'react';

interface PreviewProps {
	code: string;
}

const html = `
		<html>
			<head></head>
			<body>
				<div id="root"></div>
				<script>
					window.addEventListener('message', e => {
						try {
							eval(e.data);
						} catch (err) {
							const root = document.querySelector('#root');
							root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
							console.log(err);
						}
					}, false);
				</script>
			</body>
		</html>
	`;

const Preview = ({ code }: PreviewProps) => {
	const iframe = useRef<any>();

	useEffect(() => {
		iframe.current.srcdoc = html;
		iframe.current.contentWindow.postMessage(code, '*');
	}, [code]);

	return (
		<iframe
			ref={iframe}
			title='codePreview'
			sandbox='allow-scripts'
			srcDoc={html}
		/>
	);
};

export default Preview;
