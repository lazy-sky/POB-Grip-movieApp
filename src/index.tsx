import './styles/index.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import reportWebVitals from './reportWebVitals';
import Routes from './routes';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  /*
    memo: react-beautiful-dnd의 이슈로 인해 development mode에서는
    StrictMode를 해제해야 드래그 앤 드롭 기능이 정상적으로 작동한다.
    production mode에선 문제가 없으니 개발 작업 중에만 StrictMode를 해제하면 된다.
  */
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
