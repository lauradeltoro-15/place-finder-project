import React from 'react'

import { Link } from "react-router-dom"

import "./home-page.css"

const HomePage = () => {

    return (
        <main className="hero">
            <div>
            <h1 className="title">Great plans?</h1>
            <Link to="/signup" ><p className="btn btn-primary large">Find the perfect place for them</p></Link>
            </div>
            <div class="bottom-message">
                <p class="footer-text">Do you have a local to share?</p>
                <Link to="/signup" ><p className="btn btn-white">Join us</p></Link>
            </div>
            
        </main>
    )
}

export default HomePage