const SocialButton = ({ icon: Icon, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="w-16 h-16 flex items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md"
        >
            <Icon className="w-6 h-6 text-gray-700" />
        </button>
    );
};

export default SocialButton;
