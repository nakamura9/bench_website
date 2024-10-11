import Index from './pages/index';
import Article from './pages/article';
import About from './pages/about';
import Login from './pages/login';
import SignUp from './pages/sign_up';
import BlogHome from './pages/blog_home';
import Contact from './pages/contact';
import Product from './pages/product';
import Department from './pages/department';
import Category from './pages/category';
import Account from './pages/account';
import Root from './pages/root';
import ErrorPage from './pages/error';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from './constants';
import Context from './utils/context';
import FAQ from './pages/faq';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Index />
      },
      {
        path: "/account",
        element: <Account />
      },
      {
        path: "/article",
        element: <Article />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/sign-up",
        element: <SignUp />
      },
      {
        path: "/blog",
        element: <BlogHome />
      },
      {
        path: "/blog/:id",
        element: <Article />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/department/:id",
        element: <Department />
      },
      {
        path: "/category/:id",
        element: <Category />
      },
      {
        path: "/product/:id",
        element: <Product />
      },
      {
        path: "/faq",
        element: <FAQ />
      }
    ]
  },
]);

function App() {
  const [account, setAccount] = useState(null)
  const [currency, setCurrency] = useState(null)
  const [currencies, setCurrencies] = useState([])
  const [departments, setDepartments] = useState([])
  const [hidePrices, setHidePrices] = useState(false)
  const [exchangeRate, setExchangeRate] = useState(1)
  const [message, setMessage] = useState("")
  const [show, setShow] = useState("")

  useEffect(() => {
    axios.get(`${BASE_URL}/index`)
      .then(r => {
        setHidePrices(r.data.settings.hide_prices)
        setCurrency(r.data.settings.default_currency)
        setCurrencies(r.data.settings.available_currencies)
        setDepartments(r.data.settings.departments)

        if(!account) {
            axios.get(`${BASE_URL}/account`)
              .then(res => {
                const data = res.data[0]
                setAccount(data)
              }).catch(err => {
                console.log(err)
              })
          }      
      })
    
  }, [])

  const toggle = () => {
    setShow(!show)
  }

  const renderMsg = (msg) => {
    setMessage(msg)
    setShow(true)
  } 


  return (<Context.Provider value={{
    account:account,
    setAccountDetails:setAccount,
    toggle: toggle,
    renderMessage: renderMsg,
    currency: currency,
    currencies: currencies,
    hidePrices: hidePrices,
    exchangeRate: exchangeRate,
    departments: departments,
    updateCurrency: setCurrency,
    updateExchangeRate: val => setExchangeRate(val),
  }}><RouterProvider router={router} />
  </Context.Provider>)
}

export default App;