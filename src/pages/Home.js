import React from 'react';
import '../styles/Home.css';
import { NavLink } from 'react-router-dom';

function Home(){
    return (
        <div>
            <div className='hero'>
                <div className='heroText'>
                    <h2>RecipeForYou</h2>
                    <p>Find the perfect recipe for you!</p>
                    <NavLink to='/finder'>Find out more!</NavLink>                         
                </div>

            </div>

        </div>
    )
}

export default Home;