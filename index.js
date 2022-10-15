import CustomVideoElement from 'custom-video-element';
import shaka from 'shaka-player';

function onErrorEvent(event) {
  // Extract the shaka.util.Error object from the event.
  onError(event.detail);
}

function onError(error) {
  // Log the error.
  console.error('Error code', error.code, 'object', error);
}

class ShakaVideoElement extends CustomVideoElement {
  constructor() {
    super();
    this.player = null;

    if (shaka.Player.isBrowserSupported()) {
      this.player = new shaka.Player(this.nativeEl);

      // Listen for error events.
      this.player.addEventListener('error', onErrorEvent);

    } else {
      // This browser does not have the minimum set of APIs we need.
      console.error('Browser does not support Shaka Player');
    }
  }

  get src() {
    // Use the attribute value as the source of truth.
    // No need to store it in two places.
    // This avoids needing a to read the attribute initially and update the src.
    return this.getAttribute('src');
  }

  set src(val) {
    // If being set by attributeChangedCallback,
    // dont' cause an infinite loop
    if (val !== this.src) {
      this.setAttribute('src', val);
    }
  }

  async load() {
    // Try to load a manifest.
    // This is an asynchronous process.
    try {
      await this.player.load(this.src);
      // This runs if the asynchronous load is successful.
      console.log('The video has now been loaded!');
    } catch (e) {
      // onError is executed if the asynchronous load fails.
      onError(e);
    }
  }

  connectedCallback() {
    if (this.src) {
      this.load();
    }

    // Not preloading might require faking the play() promise
    // so that you can call play(), call load() within that
    // But wait until MANIFEST_PARSED to actually call play()
    // on the nativeEl.
    // if (this.preload === 'auto') {
    //   this.load();
    // }
  }
}

if (!window.customElements.get('shaka-video')) {
  window.customElements.define('shaka-video', ShakaVideoElement);
  window.ShakaVideoElement = ShakaVideoElement;
}

export default ShakaVideoElement;
