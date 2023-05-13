import { ReactNode } from 'react';

interface ActionButtonProps {
	icon: string;
	action: () => void;
	classname?: string | null;
	children?: ReactNode;
}

const ActionButton = ({
	icon,
	action,
	classname,
	children,
}: ActionButtonProps) => {
	return (
		<button
			className={classname || 'button is-primary is-small'}
			onClick={action}
		>
			{children}
			<span className='icon'>
				<i className={icon}></i>
			</span>
		</button>
	);
};

export default ActionButton;
