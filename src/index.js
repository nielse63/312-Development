
import { h, render } from 'preact';
import style from './style/index.scss';

let root;
function init() {
	const App = require('./components/app').default;
	root = render(
    <App
      cssclass={style.main}
      readyclass={style.ready}
      doneclass={style.complete}
      loadingclass={style.loading}
    />,
    document.body, root
  );
}

init();

if (module.hot) {
	require('preact/devtools');
	module.hot.accept('./components/app', () => requestAnimationFrame(init));
}
