import type { Prisma } from '@prisma/client';
import type { PRICES_RANGES, PricesRanges } from './constants';

export type User = Prisma.UserGetPayload<{
	include: {
		_count: true;
		likedDrugItems: true;
		likedRequests: true;
		requests: true;
		sessions: true;
	};
}>;

export type DrugItem = Prisma.DrugItemGetPayload<{
	include: {
		_count: true;
		dosageInstructions: true;
		drug: true;
		images: true;
		likedBy: true;
	};
}>;

export type Drug = Prisma.DrugGetPayload<{
	include: {
		_count: true;
		drugItems: true;
		manufacturer: true;
	};
}>;

export type PriceRangeOptions = keyof PricesRanges;
