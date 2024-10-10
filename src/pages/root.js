import React from 'react'
import Navbar from '../components/nav'
import Footer from '../components/footer'
import '../styles/Root.css'
import { Outlet } from 'react-router-dom'


const Root = (props) => {
    console.log(`children ${props.children}`)
    return (
        <main>
            <Navbar />
            <div className="root-content">
                <Outlet />
            </div>
            <Footer />
        </main>
    )
}

export default Root