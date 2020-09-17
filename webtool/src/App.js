import React from 'react';
import Amplify from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react'
import awsExports from "./aws-exports";

import Dashboard from './Dashboard';

Amplify.configure(awsExports);

const App = () => {
  return (
    <div>
      <Dashboard />
    </div>
  )
}

export default withAuthenticator(App)