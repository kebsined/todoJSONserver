import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskPage } from './pages/taskPAge/taskPage';
import { TaskPageEdit } from './pages/EditPage/TaskPageEdit';
import { NotFound } from './pages/404page/404NotFound';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />} />
			<Route path="/todos/:id" element={<TaskPage />} />
			<Route path="/todos/:id/edit" element={<TaskPageEdit />} />
			<Route path="*" element={<NotFound />} />
			<Route path="404" element={<NotFound />} />
		</Routes>
	</BrowserRouter>,
);
