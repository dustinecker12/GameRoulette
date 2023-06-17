import { firebaseConfig } from './fb-credentials';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore/lite';

import {
  getGameDetailsSteamApi,
  getGameDetailsSteamApiV2,
} from '../api/STEAM_SERVER';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export function handleSignUp(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const settings = {
        settings: {
          steamId: '',
          hidePlayedGames: false,
          hideDownvotedGames: false,
          showOnlyMultiplayerGames: false,
        },
      };
      setDoc(doc(db, 'userProfile', userCredential.user.uid), settings);
    })
    .catch((error) => {
      if (error.code == 'auth/email-already-in-use') {
        alert('Email already in use');
      } else {
        alert('Something went wrong');
      }
    });
}

export function handleSignIn(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // get steamId and settings upon login, save to context
    })
    .catch((error) => {
      if (error.code == 'auth/wrong-password') {
        alert('Email or password incorrect');
      } else if (error.code == 'auth/too-many-requests') {
        alert('Too many requests, try agin later');
      } else {
        alert(error.code);
      }
    });
}

export async function getUserProfile(uid, callback) {
  const docRef = doc(db, 'userProfile', uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    callback(docSnap.data());
  } else {
    callback({});
  }
}

export async function saveUserProfile(uid, settings) {
  await setDoc(doc(db, 'userProfile', uid), settings);
}

// const testGame = getGameDetailsSteamApi('252950', (data) => {
//   // saveGameDetailsFirestore(db, { ...data, appId: 252950 }, '252950');
//   saveGameDetailsFirestore(db, data, '252950');
// });

// const testGame = getGameDetailsSteamApiV2('4000', (data) => {
//   console.log(data.name);
//   saveGameDetailsFirestore(db, data, '4000');
// });

// const testGameList = getGameDetailsFirestore(db, (gameList) => {
//   for (let game of gameList) {
//     console.log(game.name);
//   }
// });

async function getGameDetailsFirestore(db, callback) {
  const gameDetailsCol = collection(db, 'gameDetails');
  const gameSnapshot = await getDocs(gameDetailsCol);
  const gameList = gameSnapshot.docs.map((doc) => doc.data());
  // return gameList;
  callback(gameList);
}

async function saveGameDetailsFirestore(db, game, appId) {
  await setDoc(doc(db, 'gameDetails', appId), game);
}

export { auth };
