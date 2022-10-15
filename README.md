# `<shaka-video>`

A custom element (web component) for [Shaka Player](https://github.com/shaka-project/shaka-player), which supports both HLS and DASH streaming protocols.

The element API matches the HTML5 `<video>` tag, so it can be easily swapped with other media, and be compatible with other UI components that work with the video tag, including [media chrome](https://www.media-chrome.org/).

## Example

```html
<html>
<head>
  <script type="module" src="https://unpkg.com/shaka-video-element@0.6"></script>
</head>
<body>

  <shaka-video controls src="https://stream.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe.m3u8"></shaka-video>

</body>
</html>
```

## Installing

`<shaka-video>` is packaged as a javascript module (es6) only, which is supported by all evergreen browsers and Node v12+.

### Loading into your HTML using `<script>`

Note the `type="module"`, that's important.

> Modules are always loaded asynchronously by the browser, so it's ok to load them in the head :thumbsup:, and best for registering web components quickly.

```html
<head>
  <script type="module" src="https://unpkg.com/shaka-video-element@0.6"></script>
</head>
```

### Adding to your app via `npm`

```bash
npm install shaka-video-element --save
```

Include in your app javascript (e.g. src/App.js)
```js
import 'shaka-video-element';
```
This will register the custom elements with the browser so they can be used as HTML.
