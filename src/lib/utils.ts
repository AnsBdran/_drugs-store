import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import { toast } from 'svelte-sonner';
import type { TransitionConfig } from 'svelte/transition';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { CartItem } from './stores/cart';
import type { DrugItem } from '@prisma/client';
// import dayjs from 'dayjs';

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

export const makeStringsSelectItems = (items) =>
	items.map((item) => ({
		value: item,
		label: item
	}));

export const makeDrugsSelectItems = (items) =>
	items.map((i) => ({ label: i.brandName, value: i.id }));

export const makeSelectItems = (items) => items.map((i) => ({ label: i.name, value: i.id }));

export const parseSelectItems = (
	arr: { label: string; value: string; disabled?: boolean | undefined }[]
) => arr.map((item) => item.value);

export const makeSelectItemsFromStrings = (items: string[]) =>
	items.map((i) => ({ value: i, label: i }));

export const makeStrengthsSelectItems = (
	values:
		| {
				amount: string;
				per: string;
		  }[]
		| undefined
) => {
	if (!values) return;
	return values.map((v) => {
		if (v.per === 'unit') {
			return {
				value: v,
				label: `${v.amount}`
			};
		}

		return {
			value: v,
			label: `${v.amount} per ${v.per}`
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

export const showToast = (form) => {
	if (form.message) {
		if (form.message.type === 'success') {
			toast.success('Success ✨', { description: form.message.text });
		} else {
			toast.error('Error 🕵️', { description: form.message.text });
		}
	}
};

export const showErrorToast = (res: { type: string; error: { message: string } }) => {
	toast.error('Error', {
		description: res.error.message
	});
};

export const fromNow = (date: Date) => {
	dayjs.extend(relativeTime);
	return dayjs(date).fromNow();
};

// export const formatCartItem = (i: CartItem) =>
// `${i.count} ${i.data.drug.brandName} | ${i.data.form}\n${i.data.activeIngredients.map((ai) => `. ${ai.name} ${ai.strength.amount} ${ai.strength.per === 'unit' ? '' : ai.strength.per}`)}`;
export const formatCartItem = (i: CartItem) =>
	`${i.count} x ${i.data.drug.brandName} (${i.data.form})
${i.data.activeIngredients.map((ai) => `- ${ai.name} ${ai.strength.amount} ${ai.strength.per === 'unit' ? '' : ai.strength.per}`).join('\n')}`;

export const getPagination = (_page: string) => {
	const page = Number(_page);
	const limit = 5;
	return {
		page,
		limit,
		skip: (page - 1) * limit
	};
};

export const makeSelectItemsFromDrugItems = (drugItems: DrugItem[]) =>
	drugItems.map((d) => ({
		value: d.id,
		label: d.drug.brandName + ' ||  ' + d.form
	}));
