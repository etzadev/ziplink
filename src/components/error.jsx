import PropTypes from "prop-types";

export const Error = ({ message }) => {
  return <span className="text-sm text-red-400">{message}</span>;
};

Error.propTypes = {
  message: PropTypes.string.isRequired,
};
