import React, { useState } from 'react';
import firebase from "./utils/Firebase";
import "firebase/auth";

import Auth from "./pages/Auth";

import { ToastContainer, toast } from 'react-toastify';

import LoggedLayout from './layouts/LoggedLayout';

function App() {

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  firebase.auth().onAuthStateChanged(currentUser => {    
    if (!currentUser?.emailVerified) {
      firebase.auth().signOut();
      setUser(null);
    } else {
      setUser(currentUser);
    }

    setIsLoading(false);
  });

  if (isLoading) { return null; }

  return (
    <>
      {!user ? (
        <Auth />
      ) : (
          <LoggedLayout user={user}></LoggedLayout>
        )}

      <ToastContainer
        position="top-center"
        autoClose={9995000}
        hideProgressBa
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover={true}
      >
      </ToastContainer>
    </>
  );
}

export default App;
