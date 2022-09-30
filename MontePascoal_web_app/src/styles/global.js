import 'react-toastify/dist/ReactToastify.css';
import { createGlobalStyle } from 'styled-components';
import media from 'styled-query';

export default createGlobalStyle`
  /* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
  */
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  :root {
    --primary   : #14A498;
    --primary-hover : #1dd4ca;
    --secondary : #FFFFFF;
    
    /* System */
    --white      : #FFF;
    --background : #FEFEFE;
    --gray-line  : #DCDDE0;

    /* Texts */
    --text   : #000000;
    --text_1 : #545454;
    --text_2 : #7C7C7C;
    --text_3 : #939393;

    /* Components */
    --active    : #146CA4;
    --entered   : #939393;
    --default   : #DCDDE0;
    --disabled  : #EFEFEF;

    /* Alerts */
    --success   : #28A745;
    --success-hover   : #33de5a;
    --error     : #C23234;
    --warnings  : #FFC107;
    
    /* Others */
    --red   : #A41414;
    --red-hover   : #EB3333;
    --blue  : #146CA4;
    --blue-hover  : #1EAFDE;
    --green : #14A498;
    --green-hover : #00E8DB;
  }

  html {
    ${media.lessThan('1080px')`
      font-size: 93.75%;
      // default: 16px
      // 16 x 0.9375 = 15px
    `}
    ${media.lessThan('720px')`
      font-size: 87.5%;
    `}
  }

  body {
    background: var(--background);
    color: var(--text);
    -webkit-font-smoothing: antialiased !important;
    font-size: 16px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
  }

  button {
    cursor: pointer;
  }

  a {
    display: inline-flex;
    color: inherit;
    text-decoration: none;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    color: var(--text);
  }

  span, label, p, a, small {
    color: var(--text);
  }

  small {
    font-size: smaller;
  }

  h1 { font-size: 60px }
  h2 { font-size: 45px }
  h3 { font-size: 30px }
  h4 { font-size: 25px }
  h5 { font-size: 20px }
  h6 { font-size: 18px }

/* Customize Scrool */
::-webkit-scrollbar {
  width: 7px;
}

::-webkit-scrollbar-track {
  -webkit-border-radius: 10px;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  -webkit-border-radius: 10px;
  border-radius: 10px;
  background: var(--primary);
}

  .downloadLink {
    position: absolute;
    pointer-events: none;
  }

`;