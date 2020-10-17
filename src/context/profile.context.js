import { database } from 'firebase';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../misc/firebase';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    let userRef;
    
    const authUnsub = auth.onAuthStateChanged( authObj => {
      if(authObj) {

        userRef = database.ref(`/profiles/${authObj.uid}`);
        
        userRef.on('value', (snapshot) => {
          const {name, createAt} = snapshot.val();

          const data = {
            name,
            createAt,
            uid: authObj.uid,
            email: authObj.email
          }
          setProfile(data);
          setIsLoading(false);
        })
        
      } else {
        if(userRef) {
          userRef.off()
        }

        setProfile(null);
        setIsLoading(false);
      }
    } );

    return () => {
      authUnsub();

      if(userRef) {
        userRef.off();
      }
    }
  }, [])

  return <ProfileContext.Provider value={{ isLoading, profile }}>
    {children}
  </ProfileContext.Provider>
}

export const useProfile = () => useContext(ProfileContext);