import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PropTypes from 'prop-types';

function CommonBreadCrumbs({ breadcrumbs, separator }) {
  return (
    <Breadcrumbs separator={separator} aria-label="breadcrumb">
      {breadcrumbs.map((breadcrumb, index) => {
        if (breadcrumb.isLink) {
          return (
            <Link
              key={index}
              underline="hover"
              color="inherit"
              href={breadcrumb.href}
              onClick={breadcrumb.onClick}
            >
              {breadcrumb.label}
            </Link>
          );
        }
        return (
          <Typography key={index} sx={{ color: 'text.primary' }}>
            {breadcrumb.label}
          </Typography>
        );
      })}
    </Breadcrumbs>
  );
}

CommonBreadCrumbs.propTypes = {
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
      onClick: PropTypes.func,
      isLink: PropTypes.bool,
    })
  ).isRequired,
  separator: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

CommonBreadCrumbs.defaultProps = {
  separator: <NavigateNextIcon fontSize="small" />,
};

export default CommonBreadCrumbs;
