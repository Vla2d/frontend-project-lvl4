import React from 'react';

function Container({ children }) {
  return <div className="d-flex flex-column h-100">{children}</div>;
}

export default Container;
