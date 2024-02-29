import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Networks from './views/Networks';
// import Liquidity from './views/Liquidity';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/networks" element={<Networks />} />
        {/* <Route path="/liquidity/:addressParam" element={<Liquidity />} /> */}
        <Route path="/" element={<App />} />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
