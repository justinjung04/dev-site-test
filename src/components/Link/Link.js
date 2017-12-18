import React from 'react';
import Link from 'gatsby-link';

import './Link.scss';

export default ({ className, to, exact, onClick, children }) => {
  if (to.indexOf('http') === 0) {
    return (
      <a className={`Link ${className || ''}`} href={to} target='_blank' onClick={onClick}>
        {children}
      </a>
    );  
  }
  return (
    <Link className={`Link ${className || ''}`} onClick={onClick} to={to} exact={exact} activeClassName='a'>
      {children}
    </Link>
  );
}