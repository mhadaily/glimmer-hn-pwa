import App from './main';
import { ComponentManager, setPropertyDidChange } from '@glimmer/component';
import 'regenerator-runtime/runtime';

const app = new App();
const containerElement = document.getElementById('app');

setPropertyDidChange(() => {
  app.scheduleRerender();
});

app.registerInitializer({
  initialize(registry) {
    registry.register(`component-manager:/${app.rootName}/component-managers/main`, ComponentManager);
  },
});

app.renderComponent('glimmer-hn-pwa', containerElement, null);

requestAnimationFrame(() => {
  performance.mark('beforeRender');
  app.boot();
  performance.mark('afterRender');
  requestAnimationFrame(() => {
    performance.mark('afterPaint');
    setTimeout(() => {
      performance.measure('download-parse-compile', 'beforeRender', 'afterRender');
      performance.measure('render', 'beforeRender', 'afterRender');
      performance.measure('paint', 'afterRender', 'afterPaint');
    }, 100);
  });
});
