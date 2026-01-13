import { useState, useEffect } from 'react';

const STORAGE_KEY = 'aangan_staff_data';

const DEFAULT_STAFF = [
    { id: 's1', name: 'Binod Chaudhary', role: 'Chief Staff', joined: '12 Jan 2024', avatar: 'https://i.pravatar.cc/150?u=binod' },
    { id: 's2', name: 'Maya Devi', role: 'Housekeeping', joined: '05 Feb 2024', avatar: 'https://i.pravatar.cc/150?u=devi' },
    { id: 's3', name: 'Ramesh Gupta', role: 'Kitchen', joined: '20 Mar 2024', avatar: 'https://i.pravatar.cc/150?u=ramesh' },
];

const DEFAULT_PERMISSIONS = {
    'Chief Staff': { bookings: true, finance: true, tasks: true },
    'All Staff': { bookings: false, finance: false, tasks: true }
};

export const useStaff = () => {
    const [staff, setStaff] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY + '_list');
        return saved ? JSON.parse(saved) : DEFAULT_STAFF;
    });

    const [permissions, setPermissions] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY + '_perms');
        return saved ? JSON.parse(saved) : DEFAULT_PERMISSIONS;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY + '_list', JSON.stringify(staff));
        localStorage.setItem(STORAGE_KEY + '_perms', JSON.stringify(permissions));
    }, [staff, permissions]);

    const addStaff = (name, role = 'Staff') => {
        const newPerson = {
            id: Date.now().toString(),
            name,
            role,
            joined: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            avatar: `https://i.pravatar.cc/150?u=${Date.now()}`
        };
        setStaff(prev => [...prev, newPerson]);
    };

    const removeStaff = (id) => {
        setStaff(prev => prev.filter(p => p.id !== id));
    };

    const updatePermission = (role, key) => {
        setPermissions(prev => ({
            ...prev,
            [role]: {
                ...prev[role],
                [key]: !prev[role][key]
            }
        }));
    };

    return {
        staff,
        permissions,
        addStaff,
        removeStaff,
        updatePermission
    };
};
