import React, { useEffect, useState } from 'react';

import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { getJobs as getJob } from '../graphql/queries';
import { updateJobs as updateJob} from '../graphql/mutations';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import awsExports from '../aws-exports';
import awsSDKExports from '../aws-sdk-exports';

import Auth from'@aws-amplify/auth';
import AWS from 'aws-sdk';
import Lambda from 'aws-sdk/clients/lambda';
import SQS from 'aws-sdk/clients/sqs';
import S3 from 'aws-sdk/clients/s3';

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
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    async function fetchField() {
        try {
            const getData = await API.graphql(graphqlOperation(getJob, {id: (props.match.params.id)} ));
            const getField = getData.data.getJobs;
            console.log(getField);
            let sdate = new Date(getField.start_ts);
            let edate = new Date(getField.end_ts);
            getField.start_ts = sdate.toLocaleString();
            getField.end_ts = edate.toLocaleString();
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

            const updatedStage = await API.graphql(graphqlOperation(updateJob, {input: updateStage}));
            console.log("[SUCCESS]", updatedStage);
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

    async function getProfile() {
      Auth.currentCredentials()
        .then(credentials => {
          const s3 = new S3({
            credentials: Auth.essentialCredentials(credentials)
          });
          let u = new URL(field.profile_uri);
          let key = u.pathname.substring(1);
          let bucket = u.host.split('.')[0];
          var params = {
            Bucket: bucket,
            Key: key,
            Expires: awsSDKExports.presigned_url_expires
          };
          const profile_url = s3.getSignedUrl('getObject', params);
          console.log("[SUCCESS]", profile_url);
          window.open(profile_url, "_blank");
        })
    }

    async function getResult() {
      Auth.currentCredentials()
        .then(credentials => {
          const s3 = new S3({
            credentials: Auth.essentialCredentials(credentials)
          });
          let u = new URL(field.result_uri);
          let key = u.pathname.substring(1);
          let bucket = u.host.split('.')[0];
          var params = {
            Bucket: bucket,
            Key: key,
            Expires: awsSDKExports.presigned_url_expires
          };
          const result_url = s3.getSignedUrl('getObject', params);
          console.log("[SUCCESS]", result_url);
          window.open(result_url, "_blank");
        })
    }

    return (
      <div>
        <Typography variant="h5" id="tableTitle" component="div" align="center">Validation Job Details</Typography>
          <br />
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell align="left"><b>Validation Job ID</b></TableCell>
                  <TableCell align="left">{field.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left"><b>File Name</b></TableCell>
                  <TableCell align="left">{field.filename}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left"><b>File Version</b></TableCell>
                  <TableCell align="left">{field.filename_version}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left"><b>Status</b></TableCell>
                  <TableCell align="left">{field.status}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left"><b>Warnings</b></TableCell>
                  <TableCell align="left">{field.warnings}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left"><b>Errors</b></TableCell>
                  <TableCell align="left">{field.errors}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left"><b>Start Date</b></TableCell>
                  <TableCell align="left">{field.start_ts}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left"><b>End Date</b></TableCell>
                  <TableCell align="left">
                    {field.status === "pending" ? 
                      <span></span> : `${field.end_ts}`}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left"><b>Validation Report</b></TableCell>
                  <TableCell align="left">
                    {field.result_uri ? <a href="#/" onClick={getResult}>Download</a> : 'Unavailable'}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left"><b>Data Profiling Report</b></TableCell>
                  <TableCell align="left">
                  {field.profile_uri ? <a href="#/" onClick={getProfile}>Download</a> : 'Unavailable'}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <div className={classes.root}>
            {field.status === "pending" || field.status == "failed" ?
              <Button variant="contained" color="primary" disabled onClick={handleClickOpen}>Stage Data for Workshop</Button>
    : <Button variant="contained" color="primary" onClick={handleClickOpen}>Stage Data for Workshop</Button> }
            {field.status === "pending" || field.status == "failed" ?
              <Button variant="contained" color="primary" disabled onClick={handleClickPOpen}>Run Data Profiling Job</Button>
    : <Button variant="contained" color="primary" onClick={handleClickPOpen}>Run Data Profiling Job</Button> }
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
                <span>Profiling gives you and the workshop personnel better insights about your data in order to understand the necessary transformations and analytics during the workshop.</span>
                <span>Running a Profiling job might take some time, you can check back to this page every now and then to check the profiling status.</span>
                <span>Do you want to run a Profiling job now?</span>
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
