// import { Navigate, useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { selectIsAuthenticated, selectRole } from '../features/auth/authSlice';

// export const ProtectedRoute = ({ children, allowedRoles = [], requireAuth = true }) => {
//   const isAuthenticated = useSelector(selectIsAuthenticated);
//   const role = useSelector(selectRole);
//   const location = useLocation();

//   console.log(`Is Autheniticated ${isAuthenticated}`);
//   console.log(`The Role There ${role}`);

//   // If authentication is required but user is not authenticated, redirect to login
//   if (requireAuth && !isAuthenticated) {
//     return <Navigate to="/signup" state={{ from: location }} replace />;
//   }

//   // If user is authenticated but tries to access auth pages, redirect to dashboard
//   if (!requireAuth && isAuthenticated) {
//     const redirectTo = role ? `/${role}/dashboard` : '/';
//     return <Navigate to={redirectTo} replace />;
//   }

//   // If role-based access is required and user's role is not allowed
//   if (allowedRoles.length > 1 && !allowedRoles.includes(role)) {
//     return <Navigate to="/access-denied" replace />;
//   }

//   return children;
// };



import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated, selectRole, setAuthFromStorage , selectLoading} from '../features/auth/authSlice';
import { useEffect, useState } from 'react';

export const ProtectedRoute = ({ allowedRoles = [], requireAuth = true, children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectLoading)
  const role = useSelector(selectRole);
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  // Check for stored auth data on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    
    if (token && storedRole && !isAuthenticated) {
      dispatch(setAuthFromStorage());
    }
    setInitialized(true);
  }, [dispatch, isAuthenticated]);

  if (!initialized || loading) {
    return <div>Loading...</div>; // We Wiil Replace This custom loading component
  }

  // If authentication is required but user is not authenticated, redirect to login
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is authenticated but tries to access auth pages, redirect to dashboard
  if (!requireAuth && isAuthenticated) {
    const redirectPath = role ? `/${role}/dashboard` : '/';
    return <Navigate to={redirectPath} replace />;
  }

  // If role-based access is required and user's role is not allowed
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/access-denied" replace />;
  }

  // If using React Router v6.4+ with data APIs, use Outlet
  // Otherwise, use children
  return children ? children : <Outlet />;
};