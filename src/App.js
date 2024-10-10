import Index from './pages/index';
import Article from './pages/article';
import About from './pages/about';
import Login from './pages/login';
import SignUp from './pages/sign_up';
import BlogHome from './pages/blog_home';
import Contact from './pages/contact';
import Department from './pages/department';
import Category from './pages/category';
import Account from './pages/account';
import Root from './pages/root';
import ErrorPage from './pages/error';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

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
        path: "/signup",
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
        path: "/department",
        element: <Department />
      },
      {
        path: "/category",
        element: <Category />
      }
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;