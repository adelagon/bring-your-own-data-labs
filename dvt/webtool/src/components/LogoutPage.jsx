import React from 'react'
import { useHistory } from 'react-router-dom'

import { Auth } from 'aws-amplify';

export default function LogoutPage() {
  const history = useHistory();

  // A bit hackish but it works
  async function signOut() {
    try {
        await Auth.signOut({ global: true });
        history.push("/");
        window.location.reload();
    } catch (error) {
        console.log('error signing out: ', error);
    }
  }

  signOut();

  return (
    <span>Logging out...</span>
  )
}
