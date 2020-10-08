import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


export default function SplashPage() {
    return (
        <div>
            <Typography variant="h6" id="tableTitle" component="div">Welcome to the BYOD Validation Tool</Typography>
                <span>This tool will help you validate the correctness of your "Bring Your Own Data" for the workshop by doing the following checks
                <ul>
                    <li key="1">File size within 3GB</li>
                    <li key="2">File is in UTF-8 encoding format</li>
                    <li key="3">File has a header</li>
                    <li key="4">Header has valid column names</li>
                </ul>
                </span>
                <span>This tool can also provide additional insights by giving you an option to run a *Data Profiling* job.</span>
                <br/>
                <br/>
                <span>
                    Undergoing Data Validation will also help you and your workshop conductors gain a better understanding of the types of data you have for a better workshop experience.
                </span>
                <span>
                    Now if you are ready please click <b>Proceed</b>
                </span>
                <br/>
                <Button variant="contained" color="primary" component={Link} to="/upload" style={{float: 'right'}}>Proceed</Button>
        </div>
    )
}
