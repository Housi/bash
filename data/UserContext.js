import React, { useState, useEffect } from "react";
import firebase from "data/firebase";

const UserContext = React.createContext([{}, () => {}]);

const profilesApi = firebase.database.collection("profiles");

const getUser = async (id) => {
  const userRef = await profilesApi.doc(id).get();
  const data = await userRef.data();
  return { id, ...data };
};

const otherProfile = (profiles, uid) =>
  profiles.find((profile) => profile.id !== uid);

const UserProvider = (props) => {
  const initialState = {
    ready: false,
    uid: false,
    user: false,
  };

  const [state, setState] = useState(initialState);

  async function onChange(user) {
    if (user?.uid) {
      const profile = await firebase.database
        .collection("profiles")
        .doc(user.uid)
        .get();
      if (profile.exists) {
        setState({
          ready: true,
          uid: user.uid,
          user: profile.data(),
        });
      } else {
        // profile not set
        setState({
          ready: true,
          uid: user.uid,
          user: false,
        });
      }
    } else {
      // logged out
      setState({
        ready: true,
        uid: false,
        user: false,
      });
    }
  }

  const logout = () => firebase.auth.signOut();

  const updateProfile = (profileData) =>
    firebase.database
      .collection("profiles")
      .doc(state.uid)
      .set(profileData, { merge: true })
      .then(window.location.reload());

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged(onChange);
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ logout, updateProfile, ...state }}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider, getUser, otherProfile };
