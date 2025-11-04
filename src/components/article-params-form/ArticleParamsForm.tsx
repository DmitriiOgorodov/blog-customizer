import { useState, useRef, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	type ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { Text } from 'src/ui/text';

type ArticleParamsFormProps = {
	initialState: ArticleStateType;
	appliedState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	initialState,
	appliedState,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [draft, setDraft] = useState<ArticleStateType>(appliedState);

	useEffect(() => {
		if (isOpen) {
			setDraft(appliedState);
		}
	}, [isOpen, appliedState]);

	const sidebarRef = useRef<HTMLElement | null>(null);

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

	const handleArrowClick = () => {
		setIsOpen((prevValue) => !prevValue);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply(draft);
	};

	const handleReset = () => {
		setDraft(initialState);
		onReset();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleArrowClick} />
			<aside
				ref={sidebarRef as React.MutableRefObject<HTMLElement | null>}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h1' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						placeholder='Выберите шрифт'
						options={fontFamilyOptions}
						selected={draft.fontFamilyOption}
						onChange={(option) => {
							setDraft((prevState) => ({
								...prevState,
								fontFamilyOption: option,
							}));
						}}
					/>

					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={draft.fontSizeOption}
						onChange={(option) => {
							setDraft((prevState) => ({
								...prevState,
								fontSizeOption: option,
							}));
						}}
					/>

					<Select
						title='Цвет шрифта'
						placeholder='Выберите цвет'
						options={fontColors}
						selected={draft.fontColor}
						onChange={(option) => {
							setDraft((prevState) => ({
								...prevState,
								fontColor: option,
							}));
						}}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						placeholder='Выберите цвет'
						options={backgroundColors}
						selected={draft.backgroundColor}
						onChange={(option) => {
							setDraft((prevState) => ({
								...prevState,
								backgroundColor: option,
							}));
						}}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={draft.contentWidth}
						onChange={(option) => {
							setDraft((prevState) => ({
								...prevState,
								contentWidth: option,
							}));
						}}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
