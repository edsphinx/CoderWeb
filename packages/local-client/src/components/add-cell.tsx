import './add-cell.css';
import { useActions } from '../hooks/use-actions';
import ActionButton from './action-button';

interface AddCellProps {
	previousCellId: string | null;
	forceVisible?: boolean;
}

const AddCell = ({ forceVisible, previousCellId }: AddCellProps) => {
	const { insertCellAfter } = useActions();
	return (
		<div className={`add-cell ${forceVisible && 'force-visible'}`}>
			<div className='add-buttons'>
				<ActionButton
					classname='button is-rounded is-primary is-small'
					icon='fas fa-file-code'
					action={() => insertCellAfter(previousCellId, 'code')}
				>
					<span className='icon is-small'>
						<i className='fas fa-plus' />
					</span>
					<span>Code</span>
				</ActionButton>
				<ActionButton
					classname='button is-rounded is-primary is-small'
					icon='fas fa-file-lines'
					action={() => insertCellAfter(previousCellId, 'text')}
				>
					<span className='icon is-small'>
						<i className='fas fa-plus' />
					</span>
					<span>Text</span>
				</ActionButton>
			</div>
			<div className='divider'></div>
		</div>
	);
};

export default AddCell;
