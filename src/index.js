import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "@fortawesome/fontawesome-svg-core/styles.css"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { faHome, faSearch, faFilter, faEllipsisV, faBars,
   faAngleLeft, faAngleRight, faShoppingCart, faHeart,
   faAt, faPhone, faQuestion, faList, faFile, faStar, faUser, faImage } from "@fortawesome/free-solid-svg-icons"

library.add(faHome, faSearch, faFilter, faBars, faEllipsisV, 
    fab, faAngleLeft, faAngleRight, faHeart, faShoppingCart,
    faAt, faPhone, faQuestion, faList, faFile, faStar, faUser, faImage)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
