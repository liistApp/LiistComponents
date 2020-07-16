/*
 * USING POLYMER LOAD FONT WEBCOMPONENT AS BOILERPLATE
 * WebComponent: https://www.webcomponents.org/element/@polymer/font-roboto
 * Source: https://github.com/PolymerElements/font-roboto/blob/master/roboto.js
 */

export { }; // ensure this file can only be parsed as a module.

/*
 * IMPORT ALL FONTS
 * source: https://liistwebfonts.imfast.io/css/import-fonts.css
 */
const link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.crossOrigin = 'anonymous';
link.href = 'https://liistwebfonts.imfast.io/css/import-fonts.css';
document.head.appendChild(link);

/*
 * DEFINE FONTS AS CSS VARIABLES
 * source: https://liistwebfonts.imfast.io/css/define-fonts.css
 */
const link2 = document.createElement('link');
link2.rel = 'stylesheet';
link2.type = 'text/css';
link2.crossOrigin = 'anonymous';
link2.href = 'https://liistwebfonts.imfast.io/css/define-fonts.css';
document.head.appendChild(link2);
