import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import RouteConstants from '@navigator/RoutesConstants';

const ProtectedRoute = ({
  element: Component,
  authToken,
}) => {
  return authToken ? <Component /> : <Navigate to={RouteConstants.Login.path} />;
};

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
   authToken: PropTypes.any.isRequired,
}

const PublicRoute = ({
  element: Component,
  authToken,
}) => {
  return authToken ? <Navigate to={RouteConstants.Dashboard.path} /> : <Component/>;
};

PublicRoute.propTypes = {
  element: PropTypes.element.isRequired,
 authToken: PropTypes.any.isRequired,
}

export { ProtectedRoute, PublicRoute };
