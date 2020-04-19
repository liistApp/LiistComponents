# Liist Webcomponents

This webcomponent library follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation
```bash
npm i liist-webcomponents
```

## Usage
```html
<script type="module">
  import 'liist-webcomponents/liist-bttn.js';
</script>
<liist-bttn text="hello button" faSpec="fas fa-envelope"></liist-bttn>
```

## Demoing with Storybook
To run a local instance of Storybook for your components, run
```bash
npm run storybook
```

To build a production version of Storybook, run
```bash
npm run storybook:build
```
## Deployment and auto build with Netlify

The storybook is automatically build and deployed with Netlify, whenever there is a new commit to master. It is hosted here: https://serene-keller-d1ba70.netlify.app/?path=/docs

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `es-dev-server`
```bash
npm start
```
To run a local development server that serves the basic demo located in `demo/index.html`
