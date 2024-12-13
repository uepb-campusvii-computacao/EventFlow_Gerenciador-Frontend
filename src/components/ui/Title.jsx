import PropTypes from 'prop-types';

const Title = ({ title }) => {
  return (
    <div>
      <h1 className='mb-5 mt-5 text-center text-4xl font-extrabold text-white'>
        {title}
      </h1>
    </div>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;
