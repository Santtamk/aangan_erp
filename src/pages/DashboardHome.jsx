import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis } from 'recharts';
import { Plus, BedDouble, ListTodo, Wallet, ChevronRight, Check, Clock } from 'lucide-react';
import { cn } from '../utils/cn';

// Mock Data
const trendData = [
    { name: 'Mon', value: 4000 },
    { name: 'Tue', value: 3000 },
    { name: 'Wed', value: 5000 },
    { name: 'Thu', value: 4500 },
    { name: 'Fri', value: 7000 },
    { name: 'Sat', value: 8500 },
    { name: 'Sun', value: 6000 },
];

const DashboardHome = () => {
    return (
        <div className="flex flex-col gap-6">

            {/* Stats Cards Row */}
            <div className="flex gap-4">
                <div className="flex-1 bg-white p-5 rounded-3xl shadow-sm relative overflow-hidden">
                    <div className="relative z-10">
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wide">Total Revenue</p>
                        <h3 className="text-2xl font-bold text-gray-800 mt-1">Rs. 45.2k</h3>
                        <div className="flex items-center gap-1 mt-1 text-emerald-500 text-xs font-bold">
                            <span>↑ 12%</span>
                        </div>
                    </div>
                    <div className="absolute left-0 top-8 bottom-0 w-1 bg-emerald-800 rounded-r-full h-1/2 my-auto" />
                </div>

                <div className="flex-1 bg-white p-5 rounded-3xl shadow-sm relative overflow-hidden">
                    <div className="relative z-10">
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wide">Occupancy</p>
                        <h3 className="text-2xl font-bold text-gray-800 mt-1">84%</h3>
                        <div className="flex items-center gap-1 mt-1 text-emerald-500 text-xs font-bold">
                            <span>↑ 5%</span>
                        </div>
                    </div>
                    <div className="absolute left-0 top-8 bottom-0 w-1 bg-orange-400 rounded-r-full h-1/2 my-auto" />
                </div>
            </div>

            {/* Booking Trends Chart */}
            <div className="bg-white p-6 rounded-3xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="tex-lg font-bold text-emerald-900">Booking Trends</h3>
                    <button className="text-gray-400 hover:text-gray-600">
                        <div className="flex gap-0.5">
                            <div className="w-1 h-1 bg-current rounded-full" />
                            <div className="w-1 h-1 bg-current rounded-full" />
                            <div className="w-1 h-1 bg-current rounded-full" />
                        </div>
                    </button>
                </div>

                <div className="h-40 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={trendData}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" hide />
                            <YAxis hide />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#064e3b"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorValue)"
                                dot={{ stroke: '#f97316', strokeWidth: 2, r: 4, fill: '#fff' }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-4 gap-4">
                <ActionIcon icon={Plus} label="New Booking" color="bg-emerald-800" textColor="text-white" />
                <ActionIcon icon={BedDouble} label="Rooms" color="bg-white" textColor="text-emerald-800" />
                <ActionIcon icon={ListTodo} label="Tasks" color="bg-white" textColor="text-emerald-800" />
                <ActionIcon icon={Wallet} label="Finance" color="bg-white" textColor="text-emerald-800" />
            </div>

            {/* Recent Bookings Section */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-emerald-900">Recent Bookings</h3>
                    <button className="text-orange-500 text-xs font-bold hover:underline">View All</button>
                </div>

                <div className="flex flex-col gap-3">
                    <BookingCard
                        name="Rajesh Hamal"
                        detail="Room 102 • 2 Nights"
                        price="Rs. 4,500"
                        status="PAID"
                        img="https://i.pravatar.cc/150?u=rajesh"
                    />
                    <BookingCard
                        name="Sita Sharma"
                        detail="Room 201 • 1 Night"
                        price="Rs. 2,200"
                        status="PENDING"
                        img="https://i.pravatar.cc/150?u=sita"
                    />
                </div>
            </div>

            {/* Staff Tasks Section */}
            <div className="bg-gray-100/50 -mx-6 px-6 py-6 pb-2 roumded-t-3xl border-t border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                    <ListTodo className="w-5 h-5 text-emerald-800" />
                    <h3 className="text-lg font-bold text-emerald-900">Staff Tasks</h3>
                </div>

                <div className="flex flex-col gap-3">
                    <TaskItem title="Clean Room 104" due="Due: 11:00 AM" completed={false} />
                    <TaskItem title="Laundry Pickup" due="Completed" completed={true} />
                </div>
            </div>
        </div>
    );
};

// Sub-components for cleaner file (Usually in separate files)
const ActionIcon = ({ icon: Icon, label, color, textColor }) => (
    <button className="flex flex-col items-center gap-2 group">
        <div className={cn("w-14 h-14 rounded-2xl shadow-sm flex items-center justify-center transition-transform active:scale-95", color)}>
            <Icon className={cn("w-7 h-7", textColor)} />
        </div>
        <span className="text-[10px] font-bold text-emerald-900">{label}</span>
    </button>
);

const BookingCard = ({ name, detail, price, status, img }) => (
    <div className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
            <img src={img} alt={name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
            <div>
                <h4 className="font-bold text-emerald-900 text-sm">{name}</h4>
                <p className="text-xs text-gray-400 font-medium">{detail}</p>
            </div>
        </div>
        <div className="text-right">
            <p className="font-bold text-emerald-900 text-sm">{price}</p>
            <span className={cn(
                "text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-0.5",
                status === 'PAID' ? "bg-emerald-100 text-emerald-600" : "bg-orange-100 text-orange-600"
            )}>
                {status}
            </span>
        </div>
    </div>
);

const TaskItem = ({ title, due, completed }) => (
    <div className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-gray-50">
        <div className="flex items-center gap-3">
            <button className={cn(
                "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                completed ? "bg-emerald-400 border-emerald-400" : "border-gray-200"
            )}>
                {completed && <Check className="w-4 h-4 text-white" />}
            </button>
            <span className={cn("font-medium text-sm", completed ? "text-gray-400 line-through" : "text-emerald-900")}>
                {title}
            </span>
        </div>
        <span className={cn("text-xs font-bold", completed ? "text-gray-400" : "text-orange-400")}>{due}</span>
    </div>
);

export default DashboardHome;
