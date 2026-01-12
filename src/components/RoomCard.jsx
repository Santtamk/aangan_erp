import { Wifi, ShowerHead, PenTool } from 'lucide-react';
import { cn } from '../utils/cn';

const RoomCard = ({ room }) => {
    const { id, name, type, floor, status, bedType, lastCleaned, amenities, image } = room;

    const isOccupied = status === 'Occupied';
    const isAvailable = status === 'Available';

    return (
        <div className="bg-white rounded-3xl p-3 shadow-sm flex gap-4 pr-4">
            <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                <img src={image} alt={name} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 py-1">
                <div className="flex justify-between items-start mb-1">
                    <div>
                        <h3 className="font-bold text-gray-900 leading-tight">{name} - {type}</h3>
                        <p className="text-gray-400 text-xs font-medium">{floor} • {bedType}</p>
                    </div>
                    <span className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase",
                        isOccupied ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-600"
                    )}>
                        {status}
                    </span>
                </div>

                {/* Amenities / Features */}
                <div className="flex gap-2 mb-2">
                    {amenities.includes('WiFi') && (
                        <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
                            <Wifi className="w-3 h-3 text-gray-500" />
                            <span className="text-[10px] font-bold text-gray-600">WiFi</span>
                        </div>
                    )}
                    {amenities.includes('Hot Shower') && (
                        <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
                            <ShowerHead className="w-3 h-3 text-gray-500" />
                            <span className="text-[10px] font-bold text-gray-600">Hot Shower</span>
                        </div>
                    )}
                </div>

                {/* Status / Cleaning */}
                {lastCleaned && (
                    <div className="flex items-center gap-1.5 mt-1">
                        <PenTool className="w-3 h-3 text-emerald-800" />
                        <span className="text-[10px] font-bold text-emerald-800">Cleaned at {lastCleaned}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RoomCard;
