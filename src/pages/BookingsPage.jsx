import { useState } from 'react';
import { format, startOfWeek, addDays, isSameDay, isWithinInterval, parseISO, startOfDay, endOfDay } from 'date-fns';
import { ChevronLeft, Search, Plus, Calendar as CalendarIcon, ChevronRight, List, Calendar } from 'lucide-react';
import Button from '../components/Button';
import BookingCard from '../components/BookingCard';
import CalendarView from '../components/calendar/CalendarView';
import BookingModal from '../components/calendar/BookingModal';
import { useBookings } from '../hooks/useBookings';
import { cn } from '../utils/cn';

const BookingsPage = () => {
    const { bookings, addBooking } = useBookings();
    const [view, setView] = useState('list'); // 'list' or 'calendar'
    // Initialize activeTab to 'All'
    const [activeTab, setActiveTab] = useState('All');
    // Initialize selectedDate to today
    const [selectedDate, setSelectedDate] = useState(new Date());
    
    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    // DEFINED ROOMS List (Single source of truth for now)
    const ROOMS = [
        { id: '101', name: 'Deluxe 101' },
        { id: '102', name: 'Deluxe 102' },
        { id: '201', name: 'Standard 201' },
        { id: '202', name: 'Standard 202' },
        { id: '301', name: 'Suite 301' },
    ];
    // Helper to get name from ID
    const getRoomName = (id) => ROOMS.find(r => r.id === id)?.name || 'Unknown Room';

    // Calculate Available Rooms for the SELECTED DATE
    const totalRooms = ROOMS.length;
    const occupiedRooms = bookings.filter(b => {
        // Check if booking overlaps with Selected Date
        // We consider a room occupied if selectedDate is within [startDate, endDate]
        // Note: Check-out day is usually considered "available" for next check-in in hotels,
        // but for simple "occupied" logic, let's say if selectedDate is < b.endDate it's occupied.
        const start = startOfDay(new Date(b.startDate));
        const end = endOfDay(new Date(b.endDate));
        return isWithinInterval(selectedDate, { start, end });
    }).length;
    const availableRoomsCount = Math.max(0, totalRooms - occupiedRooms);

    const handleRangeSelected = ({ roomId, startDate, endDate }) => {
        setModalData({
            roomId,
            roomName: getRoomName(roomId),
            startDate,
            endDate
        });
        setIsModalOpen(true);
    };

    const handleSaveBooking = (data) => {
        addBooking({
            roomId: data.roomId,
            name: data.guestName, // Keeping legacy 'name' for list view compatibility
            guestName: data.guestName,
            status: data.status,
            price: `Rs. ${data.price}`,
            startDate: data.startDate,
            endDate: data.endDate,
            dates: 'Custom Dates', // Simplification for list view
            avatar: `https://i.pravatar.cc/150?u=${Math.random()}`, // Random avatar
            room: data.roomName || getRoomName(data.roomId)
        });
        setIsModalOpen(false);
    };

 

    // Generate current week days
    const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 }); // Monday start
    const days = Array.from({ length: 7 }, (_, i) => {
        const date = addDays(startOfCurrentWeek, i);
        return {
            dateObj: date,
            day: format(date, 'EEE'),
            dateNum: format(date, 'd')
        };
    });

    return (
        <div className="flex flex-col h-full relative">
            {/* Modal */}
            <BookingModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveBooking}
                initialData={modalData}
                rooms={ROOMS}
            />

            {/* Main Header - Always Visible */}
            <div className="flex items-center justify-between pb-4">
                <div className="flex items-center gap-4">
                    {/* <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-emerald-800 hover:bg-emerald-50 transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                    </button> */}
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Bookings</h1>
                        <p className="text-gray-500 text-xs font-medium">Manage Availability & Stays</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    {/* View Switcher Controls */}
                    <div className="flex p-1 bg-white rounded-xl shadow-sm border border-gray-100 mr-2">
                        <button
                            onClick={() => setView('list')}
                            className={cn(
                                "w-9 h-9 flex items-center justify-center rounded-lg transition-colors",
                                view === 'list' ? "bg-emerald-100 text-emerald-800" : "text-gray-400 hover:bg-gray-50"
                            )}
                        >
                            <List className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setView('calendar')}
                            className={cn(
                                "w-9 h-9 flex items-center justify-center rounded-lg transition-colors",
                                view === 'calendar' ? "bg-emerald-100 text-emerald-800" : "text-gray-400 hover:bg-gray-50"
                            )}
                        >
                            <Calendar className="w-5 h-5" />
                        </button>
                    </div>

                    <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-gray-600 hover:text-emerald-600 transition-colors">
                        <Search className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={() => handleRangeSelected({ 
                            roomId: '101', 
                            startDate: new Date(), 
                            endDate: addDays(new Date(), 1) 
                        })}
                        className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30 text-white hover:bg-orange-600 transition-colors"
                    >
                        <Plus className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Content Swapper */}
            {view === 'calendar' ? (
                <div className="flex-1 min-h-[600px]">
                    <CalendarView 
                        bookings={bookings} 
                        viewMode={view} 
                        setViewMode={setView} 
                        onRangeSelected={handleRangeSelected}
                    />
                </div>
            ) : (
                <div className="flex flex-col gap-6">
                    {/* List View Details */}
                    
                    {/* Date Strip & Calendar */}
                    <div className="bg-white rounded-3xl p-5 shadow-sm mx-1 relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <h2 className="font-bold text-gray-800 text-lg">{format(new Date(), 'MMM yyyy')} / <span className="text-gray-400 font-medium">Weekly View</span></h2>
                            </div>
                            <CalendarIcon className="w-5 h-5 text-orange-500" />
                        </div>

                        <div className="flex justify-between items-center overflow-x-auto gap-2 pb-2 hide-scrollbar">
                            {days.map((item) => {
                                const isSelected = isSameDay(item.dateObj, selectedDate);
                                return (
                                    <button
                                        key={item.dateObj.toISOString()}
                                        onClick={() => setSelectedDate(item.dateObj)}
                                        className={cn(
                                            "flex flex-col items-center justify-center w-12 h-16 shrink-0 rounded-2xl transition-all",
                                            isSelected
                                                ? "bg-white border-2 border-orange-200 shadow-md transform scale-105"
                                                : "bg-transparent text-gray-400 hover:bg-gray-50"
                                        )}
                                    >
                                        {isSelected ? (
                                            <div className="flex flex-col items-center">
                                                <span className="text-[10px] font-bold text-gray-400 mb-1">{item.day}</span>
                                                <span className="text-xl font-bold text-gray-800">{item.dateNum}</span>
                                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1"></span>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center">
                                                <span className="text-[10px] font-medium mb-1">{item.day}</span>
                                                <span className="text-lg font-bold text-gray-500">{item.dateNum}</span>
                                            </div>
                                        )}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-gray-200 px-2 overflow-x-auto hide-scrollbar">
                        {['All', 'Confirmed', 'Pending', 'Cancelled'].map((tab) => {
                            // Calculate count for this tab based on SELECTED DATE
                            const count = bookings.filter(b => {
                                const start = startOfDay(new Date(b.startDate));
                                const end = endOfDay(new Date(b.endDate));
                                const isDateMatch = isWithinInterval(selectedDate, { start, end });
                                
                                if (!isDateMatch) return false;
                                if (tab === 'All') return true;
                                return b.status === tab;
                            }).length;

                            const isActive = activeTab === tab;
                            return (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={cn(
                                        "flex-1 min-w-[100px] pb-3 text-sm font-bold text-center relative whitespace-nowrap",
                                        isActive ? "text-emerald-800" : "text-gray-400 hover:text-gray-500"
                                    )}
                                >
                                    {tab} <span className={cn("ml-1 text-xs px-2 py-0.5 rounded-full", isActive ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-500")}>{count}</span>
                                    {isActive && <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500 rounded-t-full mx-8" />}
                                </button>
                            );
                        })}
                    </div>

                    {/* Booking List - Filtered by Date AND Tab */}
                    <div className="flex flex-col gap-4 pb-20">
                        {bookings.filter(b => {
                            // Date Filter
                            const start = startOfDay(new Date(b.startDate));
                            const end = endOfDay(new Date(b.endDate));
                            const isDateMatch = isWithinInterval(selectedDate, { start, end });
                            if (!isDateMatch) return false;

                            // Tab Filter
                            if (activeTab === 'All') return true;
                            return b.status === activeTab;
                        }).length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-10 text-center opacity-60">
                                <CalendarIcon className="w-12 h-12 text-gray-300 mb-2" />
                                <p className="text-gray-500 font-medium">No bookings for this date</p>
                            </div>
                        ) : (
                            bookings.filter(b => {
                                // Date Filter
                                const start = startOfDay(new Date(b.startDate));
                                const end = endOfDay(new Date(b.endDate));
                                const isDateMatch = isWithinInterval(selectedDate, { start, end });
                                if (!isDateMatch) return false;

                                // Tab Filter
                                if (activeTab === 'All') return true;
                                return b.status === activeTab;
                            }).map(booking => (
                                <BookingCard key={booking.id} booking={booking} />
                            ))
                        )}
                    </div>

                    {/* Availability Floating Banner (Optional, sticky or bottom fixed) */}
                    <div className="bg-emerald-800 rounded-2xl p-4 flex items-center justify-between text-white shadow-xl mx-1">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                                <CalendarIcon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-[10px] text-emerald-200 uppercase font-bold tracking-wider">Rooms Available</p>
                                <h3 className="font-bold text-lg">{availableRoomsCount} Units Remaining</h3>
                            </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-emerald-200" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingsPage;
