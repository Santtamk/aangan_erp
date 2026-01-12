import { useState } from 'react';
import { format, isSameDay, getDaysInMonth, startOfMonth, addDays, isWithinInterval, compareAsc, max, min } from 'date-fns';
import { cn } from '../../utils/cn';

const CalendarGrid = ({ currentMonth, rooms, bookings, onRangeSelected }) => {
    const startDate = startOfMonth(currentMonth);
    const daysInMonth = getDaysInMonth(currentMonth);
    const days = Array.from({ length: daysInMonth }, (_, i) => addDays(startDate, i));

    // Drag Interaction State
    const [isDragging, setIsDragging] = useState(false);
    const [selectionStart, setSelectionStart] = useState(null); // { roomId, date }
    const [selectionEnd, setSelectionEnd] = useState(null);     // { roomId, date }

    // Helper to check if a booking occupies a slot
    const getBookingForSlot = (roomId, date) => {
        return bookings.find(booking => {
            const bookingStart = new Date(booking.startDate);
            const bookingEnd = new Date(booking.endDate);
            return booking.roomId === roomId && 
                   date >= bookingStart && 
                   date <= bookingEnd;
        });
    };

    const isBookingStart = (booking, date) => isSameDay(new Date(booking.startDate), date);

    // Mouse Event Handlers
    const handleMouseDown = (roomId, date) => {
        // Prevent starting selection on existing booking
        if (getBookingForSlot(roomId, date)) return;

        setIsDragging(true);
        setSelectionStart({ roomId, date });
        setSelectionEnd({ roomId, date });
    };

    const handleMouseEnter = (roomId, date) => {
        if (!isDragging) return;
        
        // Only allow dragging within the same room
        if (roomId === selectionStart.roomId) {
            setSelectionEnd({ roomId, date });
        }
    };

    const handleMouseUp = () => {
        if (isDragging && selectionStart && selectionEnd) {
            // Determine actual start and end order
            const start = min([selectionStart.date, selectionEnd.date]);
            const end = max([selectionStart.date, selectionEnd.date]);

            onRangeSelected({
                roomId: selectionStart.roomId,
                startDate: start,
                endDate: end
            });
        }
        // Reset state
        setIsDragging(false);
        setSelectionStart(null);
        setSelectionEnd(null);
    };

    // Helper to check if a cell is part of the current drag selection
    const isSelected = (roomId, date) => {
        if (!isDragging || !selectionStart || !selectionEnd) return false;
        if (roomId !== selectionStart.roomId) return false;

        const start = min([selectionStart.date, selectionEnd.date]);
        const end = max([selectionStart.date, selectionEnd.date]);

        return isWithinInterval(date, { start, end });
    };

    return (
        <div 
            className="overflow-x-auto pb-4 bg-white rounded-b-3xl shadow-sm border border-t-0 border-gray-100 select-none"
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp} // Cancel on leave
        >
            <div className="min-w-[800px]">
                {/* Header Row */}
                <div className="flex border-b border-gray-100">
                    <div className="w-32 flex-shrink-0 p-4 border-r border-gray-100 bg-gray-50/50 sticky left-0 z-10 backdrop-blur-sm">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Rooms</span>
                    </div>
                    {days.map(date => (
                        <div key={date.toISOString()} className="w-12 flex-shrink-0 flex flex-col items-center justify-center py-2 border-r border-gray-50 pointer-events-none">
                            <span className="text-[10px] font-medium text-gray-400">{format(date, 'EEE')}</span>
                            <span className={cn("text-sm font-bold", isSameDay(date, new Date()) ? "bg-orange-500 text-white w-7 h-7 flex items-center justify-center rounded-full" : "text-gray-700")}>
                                {format(date, 'd')}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Room Rows */}
                {rooms.map(room => (
                    <div key={room.id} className="flex border-b border-gray-100 hover:bg-gray-50/30 transition-colors group">
                        <div className="w-32 flex-shrink-0 p-3 border-r border-gray-100 bg-white sticky left-0 z-10 group-hover:bg-gray-50/30 transition-colors pointer-events-none">
                            <h4 className="font-bold text-gray-800 text-sm">{room.name}</h4>
                            <p className="text-[10px] text-gray-400 font-medium">{room.type}</p>
                        </div>

                        {days.map(date => {
                            const booking = getBookingForSlot(room.id, date);
                            const isSlotSelected = isSelected(room.id, date);

                            return (
                                <div 
                                    key={date.toISOString()} 
                                    className="w-12 h-14 flex-shrink-0 border-r border-gray-50 relative p-1"
                                    onMouseDown={() => handleMouseDown(room.id, date)}
                                    onMouseEnter={() => handleMouseEnter(room.id, date)}
                                >
                                    {booking ? (
                                        <div className={cn(
                                            "absolute inset-y-2 left-0 right-0 flex items-center px-2 cursor-pointer transition-all hover:brightness-95",
                                            booking.status === 'Confirmed' ? 'bg-emerald-100 border border-emerald-200' : 'bg-orange-100 border border-orange-200',
                                            isBookingStart(booking, date) ? "rounded-l-lg ml-1" : "",
                                            isSameDay(new Date(booking.endDate), date) ? "rounded-r-lg mr-1" : ""
                                        )}>
                                            {isBookingStart(booking, date) && (
                                                <span className={cn("text-[10px] font-bold truncate z-10", booking.status === 'Confirmed' ? 'text-emerald-800' : 'text-orange-800')}>
                                                    {booking.guestName}
                                                </span>
                                            )}
                                        </div>
                                    ) : (
                                        <div className={cn(
                                            "w-full h-full rounded-sm transition-colors cursor-crosshair",
                                            isSlotSelected ? "bg-emerald-500/20" : "hover:bg-gray-50"
                                        )} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CalendarGrid;
