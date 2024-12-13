export default function Popover({ open, togglePopover, children, icon }) {
  return (
    <div className='relative flex items-center justify-center'>
      <button className='rounded-md bg-blue-500 p-2' onClick={togglePopover}>
        {icon}
      </button>
      <div
        className={`${open ? 'block' : 'hidden'} absolute top-12 rounded-md bg-white p-2 shadow-md`}
      >
        {children}
      </div>
    </div>
  );
}
