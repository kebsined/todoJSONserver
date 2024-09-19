import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Options } from '../../components/todoOptions/todoOptions';
import { Loader } from '../../components/Loader/Loader';
import styles from './TaskPage.module.css';

export const TaskPage = () => {
	const { id } = useParams();

	const [todo, setTodo] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		setIsLoading(true);
		setTimeout(() => {
			fetch(`http://localhost:3005/todos/${id}`)
				.then((response) => response.json())
				.then((data) => setTodo(data))
				.catch((id) => {
					if (id !== todo.id) {
						navigate('/404');
					}
				})
				.finally(() => setIsLoading(false));
		}, 1000);
	}, [id, todo.id, navigate]);

	return (
		<div className={styles.Container}>
			<h1 className={styles.Title}>Update your task</h1>
			{isLoading ? <Loader /> : <div className={styles.Task}>{todo.name}</div>}
			<Options />
			<button className={styles.GoBackButton} onClick={() => navigate('/')}>
				Go back
			</button>
		</div>
	);
};
