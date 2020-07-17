/*
 * USING POLYMER LOAD FONT WEBCOMPONENT AS BOILERPLATE
 * WebComponent: https://www.webcomponents.org/element/@polymer/font-roboto
 * Source: https://github.com/PolymerElements/font-roboto/blob/master/roboto.js
 */

export { }; // ensure this file can only be parsed as a module.

/*
 * IMPORT ALL FONTS + DEFINE GLOBAL CSS VARIABLES
 * source: https://liist-fonts.imfast.io/css/load-liist-fonts.css
 */
const link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.crossOrigin = 'anonymous';
link.href = 'https://liist-fonts.imfast.io/css/load-liist-fonts.css';
document.head.appendChild(link);
