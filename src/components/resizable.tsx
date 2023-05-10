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

	// new ResizeObserver(_.debounce(entries => {}, 200);

	useEffect(() => {
		let timer: any;
		let onErr: any;
		const listener = () => {
			if (timer) {
				clearTimeout(timer);
			}
			setTimeout(() => {
				setInnerHeight(window.innerHeight);
				setInnerWidth(window.innerWidth);
				if (window.innerWidth * 0.75 < width) {
					setWidth(window.innerWidth * 0.75);
				}
			}, 200);
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
			window.removeEventListener('resize', listener);
			window.onerror = onErr;
		};
	}, [width]);

	// const calcWidth = () => {
	//   let actualWidth = Math.min(width,window.innerWidth * 0.75);
	//   actualWidth = Math.max(actualWidth,window.innerWidth * 0.2);
	//   if(actualWidth !== width) setWidth(actualWidth);
	//   return actualWidth;
	// }

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
