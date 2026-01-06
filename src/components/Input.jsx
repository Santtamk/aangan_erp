import { forwardRef } from 'react';

const Input = forwardRef(({ icon: Icon, type = 'text', className = '', ...props }, ref) => {
    return (
        <div className={`relative flex items-center ${className}`}>
            {Icon && (
                <div className="absolute left-4 text-gray-400">
                    <Icon className="w-5 h-5" />
                </div>
            )}
            <input
                ref={ref}
                type={type}
                className={`w-full py-3 ${Icon ? 'pl-11' : 'pl-4'} pr-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-gray-700 placeholder-gray-400`}
                {...props}
            />
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
