import { useState, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

export const ArticleParamsForm = () => {
	// Шаг 2: Состояние открытия/закрытия сайдбара
	const [isOpen, setIsOpen] = useState(false);

	// Шаг 2: Реф для отслеживания кликов вне сайдбара
	const sidebarRef = useRef<HTMLElement | null>(null);

	// Шаг 2: Обработчик клика по стрелке
	const handleArrowClick = () => {
		setIsOpen((prevValue) => !prevValue);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleArrowClick} />
			<aside
				ref={sidebarRef as React.MutableRefObject<HTMLElement | null>}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form}>
					{/* Пока форма пустая - добавим поля на следующем шаге */}
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
