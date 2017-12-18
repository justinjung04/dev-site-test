import React, { PureComponent } from 'react';
import { withPrefix } from 'gatsby-link';

import Link from '../Link';

import './CollapsibleNavLink.scss';

export default class CollapsibleNavLink extends PureComponent {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this.state = {
      isExpanded: false
    };
  }

  toggle() {
    this.setState(({ isExpanded }) => ({ isExpanded: !isExpanded }));
  }

  render() {
    const { nav, hideAllNavs } = this.props;
    const { isExpanded } = this.state;

    return (
      <div className='CollapsibleNavLink'>
        <div className='parent'>
          <Link to={nav.link} onClick={hideAllNavs} exact>{nav.title}</Link>
          <div className='toggleButton' onClick={this.toggle}>
            <svg width='12' height='10'>
              {isExpanded
                ? <path d='M1 7 L6 1 L11 7' />
                : <path d='M1 1 L6 7 L11 1' />
              }
            </svg>
          </div>
        </div>
        {isExpanded &&
          <div className='children'>
            {nav.childLinks.map((child, j) => (
              <Link key={j} to={child.link} onClick={hideAllNavs} exact>{child.title}</Link>
            ))}
          </div>
        }
      </div>
    );
  }
};