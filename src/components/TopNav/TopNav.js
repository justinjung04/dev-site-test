import React from 'react';

import Link from '../Link';

import './TopNav.scss';

export default ({ topNavs, isTopNavVisible, hideAllNavs }) => (
  <div className={`TopNav ${isTopNavVisible ? 'visible' : 'hidden'}`}>
    {topNavs.map((node, i) => (
      <Link key={i} to={node.link} exact={node.exact} onClick={hideAllNavs}>{node.title}</Link>
    ))}
  </div>
);