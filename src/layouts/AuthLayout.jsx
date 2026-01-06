import bgImage from '../assets/bg.png';

const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div className="min-h-screen relative flex flex-col items-center justify-center font-sans">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={bgImage}
                    alt="Homestay Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-emerald-900/80 backdrop-blur-[2px]"></div>
            </div>

            {/* Decorative Header Shape (Optional, to mimic the curve/header if needed) */}
            {/* For now, we'll keep it simple as a full page overlay with the card centered */}

            {/* Content */}
            <div className="relative z-10 w-full max-w-md px-4 flex flex-col items-center gap-6">
                {/* Header - Logo area */}
                <div className="text-center text-white mb-4">
                    {/* Placeholder for Logo Icon */}
                    <div className="mx-auto w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-4">
                        {/* We can use Lucide Home icon here or passed in */}
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="w-10 h-10 text-orange-500"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                    <p className="text-emerald-100 text-sm mt-1 opacity-90">{subtitle}</p>
                </div>

                {/* Card */}
                <div className="w-full bg-white rounded-3xl shadow-2xl p-8">
                    {children}
                </div>

                {/* Footer */}
                <div className="text-center text-emerald-100/60 text-xs mt-4">
                    © 2024 Aangan Homestay ERP. All Rights Reserved.
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
