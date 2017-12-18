import React, { PureComponent } from 'react';
import { withPrefix } from 'gatsby-link';

import Link from '../Link';

import './Footer.scss';

export default ({ previousNav, nextNav }) =>  (
  <div className='Footer'>
    <div className='previous'>
      {previousNav &&
        <Link to={previousNav.link} exact>
          <div>←</div>
          <div>{previousNav.title}</div>
        </Link>
      }
    </div>
    <div className='next'>
      {nextNav &&
        <Link to={nextNav.link} exact>
          <div>{nextNav.title}</div>
          <div>→</div>
        </Link>
      }
    </div>
  </div>
);