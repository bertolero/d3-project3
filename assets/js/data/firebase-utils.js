import * as firebase from "firebase/app";
import "firebase/firestore";
import { default as firebaseConfig } from "./data-config.json";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;
