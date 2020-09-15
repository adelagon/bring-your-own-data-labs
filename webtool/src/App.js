import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react'

import SplashPage from './components/SplashPage';
import JobsPage from './components/JobsPage';
import JobDetailPage from './components/JobDetailPage';
import OptionsPage from './components/OptionsPage';
import CLIOptionPage from './components/CLIOptionPage';
import S3ClientOptionPage from './components/S3ClientOptionPage';

import awsExports from "./aws-exports";
import { Container, Breadcrumbs } from '@material-ui/core';
Amplify.configure(awsExports);

const initialState = { name: '', description: '' }

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const App = () => {
  return (
<<<<<<< HEAD
    <div style={styles.container}>
      <Router>
        <List component="nav">
          <ListItem  button component={Link} to="/">
            <ListItemText primary="Splash Page" />
          </ListItem>
          <ListItem button component={Link} to="/jobs">
            <ListItemText primary="Jobs List Page" />
          </ListItem>
          <ListItem button component={Link} to="/jobs/0eb09841-698b-4ba1-851c-f1a1c69a21e1">
            <ListItemText primary="Job Detail Page" />
          </ListItem>
          <ListItem button component={Link} to="/options">
            <ListItemText primary="Options Page" />
          </ListItem>
          <ListItem button component={Link} to="/options/cli">
            <ListItemText primary="CLI Upload Page" />
          </ListItem>
          <ListItem button component={Link} to="/options/client">
            <ListItemText primary="S3 Client Page" />
          </ListItem>
        </List>  
        <Route exact path="/" component={SplashPage} />
        <Route exact path="/jobs" component={JobsPage} />
        <Route exact path="/jobs/:id" component={JobDetailPage} />
        <Route exact path="/options" component={OptionsPage} />
        <Route exact path="/options/cli" component={CLIOptionPage} />
        <Route exact path="/options/client" component={S3ClientOptionPage} />
      </Router>
=======
    <div>
      <Container>
        <Router>
          
          <List component="nav">
            <Breadcrumbs aria-label="breadcrumb">
              <ListItem  button component={Link} to="/">
                <ListItemText primary="Splash Page" />
              </ListItem>
              <ListItem button component={Link} to="/jobs">
                <ListItemText primary="Jobs List Page" />
              </ListItem>
              <ListItem button component={Link} to="/jobs/0eb09841-698b-4ba1-851c-f1a1c69a21e1">
                <ListItemText primary="Job Detail Page" />
              </ListItem>
              <ListItem button component={Link} to="/options">
                <ListItemText primary="Options Page" />
              </ListItem>
              <ListItem button component={Link} to="/options/cli">
                <ListItemText primary="CLI Upload Page" />
              </ListItem>
              <ListItem button component={Link} to="/options/s3client">
                <ListItemText primary="S3 Client Page" />
              </ListItem>
              </Breadcrumbs>
          </List>
          
          <Route exact path="/" component={SplashPage} />
          <Route exact path="/jobs" component={JobsPage} />
          <Route exact path="/jobs/:id" component={JobDetailPage} />
          <Route exact path="/options" component={OptionsPage} />
          <Route exact path="/options/cli" component={CLIOptionPage} />
          <Route exact path="/options/client" component={S3ClientOptionPage} />
        </Router>
      </Container>
>>>>>>> initial commit
    </div>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', padding: 20 },
}

export default withAuthenticator(App)