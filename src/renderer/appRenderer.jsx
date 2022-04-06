import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { inDev } from '@common/helpers';
import WindowFrame from '@misc/window/components/WindowFrame.jsx';
import Application from './components/Application';
import AppPage from '@renderer/App';

// Say something
console.log('[ERWT] : Renderer execution started');

// Application to Render
const app = (
  <WindowFrame title='ERWT Boilerplate' platform='windows'>
    <HashRouter>
      {/* <Application /> */}{/* //OK!*/}
      <AppPage />
    </HashRouter>
  </WindowFrame>
);

// Render application in DOM
ReactDOM.render(app, document.getElementById('app'));

// Hot module replacement
if (inDev() && module.hot) module.hot.accept();
