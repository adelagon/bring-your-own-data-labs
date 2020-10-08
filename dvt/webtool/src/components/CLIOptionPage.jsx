import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));


export default function CLIOptionPage() {
    const classes = useStyles();

    return (
        <div>
            <Container>
                <Typography variant="h6" id="tableTitle" component="div" align="left">Option 1: CLI Upload</Typography>
                    <p>We have automatically created your S3 Bucket named: mhtan-byod-12345 in ap-southeast-1</p>
                    <p>We also have created an IAM user named: ___________ that you may use for uploading data into your bucket</p>
                    <p>To upload your files through AWS CLI, all you have to do is provision the IAM credentials of the source machine and then run this command: </p>
                    <Box border={1} px={1} py={1}>aws s3 cp {"<"}directory{">"} s3://mhtan-byod-12345/raw --recursive</Box>
                    <p>For more details on how to upload files to S3 using the AWS CLI, you may visit: </p>
                    <p><a target="_blank" rel="noopener noreferrer" href="https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/index.html">https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/index.html</a></p>
                    <div className={classes.root}>
                        <Button variant="contained" color="secondary" component={Link} to="/upload" style={{float: 'right'}}>Back</Button>
                        <Button variant="contained" color="primary" component={Link} to="/jobs" style={{float: 'right'}}>View Jobs</Button>
                    </div>
            </Container>
        </div>
    )
}
