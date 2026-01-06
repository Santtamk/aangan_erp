import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Facebook } from 'lucide-react';
import AuthLayout from '../layouts/AuthLayout';
import Input from '../components/Input';
import Button from '../components/Button';
import SocialButton from '../components/SocialButton';

// Mock Google Icon since it's not in Lucide regular set usually, or simple SVG
const GoogleIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z" fill="#4285F4" />
        <path d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1901 21.1039L16.3231 18.1055C15.2517 18.8375 13.8628 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.2401 24.0008Z" fill="#34A853" />
        <path d="M5.50253 14.3003C5.00236 12.8099 5.00236 11.1961 5.50253 9.70575V6.61481H1.51649C-0.185517 10.0056 -0.185517 14.0005 1.51649 17.3912L5.50253 14.3003Z" fill="#FBBC05" />
        <path d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50264 9.70575C6.45064 6.86173 9.10947 4.74966 12.2401 4.74966Z" fill="#EA4335" />
    </svg>
);

const LoginPage = () => {
    const [role, setRole] = useState('owner');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <AuthLayout title="Aangan" subtitle="Homestay Management ERP">
            <div className="flex flex-col gap-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
                    <p className="text-gray-500 text-sm mt-1">Sign in to manage your property</p>
                </div>

                <form className="flex flex-col gap-4">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                            <Input
                                icon={Mail}
                                placeholder="owner@aangan.com"
                                type="email"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Password</label>
                            <div className="relative">
                                <Input
                                    icon={Lock}
                                    placeholder="••••••••"
                                    type={showPassword ? "text" : "password"}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button type="button" className="text-orange-500 text-sm font-bold hover:text-orange-600">
                            FORGOT PASSWORD?
                        </button>
                    </div>

                    <div className="flex gap-4">
                        <Button
                            type="button"
                            variant={role === 'owner' ? 'secondary' : 'outline'}
                            className={`justify-center uppercase text-sm ${role === 'owner' ? 'bg-gray-100 border-transparent' : 'bg-transparent border-gray-200'}`}
                            onClick={() => setRole('owner')}
                        >
                            Owner
                        </Button>
                        <Button
                            type="button"
                            variant={role === 'staff' ? 'secondary' : 'outline'}
                            className={`justify-center uppercase text-sm ${role === 'staff' ? 'bg-gray-100 border-transparent' : 'bg-transparent border-gray-200'}`}
                            onClick={() => setRole('staff')}
                        >
                            Staff
                        </Button>
                    </div>

                    <Button className="mt-2 bg-emerald-800 hover:bg-emerald-900 group">
                        Sign In <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Button>

                </form>

                <div className="flex flex-col items-center gap-4">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Or continue with</p>
                    <div className="flex gap-6">
                        <SocialButton icon={GoogleIcon} onClick={() => { }} />
                        <SocialButton icon={({ className }) => <Facebook className={`${className} fill-blue-600 text-blue-600 border-none`} />} onClick={() => { }} />
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
};

export default LoginPage;
