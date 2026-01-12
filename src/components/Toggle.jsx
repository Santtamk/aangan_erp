import { cn } from '../utils/cn';

const Toggle = ({ checked, onChange }) => {
    return (
        <button
            onClick={() => onChange?.(!checked)}
            className={cn(
                "w-12 h-7 rounded-full transition-colors duration-200 ease-in-out relative focus:outline-none focus:ring-2 focus:ring-emerald-500/20",
                checked ? "bg-emerald-800" : "bg-gray-300"
            )}
        >
            <span
                className={cn(
                    "block w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out absolute top-1",
                    checked ? "translate-x-6" : "translate-x-1"
                )}
            />
        </button>
    );
};

export default Toggle;
