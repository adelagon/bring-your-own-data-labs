import React from 'react'
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { sizing } from '@material-ui/system';
import { spacing } from '@material-ui/system';


export default function OptionsPage() {
    return (
        <div>
        <Container>
            <Typography variant="h6" id="tableTitle" component="div" align="center">Upload Options</Typography>
            <p>We have automatically created your S3 Bucket named: mhtan-byod-12345 in ap-southeast-1</p>
            <p>We also have created an IAM user named: ___________ that you may use for uploading data into your bucket</p>
            <p>You have the following options to upload your data into this bucket. Please click the following options that you want to explore: </p>
            <Box mx="auto" my={1}>
                <Button variant="contained" color="primary" style={{float: 'center', maxWidth: '100%', maxHeight: '100%', minWidth: '100%', minHeight: '100%'}} component={Link} to='/upload/cli'>Option 1: CLI Upload</Button>
            </Box>
            <Box mx="auto" my="auto">
                <Button variant="contained" color="primary" style={{float: 'center', maxWidth: '100%', maxHeight: '100%', minWidth: '100%', minHeight: '100%'}} component={Link} to='/upload/client'>Option 2: S3 Browser</Button>
            </Box>
        </Container>
        </div>
    )
}
