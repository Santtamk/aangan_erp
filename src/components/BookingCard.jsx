import { Phone, MessageSquare, Clock, DoorClosed } from 'lucide-react';
import Button from './Button';
import { cn } from '../utils/cn';

const BookingCard = ({ booking }) => {
    const {
        id, name, avatar, status, room, dates, nights, price, checkInTime, checkOutTime
    } = booking;

    // Helper to determine status color
    const getStatusColor = (status) => {
        switch (status.toUpperCase()) {
            case 'CONFIRMED': return 'bg-green-100 text-green-700';
            case 'active': return 'bg-blue-100 text-blue-700';
            case 'CANCELLED': return 'bg-red-100 text-red-700';
            case 'PENDING': return 'bg-orange-100 text-orange-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const isConfirmed = status.toUpperCase() === 'CONFIRMED';
    const isActive = status.toUpperCase() === 'ACTIVE';

    return (
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            {/* Header: Guest Info & Status */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3">
                    <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg">{name}</h3>
                        <p className="text-gray-400 text-xs font-medium">Booking ID: #{id}</p>
                    </div>
                </div>
                <span className={cn("text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide", getStatusColor(status))}>
                    {status}
                </span>
            </div>

            {/* Details Grid */}
            <div className="bg-gray-50 rounded-2xl p-4 grid grid-cols-2 gap-4 mb-5">
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800">
                        <DoorClosed className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Room</p>
                        <p className="text-sm font-bold text-gray-800">{room}</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800">
                        <Clock className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Stay</p>
                        <p className="text-sm font-bold text-gray-800">{dates}</p>
                    </div>
                </div>
            </div>

            {/* Footer: Price & Actions */}
            <div className="flex items-end justify-between">
                <div>
                    <p className="text-xl font-bold text-emerald-900">{price}</p>
                </div>

                <div className="flex gap-2">
                    {/* Comm Actions */}
                    <button className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-200">
                        <MessageSquare className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-200">
                        <Phone className="w-5 h-5" />
                    </button>

                    {/* Main Action */}
                    {isConfirmed && (
                        <Button className="py-2.5 px-6 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-sm font-bold">
                            Check In
                        </Button>
                    )}
                    {isActive && (
                        <Button className="py-2.5 px-6 rounded-xl bg-orange-500 hover:bg-orange-600 text-sm font-bold shadow-orange-500/20">
                            Check Out
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingCard;
