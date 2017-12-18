import React, { PureComponent } from 'react';
import { withPrefix } from 'gatsby-link';

import Link from '../Link';

import './Header.scss';

export default ({ currentNav, isTopNavVisible, isSideNavVisible, showTopNav, showSideNav, hideAllNavs, children }) => {
  const currentNavClassName = (isTopNavVisible || isSideNavVisible) ? 'current-nav hidden' : 'current-nav visible';
  const svgClassName = (isTopNavVisible || isSideNavVisible) ? 'close-button' : 'hamburger-button';
  const onClickSvg = (isTopNavVisible || isSideNavVisible) ? hideAllNavs : showTopNav;
  return (
    <div className='Header'>
      <div className='container'>
        <Link className='logo-link' to='/' onClick={hideAllNavs}>
          Hello
        </Link>
        <div className={currentNavClassName} onClick={showSideNav}>{currentNav ? currentNav.title : ''}</div>
        <svg className={svgClassName} width='27' height='30' onClick={onClickSvg}>
          <line x1='3' y1='5' x2='24' y2='25' />
          <line x1='3' y1='25' x2='24' y2='5' />
          <line x1='1' y1='6' x2='26' y2='6' />
          <line x1='1' y1='15' x2='26' y2='15' />
          <line x1='1' y1='24' x2='26' y2='24' />
        </svg>
        {children}
      </div>
    </div>
  );
};