export default function Popover({open, togglePopover, children, icon}){
    return (
        <div className="relative flex justify-center items-center">
            <button className="bg-blue-500 rounded-md p-2" onClick={togglePopover}>
                {icon}
            </button>
            <div className={`${ open ? "block" : "hidden" } absolute top-12 p-2 rounded-md bg-white shadow-md`}>
                {children}
            </div>
        </div>
    );
}
