import PropTypes from "prop-types";

const InfoCard = ({ icon, bgColor, title, value }) => {
  return (
    <div className={`flex items-center border rounded-sm overflow-hidden shadow ${bgColor}`}>
      <div className="p-4">
        {icon}
      </div>
      <div className="px-4 text-gray-700">
        <h3 className="text-sm tracking-wider">{title}</h3>
        <p className="text-3xl">{value}</p>
      </div>
    </div>
  );
};

InfoCard.propTypes = {
  icon: PropTypes.node.isRequired,
  bgColor: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default InfoCard;
