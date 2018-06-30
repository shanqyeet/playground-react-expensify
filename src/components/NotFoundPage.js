import React from 'react';
import {Link} from 'react-router-dom';

const NotFoundPage = () => (
    <div>
        404!
        <h1>
            <Link to="/">Go Home</Link>
        </h1>
        
    </div>
);

export default NotFoundPage