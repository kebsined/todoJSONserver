import styles from './TodoOptions.module.css';
import { Link, useParams, useNavigate } from 'react-router-dom';

import { useDeleteTodo } from '../../hooks/useDelete/useDeleteTodo';

export const Options = () => {
	const { id } = useParams();

	const navigate = useNavigate();

	const { isDeleting, requestDelete } = useDeleteTodo();

	const onDeleteTask = (currentTaskId) => {
		console.log('deleting..');
		requestDelete(currentTaskId);
		navigate('/');
	};

	return (
		<div className={styles.options}>
			<button
				className={styles.edit}
				id="edit"
				type="button"
				onClick={() => navigate('edit')}
			></button>

			<button
				className={styles.delete}
				id="delete"
				type="button"
				onClick={() => onDeleteTask(id)}
			></button>
		</div>
	);
};
