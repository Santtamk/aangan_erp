import { ChevronLeft, Languages, Info, Settings as SettingsIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../hooks/useSettings';
import Button from '../components/Button';
import { cn } from '../utils/cn';

const SettingsPage = () => {
    const navigate = useNavigate();
    const { settings, setLanguage } = useSettings();

    return (
        <div className="flex flex-col min-h-[80vh] relative max-w-2xl mx-auto">
            {/* Header Card */}
            <div className="bg-emerald-800 rounded-3xl p-6 text-white shadow-xl mb-8 relative overflow-hidden">
                <div className="relative z-10 flex items-center gap-4">
                    <button 
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors backdrop-blur-sm"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold">Settings</h1>
                        <p className="text-emerald-200 text-xs font-medium">App Interface Language</p>
                    </div>
                </div>
                {/* Decorative BG Circle */}
                <div className="absolute -right-10 -bottom-20 w-40 h-40 bg-emerald-700/50 rounded-full blur-2xl"></div>
            </div>

            {/* Language Icon */}
            <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 bg-emerald-800 rounded-xl flex items-center justify-center text-white shadow-lg transform rotate-3">
                         <Languages className="w-8 h-8" />
                    </div>
                </div>
            </div>

            <div className="text-center mb-8">
                <h2 className="text-xl font-bold text-emerald-900 mb-2">Choose Language</h2>
                <p className="text-gray-500 text-sm max-w-xs mx-auto">Select your preferred language for the Aangan ERP interface.</p>
            </div>

            {/* Language Options */}
            <div className="flex flex-col gap-4 mb-8">
                <button
                    onClick={() => setLanguage('en')}
                    className={cn(
                        "flex items-center justify-between p-5 rounded-3xl border-2 transition-all group",
                        settings.language === 'en' 
                            ? "border-emerald-500 bg-emerald-50 shadow-md" 
                            : "border-gray-100 bg-white hover:border-gray-200"
                    )}
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-xl font-serif font-bold text-gray-700 group-hover:bg-white transition-colors">
                            A
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-gray-800 text-lg">English</h3>
                            <p className="text-xs text-gray-400 font-medium">Default System Language</p>
                        </div>
                    </div>
                    <div className={cn(
                        "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                        settings.language === 'en' ? "border-orange-500" : "border-gray-200"
                    )}>
                        {settings.language === 'en' && <div className="w-3 h-3 bg-orange-500 rounded-full" />}
                    </div>
                </button>

                <button
                    onClick={() => setLanguage('np')}
                    className={cn(
                        "flex items-center justify-between p-5 rounded-3xl border-2 transition-all group",
                        settings.language === 'np' 
                            ? "border-emerald-500 bg-emerald-50 shadow-md" 
                            : "border-gray-100 bg-white hover:border-gray-200"
                    )}
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-xl font-bold text-gray-700 group-hover:bg-white transition-colors">
                            ने
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-gray-800 text-lg">Nepali (नेपाली)</h3>
                            <p className="text-xs text-gray-400 font-medium">आफ्नो भाषामा प्रयोग गर्नुहोस्</p>
                        </div>
                    </div>
                    <div className={cn(
                        "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                        settings.language === 'np' ? "border-orange-500" : "border-gray-200"
                    )}>
                        {settings.language === 'np' && <div className="w-3 h-3 bg-orange-500 rounded-full" />}
                    </div>
                </button>
            </div>

            {/* Info Card */}
            <div className="bg-white border border-gray-100 rounded-3xl p-5 flex gap-4 shadow-sm mb-24">
                <Info className="w-6 h-6 text-emerald-800 shrink-0 mt-1" />
                <div>
                    <h4 className="font-bold text-emerald-900 mb-1">Stakeholder View</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                        Language settings will apply to your personal dashboard (Owner Level). Staff members can set their own language preferences.
                    </p>
                </div>
            </div>

            {/* Floating Save/Back Button (Optional, as state is instant, but requested in design) */}
            <div className="fixed bottom-24 left-6 right-6 z-40 max-w-2xl mx-auto">
                <Button 
                    onClick={() => navigate(-1)}
                    className="w-full bg-emerald-800 hover:bg-emerald-900 shadow-xl shadow-emerald-900/20 py-4 rounded-2xl flex items-center justify-center gap-2 text-white"
                >
                    Save Changes
                </Button>
            </div>
        </div>
    );
};

export default SettingsPage;
