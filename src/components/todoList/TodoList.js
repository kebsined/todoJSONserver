import styles from './TodoList.module.css';

export const TodoList = ({ children }) => {
	return (
		<div className={styles.TodoList}>
			<h1 className={styles.title}>Track your tasks</h1>
			{children}
		</div>
	);
};
