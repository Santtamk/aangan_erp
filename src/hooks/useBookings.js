import { useState, useEffect } from 'react';

const STORAGE_KEY = 'aangan_bookings_v1';

// Initial Mock Data (used if storage is empty)
const DEFAULT_BOOKINGS = [
    {
        id: 'ANG-8821',
        name: 'Anil Gurung',
        guestName: 'Anil Gurung',
        avatar: 'https://i.pravatar.cc/150?u=anil',
        status: 'Confirmed',
        room: 'Deluxe 102',
        roomId: '102',
        dates: 'Jan 05 - 08',
        startDate: new Date(2026, 0, 5).toISOString(),
        endDate: new Date(2026, 0, 8).toISOString(),
        price: 'Rs. 12,400',
    },
    {
        id: 'ANG-8825',
        name: 'Maya Thapa',
        guestName: 'Maya Thapa',
        avatar: 'https://i.pravatar.cc/150?u=maya',
        status: 'Confirmed',
        room: 'Standard 201',
        roomId: '201',
        dates: 'Jan 04 - 06',
        startDate: new Date(2026, 0, 4).toISOString(),
        endDate: new Date(2026, 0, 6).toISOString(),
        price: 'Rs. 4,500',
    }
];

export const useBookings = () => {
    const [bookings, setBookings] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : DEFAULT_BOOKINGS;
        } catch (error) {
            console.error('Failed to load bookings from storage', error);
            return DEFAULT_BOOKINGS;
        }
    });

    // Save to storage whenever bookings change
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
        } catch (error) {
            console.error('Failed to save bookings to storage', error);
        }
    }, [bookings]);

    const addBooking = (newBooking) => {
        setBookings(prev => [...prev, {
            ...newBooking,
            id: `ANG-${Math.floor(Math.random() * 10000)}`,
            // Ensure dates are stored as ISO strings
            startDate: new Date(newBooking.startDate).toISOString(),
            endDate: new Date(newBooking.endDate).toISOString(),
        }]);
    };

    const updateBooking = (id, updates) => {
        setBookings(prev => prev.map(booking => 
            booking.id === id ? { ...booking, ...updates } : booking
        ));
    };

    const deleteBooking = (id) => {
        setBookings(prev => prev.filter(booking => booking.id !== id));
    };

    return { bookings, addBooking, updateBooking, deleteBooking };
};
