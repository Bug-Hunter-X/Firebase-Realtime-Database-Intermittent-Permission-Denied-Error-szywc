// bugSolution.js

// ... Firebase initialization code ...

const database = firebase.database();
const userId = firebase.auth().currentUser.uid; //Get the current user id
const myDataRef = database.ref(`users/${userId}/data`);

myDataRef.onDisconnect().set({ status: 'offline' }); //Set the user to offline

myDataRef.set({ status: 'online', lastUpdated: new Date().getTime() }).catch((error) => {
  console.error('Error writing to database:', error);
});

//Clean up the onDisconnect() when the user disconnects to prevent persistent updates
firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    myDataRef.onDisconnect().cancel();
  }
});

// ... rest of your Firebase code ... 