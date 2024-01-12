import React, { useState } from "react";
import '../styles/Finder.css';

function getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
}

function Finder() {
    const [tab, setTab] = useState('byName');
    function handleTab(tabName) {
        if (tabName !== tab) {
            setResult("");
        }
        setTab(tabName);
    }

    const [result, setResult] = useState("");
    const getMealByName = (event) => {
        event.preventDefault();
        const mealName = event.target.elements.mealname.value;
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
            .then(res => res.json())
            .then(data => {
                if (data.meals == null || data.meals.length === 0) {
                    setResult("notFound");
                } else {
                    setResult(["ByName",data.meals[0]]);
                    console.log(result)
                }
            })
    };
    const getMealByMainIngredient = (event) => {
        event.preventDefault();
        const mainingredient = event.target.elements.mainingredient.value;
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mainingredient}`)
            .then(res => res.json())
            .then(data => {
                if (data.meals == null || data.meals.length === 0) {
                    setResult("notFound");
                } else {
                    const randomIndex = Math.floor(Math.random() * data.meals.length);
                    const randomMeal = data.meals[randomIndex].idMeal;
                    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${randomMeal}`)
                        .then(res => res.json())
                        .then(data => {
                            setResult(["ByMainIngredients", data.meals[0]]);
                        })
                }
            })
    }
    const getMealByArea = (event) =>{
        event.preventDefault();
        const area = event.target.elements.mealArea.value;
        console.log(area);
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
            .then(res => res.json())
            .then(data => {
                if (data.meals == null || data.meals.length === 0) {
                    setResult(["notFound"]);
                } else {
                    const randomIndex = Math.floor(Math.random() * data.meals.length);
                    const randomMeal = data.meals[randomIndex].idMeal;
                    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${randomMeal}`)
                        .then(res => res.json())
                        .then(data => {
                            setResult(["ByArea", data.meals[0]]);
                        })
                }
        })
    }


    const [instructions, setInstructions] = useState(null);
    const showInstructions = (event) => {
        event.preventDefault();
        if (instructions === null) {
            const mealName = result[1].strMeal;
            const mealIngredients = [];
            for (let i = 1; i <= 20; i++) {
                if (result[1][`strIngredient${i}`]) {
                    mealIngredients.push(result[1][`strIngredient${i}`]);
                } else {
                    break;
                }
            } 
            const mealMeasurements = [];
            for (let i = 1; i <= 20; i++) {
                if (result[1][`strMeasure${i}`]) {
                    mealMeasurements.push(result[1][`strMeasure${i}`]);
                } else {
                    break;
                }
            }
            const mealVideo = result[1].strYoutube;
            const mealId = getId(mealVideo);
            const videoEmbed = `//www.youtube.com/embed/${mealId}`;
            setInstructions([mealName, mealIngredients, videoEmbed]);
        } else{
            setInstructions(null);
        }

    }

    return (
        <div className="finder-div">

            <div className="tab-finder-container">
                <div className="headers-finder-hero">
                    <div className="headers-finder">
                        <div onClick={() => handleTab("byName")} className={`header-finder ${tab === 'byName' ? 'active-header-finder' : 'inactive-header-finder'}`}>By Name</div>
                        <div onClick={() => handleTab("bymainingredient")} className={`header-finder ${tab === 'bymainingredient' ? 'active-header-finder' : 'inactive-header-finder'}`}>By Main-Ingredient</div>
                        <div onClick={() => handleTab("byarea")} className={`header-finder ${tab === 'byarea' ? 'active-header-finder' : 'inactive-header-finder'}`}>By Area</div>
                    </div>
                </div>

                <div className="tabs">
                    <br/><br/>
                    <div className={`tab-finder ${tab === 'byName' ? 'active-tab-finder' : 'inactive-tab-finder'}`}>
                        <form onSubmit={getMealByName}>
                            <input type="text" placeholder="Enter a meal name..." name="mealname" required/><br/>
                            <button type="submit"><i class="bi bi-search"></i> | Search</button>
                        </form>
                        <div>
                            {result[0] === "ByName"  ? (
                                <div className="result">
                                    <div className="flex">
                                        <div>
                                            <p>{result[1].strMeal}</p>
                                            <p>Nationality: {result[1].strArea}</p>
                                            <p>Category: {result[1].strCategory}</p>
                                            
                                        </div>  
                                        <div>
                                            <img src={result[1].strMealThumb} alt="meal" width="100px" />
                                        </div>
                                    </div>
                                    <button onClick={showInstructions}><i class="bi bi-eye"></i> | See Instructions</button>
                                </div>
                            ): (
                                <></>
                            )}
                            {result === "notFound" ? (
                                <div id="result">
                                    <p>No result was found!</p>
                                </div>
                            ): (
                                <></>
                            )}
                        </div>
                    </div>
                    <div className={`tab-finder ${tab === 'bymainingredient' ? 'active-tab-finder' : 'inactive-tab-finder'}`}>
                        <div className="search">
                            <form onSubmit={getMealByMainIngredient}>
                                <input type="text" name="mainingredient" placeholder="Enter a main ingredient..." required/><br/>
                                <button type="submit"><i class="bi bi-search"></i> | Search</button>
                            </form>
                            {result[0] === "ByMainIngredients"  ? (
                                <div className="result">
                                    <div className="flex">
                                        <div>
                                            <p>{result[1].strMeal}</p>
                                            <p>Nationality: {result[1].strArea}</p>
                                            <p>Category: {result[1].strCategory}</p>
                                            
                                        </div>  
                                        <div>
                                            <img src={result[1].strMealThumb} alt="meal" width="100px" />
                                        </div>
                                    </div>
                                    <button onClick={showInstructions}><i class="bi bi-eye"></i> | See Instructions</button>
                                </div>
                            ): (
                                <></>
                            )}
                            {result === "notFound" ? (
                                <div id="result">
                                    <p>No result was found!</p>
                                </div>
                            ): (
                                <></>
                            )}
                        </div>
                    </div>
                    <div className={`tab-finder ${tab === 'byarea' ? 'active-tab-finder' : 'inactive-tab-finder'}`}>
                        <div className="search">
                            <form onSubmit={getMealByArea}>
                                <input type="text" name="mealArea" placeholder="Enter a country..." required/><br/>
                                <button type="submit"><i class="bi bi-search"></i> | Search</button>
                            </form>
                            {result[0] === "ByArea" ? (
                                <div className="result">
                                    
                                    <div className="flex">
                                        <div>
                                            <p>{result[1].strMeal}</p>
                                            <p>Nationality: {result[1].strArea}</p>
                                            <p>Category: {result[1].strCategory}</p>
                                            
                                        </div>  
                                        <div>
                                            <img src={result[1].strMealThumb} alt="meal" width="100px" />
                                        </div>
                                    </div>
                                    <button onClick={showInstructions}><i class="bi bi-eye"></i> | See Instructions</button>
                                </div>
                            ): (
                                <></>
                            )}
                            {result[0] === "notFound" ? (
                                <div id="result">
                                    <p>No result was found!</p>
                                </div>
                            ): (
                                <></>
                            )}
                        </div>
                           
                    </div>
                    <br/><br/>
                </div>
            </div>

            <div className={instructions !== null ? "active-instructions" : "inactive-instructions"}>
                    {instructions !== null ? (
                        <div>
                            <p>Instructions for: {instructions[0]}</p>
                            <div>
                                <div>
                                    <p>Needed ingredients:</p>
                                    <ul>
                                        {instructions[1].join(", ")}

                                    </ul>
                                </div>
                                <div>
                                    <p>Instructions:</p>
                                    <iframe title="Youtube Video Instructions" width="560" height="315" src={instructions[2]} frameborder="0" allowfullscreen></iframe>
                                </div><br/>
                                <button className="closeBtn" onClick={showInstructions}><i class="bi bi-x-square-fill"></i></button><br/>
                            </div>
                        </div>  
                    ): (
                        <></>
                    )}
            </div>

        </div>
    );

}

export default Finder;

