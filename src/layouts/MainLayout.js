import React, { PureComponent } from 'react';
import { withPrefix } from 'gatsby-link';
import Helmet from 'react-helmet';
import ScrollBehaviour from 'scroll-behavior';

import Header from '../components/Header';
import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';
import Page from '../components/Page';
import Footer from '../components/Footer';

import '../static/prism.css';
import './MainLayout.scss';

ScrollBehaviour.prototype.scrollToTarget = () => {};

export default class MainLayout extends PureComponent {
  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
    this.showTopNav = this.showTopNav.bind(this);
    this.showSideNav = this.showSideNav.bind(this);
    this.hideAllNavs = this.hideAllNavs.bind(this);
    this.key = null;
    this.state = {
      topNavs: [],
      sideNavs: [],
      previousNav: null,
      currentNav: null,
      nextNav: null,
      isTopNavVisible: false,
      isSideNavVisible: false
    };
  }

  componentDidMount() {
    this.getNavs(this.props);

    this.unlisten = this.props.history.listen((location, action) => {
      if (location.key) {
        this.key = location.key;
        if (action === 'PUSH') {
          if (!location.hash) {
            this.bodyRef.scrollTop = 0;
          }
        } else if (action === 'POP') {
          this.bodyRef.scrollTop = sessionStorage['@scroll|' + this.key];
        }
      } else {
        this.props.history.replace(location.pathname + location.hash);
      }
    });

    if (this.props.location.key) {
      this.key = this.props.location.key;
    } else {
      if (this.props.location.hash) {
        document.getElementById(this.props.location.hash.slice(1)).scrollIntoView();
      }
      this.props.history.replace(this.props.location.pathname + this.props.location.hash);
    }
  }

  componentWillReceiveProps(props) {
    this.getNavs(props);
  }

  componentWillUnmount() {
    this.unlisten();
  }

  getNavs(props) {
    const { data, location, children, history } = props;
    const { pathname } = location;

    let topNavs = [];
    let topNavMatchLength = 0;
    data.allTopNavYaml.edges.forEach(({ node }) => {
      const url = node.id.split(/src\/pages|\/top-nav.yaml/)[1];
      if (pathname.indexOf(withPrefix(url)) === 0 && withPrefix(url).length >= topNavMatchLength) {
        if (withPrefix(url).length > topNavMatchLength) {
          topNavs = [];
          topNavMatchLength = withPrefix(url).length;
        }
        node.exact = node.link === '/android' || node.link === '/ios' || node.link === '/webviewer';
        topNavs.push(node);
      }
    });

    let sideNavs = [];
    let sideNavMatchLength = 0;
    data.allSideNavYaml.edges.forEach(({ node }) => {
      const url = node.id.split(/src\/pages|\/side-nav.yaml/)[1];
      if (pathname.indexOf(withPrefix(url)) === 0 && withPrefix(url).length >= sideNavMatchLength) {
        if (withPrefix(url).length > sideNavMatchLength) {
          sideNavs = [];
          sideNavMatchLength = withPrefix(url).length;
        }
        node.exact = node.link === '/android' || node.link === '/ios' || node.link === '/webviewer';
        sideNavs.push(node);
      }
    });

    let previousNav, currentNav, nextNav;
    for (let i=0; i<sideNavs.length; i++) {
      if (withPrefix(sideNavs[i].link) === location.pathname || withPrefix(sideNavs[i].link) + '/' === location.pathname) {
        currentNav = sideNavs[i];
        let previousIndex = i - 1;
        let nextIndex = i + 1;
        while (previousIndex > -1) {
          if (sideNavs[previousIndex].title && sideNavs[previousIndex].link){
            previousNav = sideNavs[previousIndex];
            break;
          }
          previousIndex--;
        }
        while (nextIndex < sideNavs.length) {
          if (sideNavs[nextIndex].title && sideNavs[nextIndex].link){
            nextNav = sideNavs[nextIndex];
            break;
          }
          nextIndex++;
        }
        break;
      }
    }

    this.setState({ topNavs, sideNavs, previousNav, currentNav, nextNav });
  }

  onScroll(e) {
    sessionStorage['@scroll|' + this.key] = e.target.scrollTop;
  }

  showTopNav() {
    this.setState({ isTopNavVisible: true });
  }

  showSideNav() {
    this.setState(({ isSideNavVisible }) => ({ isSideNavVisible: !isSideNavVisible }));
  }

  hideAllNavs() {
    this.setState({ isTopNavVisible: false, isSideNavVisible: false });
  }

  render() {
    const { children, history, location } = this.props;
    const { topNavs, sideNavs, previousNav, currentNav, nextNav, isTopNavVisible, isSideNavVisible } = this.state;

    return (
      <div className='MainLayout'>
        <Helmet>
          <title>PDFTron Systems Inc.</title>
          <meta charset='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=yes' />
          <meta name='twitter:site' content='@pdftron' />
          <meta name='og:type' content='website' />
          <meta name='og:site_name' content='PDFTron Systems Inc.' />
        </Helmet>
        <Header currentNav={currentNav} isTopNavVisible={isTopNavVisible} isSideNavVisible={isSideNavVisible} showTopNav={this.showTopNav} showSideNav={this.showSideNav} hideAllNavs={this.hideAllNavs}>
          <TopNav topNavs={topNavs} isTopNavVisible={isTopNavVisible} hideAllNavs={this.hideAllNavs} />
        </Header>
        <div className='body' ref={r => this.bodyRef = r} onScroll={this.onScroll}>
          <div className='container'>
            <SideNav sideNavs={sideNavs} isSideNavVisible={isSideNavVisible} hideAllNavs={this.hideAllNavs}/>
            <Page history={history} location={location} hasSideNav={sideNavs.length}>
              {children()}
              {(previousNav || nextNav) &&
                <Footer previousNav={previousNav} nextNav={nextNav} />
              }
            </Page>
          </div>
        </div>
      </div>
    );
  }
};

export const query = graphql`
  query MainLayoutQuery {
    allTopNavYaml {
      edges {
        node {
          id
          title
          link
        }
      }
    }
    allSideNavYaml {
      edges {
        node {
          id
          header
          title
          link
        }
      }
    }
  }
`;