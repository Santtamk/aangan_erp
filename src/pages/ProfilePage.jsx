import { useState } from 'react';
import { Camera, Settings, LogOut, Shield, User, ChevronRight } from 'lucide-react';
import { cn } from '../utils/cn';

const ProfilePage = () => {
    
    // Mock State
    const [formData, setFormData] = useState({
        fullName: 'Kiran Raj Adhikari',
        phone: '9841234567',
        email: 'kiran.adhikari@aangan.com'
    });

    const [preferences, setPreferences] = useState({
        language: 'en', // 'en' | 'np'
        notifications: true,
        currency: 'NPR'
    });

    return (
        <div className="flex flex-col gap-6">
            
            {/* Standard Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
                    <p className="text-gray-500 text-xs font-medium">Manage your account & preferences</p>
                </div>
            </div>

            {/* Profile Content */}
            <div className="flex flex-col gap-4">
                
                {/* Avatar & Summary Card */}
                <div className="bg-white rounded-3xl p-6 shadow-sm flex items-center gap-6">
                    <div className="relative shrink-0">
                        <div className="w-20 h-20 rounded-full border-4 border-emerald-50 shadow-sm overflow-hidden bg-gray-200">
                             <img 
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                                alt="Profile" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <button className="absolute bottom-0 right-0 w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center text-white border-2 border-white shadow-sm">
                            <Camera className="w-3.5 h-3.5" />
                        </button>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-emerald-900">{formData.fullName}</h2>
                        <p className="text-xs text-gray-400 font-medium mb-2">Property Owner • Member since 2023</p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                            Verified Account
                        </span>
                    </div>
                </div>

                {/* Personal Details Card */}
                <div className="bg-white rounded-3xl p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <User className="w-5 h-5 text-emerald-800" />
                        <h3 className="font-bold text-gray-800 text-lg">Personal Details</h3>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">Full Name</label>
                            <input 
                                type="text" 
                                value={formData.fullName}
                                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 focus:ring-2 focus:ring-emerald-500/20"
                            />
                        </div>

                        <div className="flex gap-3">
                            <div className="w-24 shrink-0">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">Phone</label>
                                <div className="bg-gray-50 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 flex items-center justify-center">
                                    +977
                                </div>
                            </div>
                            <div className="flex-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">Number</label>
                                <input 
                                    type="text" 
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 focus:ring-2 focus:ring-emerald-500/20"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 block">Email Address</label>
                            <input 
                                type="email" 
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 focus:ring-2 focus:ring-emerald-500/20"
                            />
                        </div>
                    </div>
                </div>

                {/* App Preferences Card */}
                <div className="bg-white rounded-3xl p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-6">
                        <Settings className="w-5 h-5 text-emerald-800" />
                        <h3 className="font-bold text-gray-800 text-lg">App Preferences</h3>
                    </div>

                    <div className="space-y-6">
                        {/* Language */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-bold text-gray-800 text-sm mb-1">Language / भाषा</h4>
                                <p className="text-[10px] text-gray-400">Choose your preferred language</p>
                            </div>
                            <div className="flex bg-gray-100 p-1 rounded-lg">
                                <button 
                                    onClick={() => setPreferences(prev => ({...prev, language: 'en'}))}
                                    className={cn(
                                        "px-3 py-1.5 rounded-md text-xs font-bold transition-all",
                                        preferences.language === 'en' ? "bg-white text-emerald-800 shadow-sm" : "text-gray-500 hover:text-gray-700"
                                    )}
                                >
                                    English
                                </button>
                                <button 
                                    onClick={() => setPreferences(prev => ({...prev, language: 'np'}))}
                                    className={cn(
                                        "px-3 py-1.5 rounded-md text-xs font-bold transition-all",
                                        preferences.language === 'np' ? "bg-white text-emerald-800 shadow-sm" : "text-gray-500 hover:text-gray-700"
                                    )}
                                >
                                    नेपाली
                                </button>
                            </div>
                        </div>

                        {/* Push Notifications */}
                        <div className="flex items-center justify-between">
                             <div>
                                <h4 className="font-bold text-gray-800 text-sm mb-1">Push Notifications</h4>
                                <p className="text-[10px] text-gray-400">Booking and task alerts</p>
                            </div>
                            <button 
                                onClick={() => setPreferences(prev => ({...prev, notifications: !prev.notifications}))}
                                className={cn(
                                    "w-12 h-7 rounded-full transition-colors relative",
                                    preferences.notifications ? "bg-emerald-700" : "bg-gray-200"
                                )}
                            >
                                <div className={cn(
                                    "w-5 h-5 bg-white rounded-full shadow-md absolute top-1 transition-transform",
                                    preferences.notifications ? "left-6" : "left-1"
                                )} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Actions Group */}
                <div className="grid grid-cols-1 gap-3">
                    <button className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between hover:bg-gray-50 transition-colors group text-left">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                <Shield className="w-5 h-5" />
                            </div>
                            <span className="font-bold text-gray-700 text-sm">Change Password</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
                    </button>

                    <button className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between hover:bg-red-50 transition-colors group text-left">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                                <LogOut className="w-5 h-5" />
                            </div>
                            <span className="font-bold text-red-500 text-sm">Log Out</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-red-200 group-hover:text-red-500 transition-colors" />
                    </button>
                </div>

                {/* Save Button */}
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all">
                    Save Changes
                </button>

                {/* Footer Info */}
                <div className="text-center pb-4">
                     <p className="text-[10px] text-gray-400 font-medium">App Version 2.4.0 (Stable)</p>
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;
