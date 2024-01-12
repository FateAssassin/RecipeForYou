import React from "react";
import '../styles/About.css';
import { useState } from "react";



function About(){
    const [tab, setTab] = useState('RecipeForYou');
    function handleTab(tabName){
        setTab(tabName);
    }

    return (
        <div className='heroAbout'>
            <div className="heroText">
                <h2>About</h2>
                <div className="header">
                    <div onClick={() => handleTab('RecipeForYou')} className={`${tab === 'RecipeForYou' ? 'active-header' : 'inactive-header'}`}>RecipeForYou</div>
                    <div onClick={() => handleTab('FateAssassin')} className={`${tab === 'FateAssassin' ? 'active-header' : 'inactive-header'}`}>FateAssassin</div>
                </div>  
                <br/>
                <div className="tabs-about">
                    <div className="tab-container-about">

                        <div className={`tab ${tab === 'RecipeForYou' ? 'active-tab' : 'inactive-tab'}`}>
                            <h2>RecipeForYou</h2>
                            <p>RecipeForYou is a web application that allows users to search for recipes <br/> by multiple factors.</p>
                        </div>
                        <div className={`tab ${tab === 'FateAssassin' ? 'active-tab' : 'inactive-tab'}`}>
                            <h2>FateAssassin</h2>
                            <p>I am FateAssassin and I am a Freelancer.<br/>Click <a href="https://github.com/fateassassin">here</a> to learn more about me.</p>
                        </div>

                    </div>
                </div>  
            </div>
        </div>
    )
}

export default About;