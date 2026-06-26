import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// react-router v6 dropped the `match`/`history` props that class components used
// to receive. This HOC re-injects the equivalent via hooks as a `router` prop.
export default function withRouter(WrappedComponent) {
  return function ComponentWithRouter(props) {
    const params = useParams();
    const navigate = useNavigate();
    return <WrappedComponent {...props} router={{ params, navigate }} />;
  };
}
