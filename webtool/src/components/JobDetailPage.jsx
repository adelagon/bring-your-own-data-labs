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
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import awsExports from '../aws-exports';
import awsSDKExports from '../aws-sdk-exports';

import { Paper } from '@material-ui/core';
import { file } from '@babel/types';

import Auth from'@aws-amplify/auth';
import AWS from 'aws-sdk';
import Lambda from 'aws-sdk/clients/lambda';
import SQS from 'aws-sdk/clients/sqs';

Amplify.configure(awsExports);
AWS.config.update({region: awsSDKExports.region});

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

export default function JobDetailPage(props) {
    const classes = useStyles();
    
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClickPOpen = () => {
      setPOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handlePClose = () => {
      setPOpen(false);
    };

    const [field, setFields] = useState([]);

    const [open, setOpen] = React.useState(false);
    const [popen, setPOpen] = React.useState(false);

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
    
    async function updateData(status) {
        try {
            const updateStage = {
                id: (props.match.params.id),
                staged: status
            };

            const updatedStage = await API.graphql(graphqlOperation(updateJob, {input: updateStage}))
        } catch (err) {
            console.log("[ERROR] Updating data could not be completed: ", err)
        }
    }

    async function profileData(id, fn, fnv) {
      Auth.currentCredentials()
        .then(credentials => {
          const sqs = new SQS({
            credentials: Auth.essentialCredentials(credentials)
          });
          var params = {
            MessageAttributes: {
              "key": {
                DataType: "String",
                StringValue: fn
              },
              "version": {
                DataType: "String",
                StringValue: fnv
              },
              "bucket": {
                DataType: "String",
                StringValue: awsSDKExports.source_s3_bucket
              },
              "jobid": {
                DataType: "String",
                StringValue: id
              }
            },
            MessageBody: fn + "?versionId=" + fnv,
            QueueUrl: awsSDKExports.sqs_profile_url
          };
          sqs.sendMessage(params, function(err, data) {
            if (err) {
              console.log("[ERROR]", err);
              handlePClose();
            } else {
              console.log("[SUCCESS]", data.MessageId);
              handlePClose();
            }
          });
        })
    }

    async function stageData(fn, fnv) {
      Auth.currentCredentials()
        .then(credentials => {
          const lambda = new Lambda({
            credentials: Auth.essentialCredentials(credentials)
          });
          var robj = lambda.invoke({
            FunctionName: awsSDKExports.stager_function,
            Payload: JSON.stringify({
              source_object: fn,
              source_version: fnv,
            })
          });
          robj.on('success', function(response) {
            console.log("SUCCESS", response);
            updateData("yes");
            handleClose();
          });
          robj.on('error', function(response) {
            console.log("ERROR", response);
            updateData("fail");
            handleClose();
          });
          robj.on('complete', function(response) {
            console.log("COMPLETE", response);
          });
          robj.send();
        })
    }
    return (
      <div>
        <Typography variant="h6" id="tableTitle" component="div">Validation Job Status</Typography>
          <List>
            <ListItem><b>Validation Job ID: </b>{field.id}</ListItem>
            <ListItem><b>Validation Job Start Date: </b>{field.start_ts}</ListItem>
            <ListItem><b>Validation Job End Date: </b>{field.end_ts}</ListItem>
            <ListItem><b>File Name: </b> {field.filename}</ListItem>
            <ListItem><b>File Version: </b> {field.filename_version}</ListItem>
            <ListItem><b>Status: </b> {field.status}</ListItem>
            <ListItem><b>Warnings: </b> {field.warnings} warning(s)</ListItem>
            <ListItem><b>Errors: </b> {field.errors} error(s)</ListItem>
            <ListItem><b>Report: </b> </ListItem>
            <ListItem><b>Result: </b> {field.result_uri}</ListItem>
          </List>
          <div className={classes.root}>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>Stage Data for Workshop</Button>
            <Button variant="contained" color="primary" onClick={handleClickPOpen}>Profile Data</Button>
            <Button variant="contained" color="primary" disabled>Share Results</Button>
          </div>
          {/* Stage Data Dialog */}
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
            <Button onClick={() => {
                  updateData("pending");
                  stageData(field.filename, field.filename_version);
                  }} color="primary" autoFocus variant="contained">
                  Yes
              </Button>
              <Button onClick={handleClose} color="secondary" variant="contained">
                  No
              </Button>
              
            </DialogActions>
          </Dialog>
          {/* Profile Data Dialog */}
          <Dialog
            open={popen}
            onClose={handlePClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Run Profiling Job?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <p>Profiling gives you and the workshop personnel better insights about your data in order to understand the necessary transformations and analytics during the workshop.</p>
                <p>Running a Profiling job might take some time, you can check back to this page every now and then to check the profiling status.</p>
                <p>Do you want to run a Profiling job now?</p>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => {
                  profileData(field.id, field.filename, field.filename_version);
                  }} color="primary" autoFocus variant="contained">
                  Yes
              </Button>
              <Button onClick={handlePClose} color="secondary" variant="contained">
                  No
              </Button>
            </DialogActions>
          </Dialog>
        </div>
    )
}
