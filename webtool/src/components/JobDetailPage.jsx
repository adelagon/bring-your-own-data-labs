import React, { useEffect, useState } from 'react';

import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { getJobs as getJob } from '../graphql/queries';

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import TextField from '@material-ui/core/TextField'

import awsExports from '../aws-exports';
Amplify.configure(awsExports);

export default function JobDetailPage() {
    const [field, setFields] = useState([]);

    useEffect(() => {
        getField()
    }, []);

    async function getField() {
        try {
            const getData = await API.graphql(graphqlOperation(getJob, {id: '88867fa8-698e-4fe6-9091-6efc3aa305cc'}));
            const getField = getData.data.getJobs;
            console.log(getField);
            setFields(getField);
        } catch (err) {
            console.log("[ERROR] Fetching data: ", err)
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
        </div>
    )
}
