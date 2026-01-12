import { useState, useEffect } from 'react';
import { X, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import Button from '../Button';
import { cn } from '../../utils/cn';

const BookingModal = ({ isOpen, onClose, onSave, initialData, rooms = [] }) => {
    // Local state for form fields
    const [formData, setFormData] = useState({
        guestName: '',
        price: '',
        status: 'Confirmed',
        roomId: '',
        startDate: '', // Store as string YYYY-MM-DD for input
        endDate: '',   // Store as string YYYY-MM-DD for input
        ...initialData
    });

    // Update form when initialData changes (e.g. new selection)
    useEffect(() => {
        if (initialData) {
            setFormData(prev => ({ 
                ...prev, 
                ...initialData,
                // Ensure inputs get proper YYYY-MM-DD format if date objects passed
                startDate: initialData.startDate ? format(initialData.startDate, 'yyyy-MM-dd') : '',
                endDate: initialData.endDate ? format(initialData.endDate, 'yyyy-MM-dd') : '',
                roomId: initialData.roomId || (rooms.length > 0 ? rooms[0].id : '')
            }));
        } else if (isOpen) {
             // Default if opened without data (via button maybe)
             setFormData(prev => ({
                ...prev,
                startDate: format(new Date(), 'yyyy-MM-dd'),
                endDate: format(new Date(), 'yyyy-MM-dd'),
                roomId: rooms.length > 0 ? rooms[0].id : ''
             }));
        }
    }, [initialData, isOpen, rooms]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Convert strings back to Date objects for the parent
        onSave({
            ...formData,
            startDate: new Date(formData.startDate),
            endDate: new Date(formData.endDate),
            // Look up room name if needed, but parent might handle it
            roomName: rooms.find(r => r.id === formData.roomId)?.name || 'Room'
        });
        onClose();
        setFormData({ guestName: '', price: '', status: 'Confirmed', roomId: '', startDate: '', endDate: '' });
    };

    // Calculate nights
    const nights = initialData?.startDate && initialData?.endDate 
        ? Math.max(1, Math.round((initialData.endDate - initialData.startDate) / (1000 * 60 * 60 * 24)))
        : 0;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden scale-in-95 animate-in zoom-in-95 duration-200">
                
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">New Booking</h2>
                        <p className="text-xs text-gray-500 font-medium">Enter guest details</p>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
                    
                    {/* Details Section (Room & Dates) */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1 col-span-2">
                             <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Room</label>
                             <select 
                                required
                                value={formData.roomId}
                                onChange={e => setFormData({...formData, roomId: e.target.value})}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all appearance-none"
                            >
                                {rooms.map(room => (
                                    <option key={room.id} value={room.id}>{room.name}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Check-in</label>
                            <input 
                                type="date"
                                required
                                value={formData.startDate}
                                onChange={e => setFormData({...formData, startDate: e.target.value})}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Check-out</label>
                            <input 
                                type="date"
                                required
                                value={formData.endDate}
                                onChange={e => setFormData({...formData, endDate: e.target.value})}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                            />
                        </div>
                    </div>

                    {/* Inputs */}
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Guest Name</label>
                            <input 
                                type="text"
                                required
                                autoFocus
                                value={formData.guestName}
                                onChange={e => setFormData({...formData, guestName: e.target.value})}
                                placeholder="e.g. John Doe"
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Price (Rs)</label>
                                <input 
                                    type="text"
                                    required
                                    value={formData.price}
                                    onChange={e => setFormData({...formData, price: e.target.value})}
                                    placeholder="4500"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                                />
                            </div>
                            
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Status</label>
                                <select 
                                    value={formData.status}
                                    onChange={e => setFormData({...formData, status: e.target.value})}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all appearance-none"
                                >
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Pending">Pending</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Footer / Actions */}
                    <div className="pt-2">
                        <Button type="submit" className="w-full bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl py-3.5 shadow-lg shadow-emerald-800/20">
                            Confirm Booking
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;
