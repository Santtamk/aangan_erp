import { ChevronLeft, ChevronRight, Calendar, List } from 'lucide-react';
import { format } from 'date-fns';

const CalendarHeader = ({ currentMonth, onPrevMonth, onNextMonth, viewMode, setViewMode }) => {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-t-3xl border-b border-gray-100">
            {/* Month Navigation */}
            <div className="flex items-center gap-4">
                <div className="flex items-center bg-gray-50 rounded-full p-1 border border-gray-200">
                    <button 
                        onClick={onPrevMonth}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm text-gray-500 hover:text-emerald-800 transition-all"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={onNextMonth}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm text-gray-500 hover:text-emerald-800 transition-all"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
                <div>
                    <h2 className="text-lg font-bold text-gray-800">
                        {format(currentMonth, 'MMMM yyyy')}
                    </h2>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                         Inventory View
                    </p>
                </div>
            </div>

            {/* View Switcher */}
            <div className="flex p-1 bg-gray-100 rounded-xl">
                <button
                    onClick={() => setViewMode('list')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                        viewMode === 'list' 
                            ? 'bg-white text-emerald-800 shadow-sm' 
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    <List className="w-4 h-4" />
                    List
                </button>
                <button
                    onClick={() => setViewMode('calendar')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                        viewMode === 'calendar' 
                            ? 'bg-white text-emerald-800 shadow-sm' 
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    <Calendar className="w-4 h-4" />
                    Calendar
                </button>
            </div>
        </div>
    );
};

export default CalendarHeader;
