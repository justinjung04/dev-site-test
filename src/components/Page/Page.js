import React from 'react';

import './Page.scss';

export default ({ hasSideNav, children }) => (
  <div className={`Page ${hasSideNav ? 'shrink' : ''}`}>
    {children}
  </div>
);