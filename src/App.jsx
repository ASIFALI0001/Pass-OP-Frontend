import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Manager />
          </main>
          <Footer />
        </div>
      )
    },
    {
      path: "/about",
      element: <><Navbar /><About /><Footer /></>
    },
    {
      path: "/contact",
      element: <><Navbar /><Contact /><Footer /></>
    },

  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
