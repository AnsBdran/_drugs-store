import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};
export const makeSelectItems = (items) =>
	items.map((item) => ({
		value: item.id,
		label: item.name
	}));

// export const setNestedValue = (obj: Record<string, unknown>, keys: string[], value: any) => {
// 	let current = obj;
// 	if (keys.length === 1) {
// 		return (current[keys[0]] = value);
// 	}

// 	for (let i = 0; i < keys.length - 1; i++) {
// 		if (typeof current[keys[i]] !== 'object' || current[keys[i]] === null) {
// 			current[keys[i]] = {}; // Ensure it's an object
// 		}
// 		current = current[keys[i]];
// 	}
// 	current[keys[keys.length - 1]] = value;
// };

// export const getNestedValue = (obj, keys) => {
// 	let current = obj;
// 	for (let i = 0; i < keys.length; i++) {
// 		if (current[keys[i]] === undefined) {
// 			return undefined; // Key not found
// 		}
// 		current = current[keys[i]];
// 	}
// 	return current;
// };

export const makeSelectItemsFromStrings = (items: string[]) =>
	items.map((i) => ({ value: i, label: i }));

export const makeStrengthsSelectItems = (
	values: {
		id: string;
		amount: number;
		unit: string;
		per: number;
		perUnit: string;
		[key: string]: unknown;
	}[]
) => {
	return values.map((v) => {
		if (v.per === 1 && v.perUnit === 'unit') {
			return {
				value: v.id,
				label: `${v.amount}${v.unit}`
			};
		}

		return {
			value: v.id,
			label: `${v.amount}${v.unit} per ${v.per}${v.perUnit}`
		};
	});
};

export const getValuesFromSelctObjects = (
	values: {
		value: string;
		label: string;
		disabled?: boolean | undefined;
	}[]
) => values.map((v) => v.value);
