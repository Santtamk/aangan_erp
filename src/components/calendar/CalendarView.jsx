import { useState } from 'react';
import { addMonths, subMonths } from 'date-fns';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';

// Temporary Mock Data for Rooms (Should come from API/Context)
const MOCK_ROOMS = [
    { id: '101', name: 'Deluxe 101', type: 'Deluxe' },
    { id: '102', name: 'Deluxe 102', type: 'Deluxe' },
    { id: '201', name: 'Standard 201', type: 'Standard' },
    { id: '202', name: 'Standard 202', type: 'Standard' },
    { id: '301', name: 'Suite 301', type: 'Suite' },
];

const CalendarView = ({ bookings, onClose, onNewBooking, onRangeSelected }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date(2026, 0, 1)); // Start Jan 2026
    const [viewMode, setViewMode] = useState('calendar');

    // Transform prop bookings into calendar friendly format if needed
    // Assuming bookings prop matches our need for now, or we map it.
    // Let's ensure we have dates as objects or ISO strings we can parse.
    
    // Normalized bookings for the grid
    const calendarBookings = bookings.map(b => ({
        ...b,
        // Ensure dates are parsed if they are strings.
        // In real app, we'd handle this more robustly.
        // For now, assuming the incoming data structure matches what Grid expects:
        // { roomId, startDate, endDate, status, guestName }
    }));

    const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    return (
        <div className="flex flex-col h-full bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <CalendarHeader 
                currentMonth={currentMonth}
                onNextMonth={handleNextMonth}
                onPrevMonth={handlePrevMonth}
                viewMode={viewMode}
                setViewMode={setViewMode}
            />
            
            {/* //optional large calendar */}
            <div className="flex-1 overflow-hidden">
                <CalendarGrid 
                    currentMonth={currentMonth}
                    rooms={MOCK_ROOMS}
                    bookings={calendarBookings}
                    onRangeSelected={onRangeSelected}
                />
            </div>
        </div>
    );
};

export default CalendarView;
