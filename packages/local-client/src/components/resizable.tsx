import './resizable.css';
import { useEffect, useRef, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

interface ResizableProps {
	direction: 'horizontal' | 'vertical';
	children?: React.ReactNode;
}

const Resizable = ({ direction, children }: ResizableProps) => {
	let resizableProps: ResizableBoxProps;
	const [innerHeight, setInnerHeight] = useState(window.innerHeight);
	const [innerWidth, setInnerWidth] = useState(window.innerWidth);
	const [width, setWidth] = useState(window.innerWidth * 0.75);
	const defaultOnErrorFn = useRef(window.onerror);

	useEffect(() => {
		let timer: any;
		let onErr: any;
		let animationFrame: number | null = null;
		const listener = () => {
			if (timer) {
				clearTimeout(timer);
			}
			new ResizeObserver(() => {
				animationFrame = window.requestAnimationFrame(() => {
					setTimeout(() => {
						setInnerHeight(window.innerHeight);
						setInnerWidth(window.innerWidth);
						if (window.innerWidth * 0.75 < width) {
							setWidth(window.innerWidth * 0.75);
						}
					}, 500);
				});
			});
		};

		window.addEventListener('resize', listener);

		window.onerror = (...args) => {
			if (args[0] === 'ResizeObserver loop limit exceeded') {
				return true;
			} else {
				onErr = defaultOnErrorFn.current && defaultOnErrorFn.current(...args);
			}
		};

		return () => {
			if (animationFrame) {
				window.cancelAnimationFrame(animationFrame);
			}
			window.removeEventListener('resize', listener);
			window.onerror = onErr;
		};
	}, [width]);

	if (direction === 'horizontal') {
		resizableProps = {
			className: 'resize-horizontal',
			minConstraints: [innerWidth * 0.2, Infinity],
			maxConstraints: [innerWidth * 0.75, Infinity],
			height: Infinity,
			width,
			resizeHandles: ['e'],
			onResizeStop: (e, data) => {
				setWidth(data.size.width);
			},
		};
	} else {
		resizableProps = {
			minConstraints: [Infinity, 24],
			maxConstraints: [Infinity, innerHeight * 0.95],
			height: 300,
			width: Infinity,
			resizeHandles: ['s'],
		};
	}

	return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
