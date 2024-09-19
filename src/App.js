import styles from './App.module.css';

import { useState, useEffect } from 'react';
import { AddForm } from './components/AddForm/AddForm';

import { useAddTodo } from './hooks/useAddTodo/useAddTodo';
import { SearchSort } from './components/SearchSort/SearchSort';
import { Link } from 'react-router-dom';
import { Loader } from './components/Loader/Loader';

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [updateTodos, setUpdateTodos] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [taskName, setTaskName] = useState('');

	const [isSorted, setIsSorted] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');

	const updateTaskFlag = () => setUpdateTodos(!updateTodos);

	const sortParams = { byName: '?_sort=name', default: '' };

	const searchTodo = todos.filter((todo) =>
		todo.name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	useEffect(() => {
		setIsLoading(true);
		setTimeout(() => {
			fetch('http://localhost:3005/todos')
				.then((loadedData) => loadedData.json())
				.then((loadedTodos) => {
					setTodos(loadedTodos);
				})
				.finally(() => setIsLoading(false));
		}, 2000);
	}, [updateTodos]);

	const onTodoNameChange = (event) => {
		setTaskName(event.target.value);
	};

	const { isAdding, requestAdd } = useAddTodo();

	const onAddTodo = (event) => {
		event.preventDefault();
		requestAdd(taskName);
		setTaskName('');
		updateTaskFlag();
	};

	const toSortTodos = () => {
		setIsSorted(!isSorted);
		setIsLoading(true);
		setTimeout(() => {
			fetch(
				'http://localhost:3005/todos' +
					`${!isSorted ? sortParams.byName : sortParams.default}`,
			)
				.then((loadedData) => loadedData.json())
				.then((loadedTodos) => {
					setTodos(loadedTodos);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}, 1500);
	};

	return (
		<div className={styles.App}>
			<h1 className={styles.Title}>Track your tasks</h1>
			<AddForm
				onAddTodo={onAddTodo}
				onTodoNameChange={onTodoNameChange}
				taskName={taskName}
				isAdding={isAdding}
			/>
			<SearchSort
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				isLoading={isLoading}
				isSorted={isSorted}
				toSortTodos={toSortTodos}
				searchTodo={searchTodo}
			/>

			{isLoading ? (
				<Loader className={styles.Loader} />
			) : (
				<ul className={styles.TodoList}>
					{searchTodo.map((todo) => (
						<Link
							to={`/todos/${todo.id}`}
							key={todo.id}
							className={styles.Link}
						>
							<li className={styles.Todo}>{todo.name}</li>
						</Link>
					))}
				</ul>
			)}
		</div>
	);
};
