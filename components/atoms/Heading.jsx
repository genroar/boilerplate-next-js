import PropTypes from "prop-types";

const Heading = ({ level, children }) => {
  const HeadingTag = `h${level}`;

  const getHeadingStyles = (level) => {
    switch (level) {
      case "1":
        return "xl:text-[36px] lg:text-[36px] md:text-[30px] sm:text-[25px] text-[17px] font-medium  text-customGray ";
      case "2":
        return "text-[32px] text-medium custom-gray ";
      case "3":
        return "text-[24px] text-medium text-gray-700 ";
      case "4":
        return "text-[20px] text-medium text-gray-700 ";
      case "5":
        return "xltext-[18px] lg:text-[18px] md:text-[18px] sm:text-[16px] text-medium text-gray-700 ";
      case "6":
        return "text-[15px] text-medium text-customGray1";
      default:
        return "text-lg";
    }
  };

  const headingStyles = getHeadingStyles(level);

  return <HeadingTag className={headingStyles}>{children}</HeadingTag>;
};

Heading.propTypes = {
  level: PropTypes.oneOf(["1", "2", "3", "4", "5", "6"]).isRequired,
};

export default Heading;