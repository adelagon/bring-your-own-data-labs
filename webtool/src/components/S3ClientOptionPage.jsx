import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));


export default function S3ClientOptionPage() {
    const classes = useStyles();

    return (

        <div>
            <Container>
                <Typography variant="h6" id="tableTitle" component="div" align="left">Option 1: CLI Upload</Typography>
                    <p>We have automatically created your S3 Bucket named: mhtan-byod-12345 in ap-southeast-1</p>
                    <p>We also have created an IAM user named: ___________ that you may use for uploading data into your bucket.</p>
                    <p>To upload your files through AWS CLI, all you have to do is download and install the <b>S3 Browser</b> software here: </p>
                    <p><a target="_blank" rel="noopener noreferrer" href="https://s3browser.com/">https://s3browser.com/</a></p>
                    <p>Then, you need to provision IAM credentials. It is important that the files you are uploading should be uploaded in the <b>raw</b> folder of the mhtan-byod-12345 bucket.</p>
                    <p>For the detailed documentation of S3 Browser, please visit: </p>
                    <p><a target="_blank" rel="noopener noreferrer" href="https://s3browser.com/s3browser-first-run.aspx">https://s3browser.com/s3browser-first-run.aspx</a></p>
                    <p>Whenever the files are uploaded into the mhtan-byod-12345 bucket, the data validation process will start automatically. To see the status of the data validation jobs, you may click the <b>View Jobs</b> button below.</p>
                    <div className={classes.root}>
                        <Button variant="contained" color="secondary" component={Link} to="/upload" style={{float: 'right'}}>Back</Button>
                        <Button variant="contained" color="primary" component={Link} to="/jobs" style={{float: 'right'}}>View Jobs</Button>
                    </div>
            </Container>
        </div>
    )
}
