import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import './App.css'
import About from './Component/About'
import Category from './Component/Category'
import Contact from './Component/Contact'
import HomePage from './Component/Home Page/Homepage'
import Product from './Component/Product'
import Rootlayout from './Root/Rootlayout'
import Login from "./Component/Home Page/Login"



const router = createBrowserRouter([

  {
    path: "/",
    element: <Rootlayout />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/About",
        element: <About />
      },
      {
        path: "/Category",
        element: <Category />
      },
      {
        path: "/Product",
        element: <Product />
      },
      {
        path: "/Contact us",
        element: <Contact />
      },
       {
        path: "/login",
        element: <Login />
      },
    ]
  }

]);
function App() {


  return (
    <>
      {/* <Header />

      <Header2 />
      <Navbar />

     <HomePage/> */}
      <RouterProvider router={router} />
    </>

  )
}

export default App
