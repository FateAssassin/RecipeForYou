import React from 'react';
import { Helmet } from 'react-helmet';

class Application extends React.Component {
    render () {
        return (
            <div>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>RecipeForYou</title>
                    <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/2771/2771401.png" />
                </Helmet>
            </div>
        );
    }
}

export default Application;