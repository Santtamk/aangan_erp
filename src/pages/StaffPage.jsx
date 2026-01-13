import { useState } from 'react';
import { ChevronLeft, UserPlus, ChevronDown, Calendar, FileText, ListTodo, MoreVertical, Save, Trash2 } from 'lucide-react';
import Toggle from '../components/Toggle';
import Button from '../components/Button';
import { cn } from '../utils/cn';
import { useStaff } from '../hooks/useStaff';

const StaffPage = () => {
    const { staff, permissions, addStaff, removeStaff, updatePermission } = useStaff();
    const [activeTab, setActiveTab] = useState('Chief Staff');

    const handleAddStaff = () => {
        const name = prompt("Enter new staff name:");
        if (name) {
            addStaff(name, activeTab === 'Chief Staff' ? 'Chief Staff' : 'Staff');
        }
    };

    return (
        <div className="flex flex-col gap-6 pb-24">
            {/* Header */}
            {/* Header */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        {/* <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-emerald-800 hover:bg-emerald-50 transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                        </button> */}
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Staff Roles</h1>
                            <p className="text-gray-500 text-xs font-medium">Permissions & Access | English</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={handleAddStaff}
                            className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-emerald-800 hover:bg-emerald-50 transition-colors"
                        >
                            <UserPlus className="w-5 h-5" />
                        </button>
                        <button className="flex items-center gap-1 bg-white border border-gray-200 px-3 py-2 rounded-full text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                            EN <ChevronDown className="w-3 h-3" />
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex items-end gap-8 px-4 border-b border-gray-200">
                    {['Chief Staff', 'All Staff'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "pb-3 font-bold text-lg relative transition-colors",
                                activeTab === tab ? "text-emerald-800" : "text-gray-400 hover:text-gray-500"
                            )}
                        >
                            {tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500 rounded-t-full" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Permissions Section */}
            <div>
                <div className="flex items-center justify-between mb-4 mt-2">
                    <h2 className="font-bold text-emerald-900 text-lg">{activeTab} Permissions</h2>
                    <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide">
                        {activeTab === 'Chief Staff' ? 'Manager Level' : 'Restricted'}
                    </span>
                </div>

                <div className="flex flex-col gap-3">
                    <PermissionCard
                        icon={Calendar}
                        title="Manage Bookings"
                        desc="Add, Edit, Cancel bookings"
                        checked={permissions[activeTab]?.bookings}
                        onChange={() => updatePermission(activeTab, 'bookings')}
                    />
                    <PermissionCard
                        icon={FileText}
                        title="Financial Records"
                        desc="View revenue and expenses"
                        checked={permissions[activeTab]?.finance}
                        onChange={() => updatePermission(activeTab, 'finance')}
                    />
                    <PermissionCard
                        icon={ListTodo}
                        title="Assign Tasks"
                        desc="Delegate tasks to staff"
                        checked={permissions[activeTab]?.tasks}
                        onChange={() => updatePermission(activeTab, 'tasks')}
                    />
                </div>
            </div>

            {/* Assigned Personnel */}
            <div>
                <h2 className="font-bold text-emerald-900 text-lg mb-4">Assigned Personnel</h2>
                <div className="flex flex-col gap-3">
                    {staff.map(person => (
                        <PersonnelCard
                            key={person.id}
                            name={person.name}
                            joined={person.joined}
                            img={person.avatar}
                            role={person.role}
                            onDelete={() => removeStaff(person.id)}
                        />
                    ))}
                    {staff.length === 0 && (
                        <p className="text-center text-gray-400 text-sm py-4 italic">No staff members found.</p>
                    )}
                </div>
            </div>

            {/* Save Button (Floating) */}
            <div className="fixed bottom-24 left-6 right-6 z-40">
                <Button className="w-full bg-emerald-800 hover:bg-emerald-900 shadow-xl shadow-emerald-900/20 py-4 rounded-2xl flex items-center justify-center gap-2 text-white">
                    <Save className="w-5 h-5" />
                    Save Role Config
                </Button>
            </div>
        </div>
    );
};

// Sub-components
const PermissionCard = ({ icon: Icon, title, desc, checked, onChange }) => (
    <div className="bg-white p-4 rounded-3xl shadow-sm flex items-center justify-between border border-gray-50">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-emerald-800">
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <h3 className="font-bold text-emerald-900">{title}</h3>
                <p className="text-xs text-gray-400 font-medium">{desc}</p>
            </div>
        </div>
        <Toggle checked={checked} onChange={onChange} />
    </div>
);

const PersonnelCard = ({ name, joined, img, role, onDelete }) => (
    <div className="bg-white p-4 rounded-3xl shadow-sm flex items-center justify-between border border-gray-50">
        <div className="flex items-center gap-4">
            <img src={img} alt={name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
            <div>
                <h3 className="font-bold text-emerald-900">{name}</h3>
                <p className="text-xs text-gray-400 font-medium">Joined: {joined} • <span className="text-emerald-600">{role}</span></p>
            </div>
        </div>
        <button 
            onClick={onDelete}
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
        >
            <Trash2 className="w-4 h-4" />
        </button>
    </div>
);

export default StaffPage;
