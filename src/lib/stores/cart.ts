import { browser } from '$app/environment';
import type { DrugItem } from '@prisma/client';
import { writable } from 'svelte/store';

export type CartItem = { data: DrugItem; count: number };

const defaultValue: CartItem[] = [];
const storedValue = browser ? window.localStorage.getItem('cart') : null;
const initialValue: CartItem[] = storedValue ? JSON.parse(storedValue) : defaultValue;

export const cart = writable<CartItem[]>(initialValue);
