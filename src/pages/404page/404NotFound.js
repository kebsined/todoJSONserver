import styles from './404NotFound.module.css';
import { Link } from 'react-router-dom';
export const NotFound = () => {
	return (
		<div className={styles.NotFound}>
			<span>404</span>
			<span>Page not found </span>
			<h4>
				You can go to{' '}
				<Link to="/" className={styles.Link}>
					main
				</Link>{' '}
				page
			</h4>
		</div>
	);
};
