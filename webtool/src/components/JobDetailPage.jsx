import React, { useEffect, useState } from 'react';

import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { getJobs as getJob } from '../graphql/queries';
import { updateJobs as updateJob} from '../graphql/mutations';

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import awsExports from '../aws-exports';
Amplify.configure(awsExports);

export default function JobDetailPage(props) {
    const [field, setFields] = useState([]);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        fetchField()
    }, []);

    async function fetchField() {
        try {
            const getData = await API.graphql(graphqlOperation(getJob, {id: (props.match.params.id)} ));
            const getField = getData.data.getJobs;
            console.log(getField);
            setFields(getField);
        } catch (err) {
            console.log("[ERROR] Fetching data: ", err)
        }
    }
    async function updateData() {
        try {
            const updateStage = {
                id: (props.match.params.id),
                staged: 'pending'
            };

            const updatedStage = await API.graphql(graphqlOperation(updateJob, {input: updateStage}))
        } catch (err) {
            console.log("[ERROR] Updating data could not be completed: ", err)
        }
    }

    return (
        <div>
            <h3>Validation Job Status</h3>
                <List>
                    <ListItem><b>Validation Job ID:</b> </ListItem>
                    <ListItem><b>Validation Job Start Date:</b> </ListItem>
                    <ListItem><b>Validation Job End Date:</b> </ListItem>
                    <ListItem><b>File Name:</b> </ListItem>
                    <ListItem><b>File Version:</b> </ListItem>
                    <ListItem><b>S3 URL: </b></ListItem>
                    <ListItem><b>Result:</b> </ListItem>
                    <ListItem><b>Report:</b> </ListItem>
                </List>
                
                <Button variant="contained" color="primary">Share Result</Button>
                <Button variant="contained" color="primary">View Profile</Button>
                    <Button variant="contained" color="primary" onClick={handleClickOpen}>Stage Data for Workshop
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Are you sure you want to proceed with Staging the Data?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Once you agree, your data will be staged into a Staging Bucket created by this Data Validation Tool.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Disagree
                            </Button>
                            <Button onClick={() => {
                                updateData();
                                handleClose();
                                }} color="primary" autoFocus>
                                Agree
                            </Button>
                        </DialogActions>
                    </Dialog>
                {/* <Button onClick={updateData} variant="contained" color="primary">Stage Data for Workshop</Button> */}
        </div>
    )
}
