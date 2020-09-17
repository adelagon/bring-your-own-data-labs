import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


export default function SplashPage() {
    return (
        <div>
            <Typography variant="h6" id="tableTitle" component="div">Welcome to BYOD Validation Tool</Typography>
                <p>This tool will help you validate the corectness of your "Bring Your Own Data" for the workshop by doing the following checks
                <ul>
                    <li>Data size up to 3GB max</li>
                    <li>Check file type if CSV</li>
                    <li>Detect if there are any nested fields</li>
                    <li>Check headers</li>
                    <li>Potentially look for any PII data</li>
                </ul>
                </p>
                <p>
                    Undergoing Data Validation will also help you and your workshop conductors gain a better understanding of the types of data you have for a better workshop experience.
                </p>
                <p>
                    Now if you are ready please click <b>Proceed</b>
                </p>
                <Button variant="contained" color="primary" component={Link} to="/upload" style={{float: 'right'}}>Proceed</Button>
        </div>
    )
}
