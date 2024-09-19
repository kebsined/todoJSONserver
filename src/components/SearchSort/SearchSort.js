import styles from './SearchSort.module.css';
import { Input } from '../Input/Input';

export const SearchSort = ({
	searchQuery,
	setSearchQuery,
	isSorted,
	isLoading,
	toSortTodos,
}) => {
	return (
		<div className={styles.SearchSort}>
			<Input
				id="search"
				className={styles.searchInput}
				placeholder={'Search...'}
				value={searchQuery}
				onChange={(event) => setSearchQuery(event.target.value)}
				type="text"
			/>
			<button
				className={styles.sort}
				type="submit"
				onClick={toSortTodos}
				disabled={isLoading}
				id="sort"
			>
				{isSorted === false ? 'Sort todos' : 'Show default'}
			</button>
		</div>
	);
};
