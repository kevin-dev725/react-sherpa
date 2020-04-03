import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setPath } from '../store/Nav/actions';
import ErrorBoundary from '../components/ErrorBoundary';

export const ProtectedRoute = props => {
  const dispatch = useDispatch();
  const { is_auth, path, component } = props;

  if (is_auth) {
    return <ErrorBoundary><Route path={path} component={component} onClick={() => dispatch(setPath(path))} /></ErrorBoundary>;
  }

  return <Redirect to="/login" />;
};
