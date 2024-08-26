import { useEffect } from "react";
import PropTypes from "prop-types";

function PageTitle({ title }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageTitle;
