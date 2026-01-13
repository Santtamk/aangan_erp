import { useState } from 'react';
import { Home, Calendar, Package, Users, Bell, ChevronDown, LogOut, Settings } from 'lucide-react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../utils/cn';

const DashboardLayout = () => {
    // const [lang, setLang] = useState('EN'); // Removed in favor of Settings Page
    const location = useLocation();
    const navigate = useNavigate();

    const navItems = [
        { name: 'Home', icon: Home, path: '/dashboard' },
        { name: 'Bookings', icon: Calendar, path: '/dashboard/bookings' },
        { name: 'Inventory', icon: Package, path: '/dashboard/inventory' },
        { name: 'Staff', icon: Users, path: '/dashboard/staff' },
    ];

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
            {/* Top Header */}
            <header className="fixed top-0 left-0 right-0 bg-emerald-800 text-white z-50 rounded-b-3xl px-6 pt-10 pb-6 shadow-xl">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <Home className="w-5 h-5 text-orange-400" />
                        </div>
                        <div>
                            <h1 className="font-bold text-lg leading-tight">Aangan</h1>
                            <p className="text-xs text-emerald-200/80">Owner Dashboard | English</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Notification Bell */}
                        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 relative backdrop-blur-sm">
                            <Bell className="w-4 h-4 text-white" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border border-emerald-800"></span>
                        </button>

                        {/* Settings Button (Replaces Language Selector) */}
                        <button 
                            onClick={() => navigate('/dashboard/settings')}
                            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-colors text-white"
                            title="Settings"
                        >
                            <Settings className="w-5 h-5" />
                        </button>

                        {/* Logout Button */}
                        <button
                            onClick={() => window.location.href = '/'}
                            className="w-9 h-9 flex items-center justify-center rounded-full bg-red-500/80 hover:bg-red-600 backdrop-blur-sm transition-colors text-white"
                            title="Logout"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content Scroll Area */}
            <main className="flex-1 overflow-y-auto mt-28 mb-20 px-6 py-6 pb-24 no-scrollbar">
                <Outlet />
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex items-center justify-around py-2 rounded-t-3xl shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.05)] z-50">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));

                    return (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={() => cn(
                                "flex flex-col items-center gap-1 p-2 transition-colors duration-200",
                                isActive ? "text-orange-500" : "text-gray-400 hover:text-gray-500"
                            )}
                        >
                            {isActive && item.name === 'Home' ? (
                                <div className="p-1 rounded-full border-2 border-orange-500 border-dashed animate-[spin_10s_linear_infinite]">
                                    <item.icon className="w-5 h-5" fill={isActive ? "currentColor" : "none"} />
                                </div>
                            ) : (
                                <item.icon className={cn("w-6 h-6", isActive ? "fill-orange-500/20" : "")} strokeWidth={isActive ? 2.5 : 2} />
                            )}

                            <span className="text-[10px] font-medium">{item.name}</span>
                        </NavLink>
                    );
                })}
            </nav>
        </div>
    );
};

export default DashboardLayout;
