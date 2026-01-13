import { useState } from 'react';
import { Search, SlidersHorizontal, Plus, AlertTriangle, ScrollText, Minus } from 'lucide-react';
import RoomCard from '../components/RoomCard';
import Button from '../components/Button';
import Input from '../components/Input';
import { useInventory } from '../hooks/useInventory';
import { cn } from '../utils/cn';

const InventoryPage = () => {
    const rooms = [
        {
            id: '101',
            name: 'Room 101',
            type: 'Deluxe',
            floor: 'Floor 1',
            bedType: 'King Bed',
            status: 'Occupied',
            amenities: ['WiFi', 'Hot Shower'],
            image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1000&auto=format&fit=crop',
            lastCleaned: null
        },
        {
            id: '102',
            name: 'Room 102',
            type: 'Twin',
            floor: 'Floor 1',
            bedType: '2 Single Beds',
            status: 'Available',
            amenities: ['WiFi', 'Hot Shower'],
            image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=1000&auto=format&fit=crop',
            lastCleaned: '09:30 AM'
        }
    ];

    const { inventory, updateStock, getLowStockItems, getItemsByCategory } = useInventory();
    const [activeTab, setActiveTab] = useState('Rooms');


    const lowStockItems = getLowStockItems();
    const supplies = getItemsByCategory('Supplies');
    const amenities = getItemsByCategory('Amenities');

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            {/* Header */}
            <div className="flex items-center justify-between pb-4">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800">
                        {/* Custom Box Icon from Image */}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Inventory</h1>
                        {/* <p className="text-gray-500 text-xs font-medium">स्टक व्यवस्थापन | Nepali</p> */}
                    </div>
                </div>
                <button className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30 text-white hover:bg-orange-600 transition-colors">
                    <Plus className="w-6 h-6" />
                </button>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl p-1 shadow-sm flex mx-auto relative z-10 w-full overflow-hidden text-sm font-bold text-gray-400">
                {['Rooms', 'Supplies', 'Amenities'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "flex-1 py-2 transition-colors duration-200",
                            activeTab === tab 
                                ? "text-emerald-800 border-b-2 border-emerald-800 bg-emerald-50/50" 
                                : "hover:text-emerald-600 hover:bg-gray-50"
                        )}
                    >
                        {tab} <span className="text-xs ml-1 opacity-60">
                            {tab === 'Rooms' ? rooms.length : 
                             tab === 'Supplies' ? supplies.length : 
                             amenities.length}
                        </span>
                    </button>
                ))}
            </div>

            {/* Search Filter */}
            <div className="flex gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search items..."
                        className="w-full bg-white rounded-2xl py-3 pl-12 pr-4 text-sm font-bold text-gray-700 placeholder-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                </div>
                <button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-800 shadow-sm">
                    <SlidersHorizontal className="w-6 h-6" />
                </button>
            </div>

            {/* Content Area */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-emerald-900 uppercase tracking-widest text-sm">{activeTab} Status</h3>
                    {activeTab === 'Rooms' && <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-lg text-xs font-bold">8/12 Occupied</span>}
                </div>

                <div className="flex flex-col gap-4">
                    {activeTab === 'Rooms' ? (
                        rooms.map(room => (
                            <RoomCard key={room.id} room={room} />
                        ))
                    ) : (
                        (activeTab === 'Supplies' ? supplies : amenities).map(item => (
                            <div key={item.id} className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-gray-100 hover:border-emerald-200 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800">{item.name}</h4>
                                        <p className="text-xs text-gray-400 font-medium">Min: {item.minStock} {item.unit}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "text-right mr-2",
                                        item.stock <= item.minStock ? "text-red-500" : "text-emerald-600"
                                    )}>
                                        <p className="font-bold text-lg">{item.stock}</p>
                                        <p className="text-[10px] uppercase font-bold tracking-wider">{item.unit}</p>
                                    </div>
                                    
                                    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                                        <button 
                                            onClick={() => updateStock(item.id, -1)}
                                            className="w-8 h-8 rounded-md bg-white text-gray-600 shadow-sm flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <button 
                                            onClick={() => updateStock(item.id, 1)}
                                            className="w-8 h-8 rounded-md bg-emerald-500 text-white shadow-sm flex items-center justify-center hover:bg-emerald-600 active:scale-95 transition-all"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Low Stock Alerts */}
            {lowStockItems.length > 0 && (
                <div className="bg-orange-50 rounded-3xl p-5 border border-orange-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-orange-500 text-lg">Low Stock Alerts ({lowStockItems.length})</h3>
                        <AlertTriangle className="w-6 h-6 text-orange-500" />
                    </div>

                    <div className="flex flex-col gap-3">
                        {lowStockItems.map(item => (
                            <div key={item.id} className="bg-white p-3 rounded-2xl flex items-center justify-between shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                                        <span className="text-xl">{item.icon}</span>
                                    </div>
                                    <span className="font-bold text-gray-800">{item.name}</span>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-red-500">{item.stock} left</p>
                                    <p className="text-[10px] text-gray-400">Min: {item.minStock}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Stock Update Request */}
            <div className="bg-emerald-800 rounded-3xl p-6 text-white text-center pb-8">
                <div className="mb-4 text-left">
                    <h3 className="font-bold text-lg">Stock Update Request</h3>
                    <p className="text-emerald-200/80 text-xs mt-1">Notify chief staff for procurement</p>
                </div>

                <button className="w-full bg-white text-emerald-900 font-bold py-3.5 rounded-xl shadow-lg hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2">
                    Create Purchase Order
                    <ScrollText className="w-5 h-5" />
                </button>
            </div>

            {/* Bottom spacer for nav */}
            <div className="h-10"></div>
        </div>
    );
};

export default InventoryPage;
