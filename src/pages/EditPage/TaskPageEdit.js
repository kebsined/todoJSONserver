import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './TaskPageEdit.module.css';

export const TaskPageEdit = () => {
	const { id } = useParams();
	const [todoEdit, setTodoEdit] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	const handleChange = (event) => {
		setTodoEdit({ ...todoEdit, name: event.target.value });
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await fetch(`http://localhost:3005/todos/${id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(todoEdit),
			});
			navigate(`/todos/${id}`);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		isLoading &&
			fetch(`http://localhost:3005/todos/${id}`)
				.then((response) => response.json())
				.then((data) => {
					console.log(data, 'data');
					setTodoEdit(data);
				})
				.finally(() => {
					setIsLoading(false);
				});
	}, [id, isLoading]);
	return (
		<div>
			<form onSubmit={handleSubmit} className={styles.Form}>
				<input
					className={styles.Input}
					type="text"
					name="name"
					value={todoEdit.name || ''}
					onChange={handleChange}
				/>
				<div className={styles.Buttons}>
					<button className={styles.Button}>Save</button>
					<button className={styles.Button}>Go to task page</button>
				</div>
			</form>
		</div>
	);
};
