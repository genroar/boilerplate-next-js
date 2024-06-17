import PropTypes from 'prop-types';

const AnchorTag = ({ href, children }) => {
  
  const anchorStyle = "cursor-pointer text-[16px] font-normal text-gray-700 text-opacity-50  "
  
  return (
    <a className={anchorStyle} href={href}>{children}</a>
  )
}

AnchorTag.propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired
}

export default AnchorTag