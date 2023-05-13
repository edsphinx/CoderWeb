import './action-bar.css';
import { useActions } from '../hooks/use-actions';
import ActionButton from './action-button';

interface ActionBarProps {
	id: string;
}

const ActionBar = ({ id }: ActionBarProps) => {
	const { moveCell, deleteCell } = useActions();
	return (
		<div className='action-bar'>
			<ActionButton
				icon='fas fa-arrow-up'
				action={() => moveCell(id, 'up')}
			/>
			<ActionButton
				icon='fas fa-arrow-down'
				action={() => moveCell(id, 'down')}
			/>
			<ActionButton
				icon='fas fa-times'
				action={() => deleteCell(id)}
			/>
		</div>
	);
};

export default ActionBar;
