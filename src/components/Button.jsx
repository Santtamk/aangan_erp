const Button = ({ children, variant = 'primary', className = '', icon: Icon, ...props }) => {
    const baseStyles = "w-full py-3 px-6 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-emerald-800 hover:bg-emerald-900 text-white shadow-lg shadow-emerald-900/20",
        secondary: "bg-gray-100 hover:bg-gray-200 text-gray-600",
        outline: "border border-gray-200 hover:bg-gray-50 text-gray-600 bg-white"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
            {Icon && <Icon className="w-5 h-5" />}
        </button>
    );
};

export default Button;
