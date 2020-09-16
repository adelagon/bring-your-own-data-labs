import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { listJobss as listJobs } from '../graphql/queries';

import awsExports from '../aws-exports';
Amplify.configure(awsExports);

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function JobsPage() {
    const [jobs, setJobs] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        fetchJobs()
    }, []);

    async function fetchJobs() {
        try {
            const jobsData = await API.graphql(graphqlOperation(listJobs));
            const jobsList = jobsData.data.listJobss.items;
            setJobs(jobsList)
        } catch (err) {
            console.log("[ERROR] Fetching jobs: ", err)
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="Validation Jobs">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Filename</TableCell>
                        <TableCell>Version</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Staged</TableCell>
                        <TableCell>Start Date</TableCell>
                        <TableCell>End Date</TableCell>
                        <TableCell>Warnings</TableCell>
                        <TableCell>Errors</TableCell>
                        <TableCell>Profile URL</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {jobs.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="right">{row.filename}</TableCell>
                            <TableCell align="right">{row.filename_version}</TableCell>
                            <TableCell align="right">{row.status}</TableCell>
                            <TableCell align="right">{row.staged}</TableCell>
                            <TableCell align="right">{row.start_ts}</TableCell>
                            <TableCell align="right">{row.end_ts}</TableCell>
                            <TableCell align="right">{row.warnings}</TableCell>
                            <TableCell align="right">{row.errors}</TableCell>
                            <TableCell align="right">{row.profile_url}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
