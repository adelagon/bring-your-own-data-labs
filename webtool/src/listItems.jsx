import React from 'react';
import {Link} from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import UploadIcon from '@material-ui/icons/CloudUpload';
import ListIcon from '@material-ui/icons/List';
import HelpIcon from '@material-ui/icons/Help';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/">
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Welcome" />
    </ListItem>
    <ListItem button component={Link} to="/upload">
      <ListItemIcon>
        <UploadIcon />
      </ListItemIcon>
      <ListItemText primary="Upload Data" />
    </ListItem>
    <ListItem button component={Link} to="/jobs">
      <ListItemIcon>
        <ListIcon />
      </ListItemIcon>
      <ListItemText primary="View Jobs" />
    </ListItem>
    <ListItem button component={Link} to="/help">
      <ListItemIcon>
        <HelpIcon />
      </ListItemIcon>
      <ListItemText primary="Help" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListItem button component={Link} to="/uninstall">
      <ListItemIcon>
        <RemoveCircleOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="Uninstall" />
    </ListItem>
    <ListItem button component={Link} to="/logout">
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  </div>
);
