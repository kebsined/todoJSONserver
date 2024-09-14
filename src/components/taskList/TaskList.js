import styles from './TaskList.module.css';
import { Loader } from '../Loader/Loader';
import { Task } from '../task/Task';

export const TaskList = ({
	searchTodo,
	isLoading,
	callEditWindow,
	onDeleteTask,
}) => {
	return (
		<div className={styles.TaskList}>
			{isLoading ? (
				<Loader />
			) : (
				searchTodo.map(({ name, id }) => (
					<Task
						key={id}
						name={name}
						callEditWindow={() => callEditWindow(id)}
						onDeleteTask={() => onDeleteTask(id)}
					/>
				))
			)}
		</div>
	);
};
