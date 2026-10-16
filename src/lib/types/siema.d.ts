declare module 'siema' {
	export interface SiemaOptions {
		selector?: string | HTMLElement;
		duration?: number;
		easing?: string;
		perPage?: number | Record<number, number>;
		startIndex?: number;
		draggable?: boolean;
		multipleDrag?: boolean;
		threshold?: number;
		loop?: boolean;
		rtl?: boolean;
		onInit?: (this: Siema) => void;
		onChange?: (this: Siema) => void;
	}

	class Siema {
		currentSlide: number;
		perPage: number;
		innerElements: HTMLElement[];
		constructor(options?: SiemaOptions);
		prev(howManySlides?: number, callback?: () => void): void;
		next(howManySlides?: number, callback?: () => void): void;
		goTo(index: number, callback?: () => void): void;
		remove(index: number, callback?: () => void): void;
		insert(item: HTMLElement, index: number, callback?: () => void): void;
		prepend(item: HTMLElement, callback?: () => void): void;
		append(item: HTMLElement, callback?: () => void): void;
		destroy(restoreMarkup?: boolean, callback?: () => void): void;
	}

	export default Siema;
}
