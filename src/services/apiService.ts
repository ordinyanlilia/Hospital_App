import {type FirebaseApp, initializeApp} from "firebase/app";
import {addDoc, collection, CollectionReference, Firestore, getDocs, getFirestore} from "firebase/firestore";
import {DATABASE_URL} from "./constants.ts";

const app: FirebaseApp = initializeApp({
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    databaseURL: DATABASE_URL,
    authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
    appId: import.meta.env.VITE_FIREBASE_APPID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
});

const db: Firestore = getFirestore(app);
type CollectionName = "doctors" | "patients" | "appointments";

const fetchData = async (collectionName: CollectionName) => {
    const dataCollection = collection(db, collectionName);
    const dataSnapshot = await getDocs(dataCollection);
    const dataList = dataSnapshot.docs.map(doc => ({ id: doc.id,...doc.data()}));
    return dataList;
}

const setData = async <T>(collectionName: CollectionName, data: T) => {
    const dataCollection = collection(db, collectionName) as CollectionReference<T>;
    const docRef =  await addDoc(dataCollection, data);
    return docRef.id;
}

export {fetchData, setData}