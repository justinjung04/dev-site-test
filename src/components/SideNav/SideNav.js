import React from 'react';
import { withPrefix } from 'gatsby-link';

import Link from '../Link';
import CollapsibleNavLink from '../CollapsibleNavLink';

import './SideNav.scss';

export default ({ sideNavs, isSideNavVisible, hideAllNavs }) => {
  const desktopVisibility = sideNavs.length ? 'visible-desktop' : 'hidden-desktop';
  const mobileVisibility = isSideNavVisible ? 'visible-mobile' : 'hidden-mobile';

  return (
    <div className={`SideNav ${desktopVisibility} ${mobileVisibility}`}>
      {sideNavs.map((nav, i) => {
        if (nav.header) {
          return <div key={i} className='header'>{nav.header}</div>;
        } else if (nav.childLinks) {
          return <CollapsibleNavLink key={i} nav={nav} hideAllNavs={hideAllNavs} />;
        }
        return <Link key={i} to={nav.link} onClick={hideAllNavs} exact>{nav.title}</Link>;
      })}
    </div>
  );
};