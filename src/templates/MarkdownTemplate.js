import React, { PureComponent } from "react";
import { withPrefix } from 'gatsby-link';

import Link from '../components/Link';
import Footer from '../components/Footer';

import './MarkdownTemplate.scss';

export default class MarkdownTemplate extends PureComponent {
  constructor(props) {
    super(props);
    // const languagesString = props.data.markdownRemark.frontmatter.languages;
    let selectedLanguage = '';
    this.langauges = null;
    // if (languagesString) {
    //   this.languages = languagesString.split('|');
    //   selectedLanguage = this.languages[0];
    //   const value = "; " + document.cookie;
    //   const parts = value.split('; selectedLanguage=');
    //   if (parts.length === 2) {
    //     const cookieLanguage = parts.pop().split(";").shift();
    //     if (this.languages.indexOf(cookieLanguage) > -1) {
    //       selectedLanguage = cookieLanguage;
    //     }
    //   }
    // }
    this.state = {
      selectedLanguage
    };
  }

  componentDidMount() {
    if (this.languages) {
      document.querySelectorAll('[class^="language-"]').forEach(element => {
        const switcher = document.createElement('div');
        switcher.className = 'switcher';
        switcher.style.padding = '10px 0 5px 0';
        this.languages.forEach(language => {
          const span = document.createElement('span');
          span.style.padding = '10px';
          if (element.className === 'language-' + language) {
            span.style.background = '#fafafa';
          }
          span.style.cursor = 'pointer';
          span.addEventListener('click', () => {
            document.cookie = 'selectedLanguage=' + language + ';';
            this.setState({ selectedLanguage: language });
          });
          span.innerHTML = language;
          switcher.append(span);
        });
        element.style.marginTop = 0;
        element.parentElement.prepend(switcher);
        if (element.className === 'language-' + this.state.selectedLanguage) {
          element.parentElement.style.display = 'block';
        } else {
          element.parentElement.style.display = 'none';
        }
      });
    }
  }

  componentDidUpdate() {
    if (this.languages) {
      document.querySelectorAll('[class^="language-"]').forEach(element => {
        if (element.className === 'language-' + this.state.selectedLanguage) {
          element.parentElement.style.display = 'block';
        } else {
          element.parentElement.style.display = 'none';
        }
      });
    }
  }

  render() {
    const { data, location } = this.props;
    const { selectedLanguage } = this.state;
    const { markdownRemark } = data;

    return (
      <div className='MarkdownTemplate'>
        {markdownRemark.frontmatter.title &&
          <h1 className='title'>{markdownRemark.frontmatter.title}</h1>
        }
        <div className={`markdown-body ${selectedLanguage}`} dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
      </div>
    );
  }
};

export const query = graphql`
  query MarkdownTemplateQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;