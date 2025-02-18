export const ButtonAction = ({ onClick, children, buttonType = "button"}) => (
    <button
        type={buttonType}
        className="border py-2 px-4 bg-gray-100 rounded-xl font-medium hover:bg-gray-200"
        onClick={onClick}
    >
        {children}
    </button>
);

export const ButtonPrimary = ({ onClick, children, buttonType }) => (
    <button
        type={buttonType}
        className="border border-gray-400 font-medium rounded p-2"
        onClick={onClick}
    >
        {children}
    </button>
);
