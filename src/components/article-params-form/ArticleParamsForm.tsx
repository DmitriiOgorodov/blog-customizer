import { useState, useRef, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const sidebarRef = useRef<HTMLElement | null>(null);

	const handleArrowClick = () => {
		setIsOpen((prevValue) => !prevValue);
	};

	// Шаг 3: Закрытие при клике вне сайдбара
	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;
			if (sidebarRef.current && !sidebarRef.current.contains(target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleArrowClick} />
			<aside
				ref={sidebarRef as React.MutableRefObject<HTMLElement | null>}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
