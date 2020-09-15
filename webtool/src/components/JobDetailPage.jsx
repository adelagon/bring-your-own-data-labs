import React from 'react'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import TextField from '@material-ui/core/TextField'

export default function JobDetailPage() {
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
