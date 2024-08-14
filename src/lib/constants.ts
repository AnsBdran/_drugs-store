export const ITEMS_PER_PAGE = 8;
export const URL_PAGE_NUMBER_REGEX = /\/\d+(\?.*)?$/;

export const PRICES_RANGES = {
	low: {
		min: 1,
		max: 10
	},
	mid: {
		min: 11,
		max: 30
	},
	high: {
		min: 30,
		max: 9999
	}
};
export type PricesRanges = typeof PRICES_RANGES;
