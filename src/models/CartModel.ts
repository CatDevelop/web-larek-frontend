import { BaseCartItem, CartItem } from '../types';

export class CartModel {
    private items: Map<string, CartItem> = new Map();

    addItem(item: BaseCartItem): void {
        const existingItem = this.items.get(item.id);

        if (existingItem) {
            this.items.set(item.id, { ...existingItem, count: existingItem.count + 1 });
        } else {
            this.items.set(item.id, { ...item, count: 1 });
        }
    }

    removeItem(id: string): void {
        this.items.delete(id);
    }

    getItems(): CartItem[] {
        return Array.from(this.items.values());
    }

    clearCart(): void {
        this.items.clear();
    }

    getTotalPrice(): number {
        return [...this.items.values()].reduce(
            (total, item) => total + (item.price || 0) * item.count, 0
        );
    }
}
