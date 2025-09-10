import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white'>
            <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">

                <div className="logo font-bold text-white text-2xl">
                    <span className='text-green-500'> &lt;</span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span>
                </div>

                <ul className="flex gap-4 cursor-pointer">
                    <li>
                        <Link to="/" className="hover:font-bold">Home</Link>
                    </li>
                    <li>
                        <Link to="/about" className="hover:font-bold">About</Link>
                    </li>
                    <li>
                        <Link to="/contact" className="hover:font-bold">Contact</Link>
                    </li>
                </ul>

                {/* GitHub Button */}
                <button className='text-white flex gap-2 bg-green-700 my-5 rounded-full justify-between items-center px-3 py-1'>
                    {/* Always visible GitHub logo */}
                    <img className='invert w-7 cursor-pointer' src="icons/github.svg" alt="Github Logo" />
                    
                    {/* Hidden on mobile, visible from md breakpoint */}
                    <span className='font-bold hover:text-lg cursor-pointer mr-2 hidden md:inline'>
                        GitHub
                    </span>
                </button>
            </div>
        </nav>
    )
}

export default Navbar
