// import {type FirebaseApp, initializeApp} from "firebase/app";
// import {addDoc, collection, CollectionReference, Firestore, getDocs, getFirestore} from "firebase/firestore";
// import {DATABASE_URL} from "./constants.ts";
// import { type Patient } from "../features/PatientSlice.ts";
// import { getAuth, type Auth } from "firebase/auth";
// import { setDoc, doc, type WithFieldValue, type DocumentData } from "firebase/firestore";


// const app: FirebaseApp = initializeApp({
//     apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
//     databaseURL: DATABASE_URL,
//     authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
//     projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
//     appId: import.meta.env.VITE_FIREBASE_APPID,
//     storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
//     measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
// });

// const auth: Auth = getAuth(app);

// const db: Firestore = getFirestore(app);
// type CollectionName = "doctors" | "patients" | "appointments";

// const fetchData = async (collectionName: string): Promise<Patient[]> => {
//   const querySnapshot = await getDocs(collection(db, collectionName));
// return querySnapshot.docs.map(doc => ({
//   ...(doc.data() as Omit<Patient, "id">), 
//   id: doc.id,  
// })) as Patient[];

// };

// const setData = async <T extends WithFieldValue<DocumentData>>(
//   collectionName: CollectionName,
//   data: T,
//   docId?: string
// ): Promise<string> => {
//   if (docId) {
//     const docRef = doc(db, collectionName, docId);
//     await setDoc(docRef, data); 
//     return docId;
//   } else {
//     const dataCollection = collection(db, collectionName) as CollectionReference<T>;
//     const docRef = await addDoc(dataCollection, data);
//     return docRef.id;
//   }
// };

// export {fetchData, setData, auth, db,}

import { type FirebaseApp, initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  CollectionReference,
  Firestore,
  getDocs,
  getFirestore,
  setDoc,
  doc,
  type WithFieldValue,
  type DocumentData,
} from "firebase/firestore";
import { DATABASE_URL } from "./constants.ts";
import { type Patient } from "../features/PatientSlice.ts";
import { getAuth, type Auth } from "firebase/auth";

const app: FirebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  databaseURL: DATABASE_URL,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
});

const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

type CollectionName = "doctors" | "patients" | "appointments";

const fetchData = async (collectionName: string): Promise<Patient[]> => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map(doc => ({
    ...(doc.data() as Omit<Patient, "id">),
    id: doc.id,
  })) as Patient[];
};

const setData = async <T extends WithFieldValue<DocumentData>>(
  collectionName: CollectionName,
  data: T,
  docId?: string
): Promise<string> => {
  if (docId) {
    const docRef = doc(db, collectionName, docId);
    await setDoc(docRef, { ...data, id: docId }); // 🔥 include the uid as `id`
    return docId;
  } else {
    const dataCollection = collection(db, collectionName) as CollectionReference<T>;
    const docRef = await addDoc(dataCollection, data);
    return docRef.id;
  }
};

export { fetchData, setData, auth, db };
