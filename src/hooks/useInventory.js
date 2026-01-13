import { useState, useEffect } from 'react';

const STORAGE_KEY = 'aangan_inventory';

const DEFAULT_ITEMS = [
    // Supplies
    { id: 'sup-1', name: 'Soap Bars', category: 'Supplies', stock: 12, minStock: 50, unit: 'bars', icon: '🧼' },
    { id: 'sup-2', name: 'Toilet Rolls', category: 'Supplies', stock: 5, minStock: 20, unit: 'rolls', icon: '🧻' },
    { id: 'sup-3', name: 'Shampoo Bottles', category: 'Supplies', stock: 45, minStock: 30, unit: 'bottles', icon: '🧴' },
    { id: 'sup-4', name: 'Water Bottles', category: 'Supplies', stock: 120, minStock: 100, unit: 'bottles', icon: '💧' },
    { id: 'sup-5', name: 'Coffee Packets', category: 'Supplies', stock: 80, minStock: 50, unit: 'packets', icon: '☕' },
    { id: 'sup-6', name: 'Tea Bags', category: 'Supplies', stock: 200, minStock: 100, unit: 'bags', icon: '🍵' },
    { id: 'sup-7', name: 'Laundry Detergent', category: 'Supplies', stock: 8, minStock: 10, unit: 'kg', icon: '🧺' },
    
    // Amenities (Tracked as 'Available Reusables' or similar)
    { id: 'amn-1', name: 'Hair Dryer', category: 'Amenities', stock: 10, minStock: 12, unit: 'units', icon: '💨' },
    { id: 'amn-2', name: 'Iron Box', category: 'Amenities', stock: 8, minStock: 10, unit: 'units', icon: '👕' },
    { id: 'amn-3', name: 'Yoga Mats', category: 'Amenities', stock: 15, minStock: 10, unit: 'mats', icon: '🧘' },
    { id: 'amn-4', name: 'Extra Pillows', category: 'Amenities', stock: 25, minStock: 20, unit: 'pillows', icon: '🛌' },
    { id: 'amn-5', name: 'Heaters', category: 'Amenities', stock: 6, minStock: 12, unit: 'units', icon: '🔥' },
];

export const useInventory = () => {
    const [inventory, setInventory] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : DEFAULT_ITEMS;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(inventory));
    }, [inventory]);

    const updateStock = (id, delta) => {
        setInventory(prev => prev.map(item => 
            item.id === id 
                ? { ...item, stock: Math.max(0, item.stock + delta) } 
                : item
        ));
    };

    const getLowStockItems = () => {
        return inventory.filter(item => item.stock <= item.minStock);
    };

    const getItemsByCategory = (category) => {
        return inventory.filter(item => item.category === category);
    };

    return {
        inventory,
        updateStock,
        getLowStockItems,
        getItemsByCategory
    };
};
