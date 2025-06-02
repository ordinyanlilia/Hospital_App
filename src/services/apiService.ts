import {type FirebaseApp, initializeApp} from "firebase/app";
import {
    addDoc,
    collection,
    CollectionReference,
    doc,
    Firestore,
    getDoc,
    getDocs,
    getFirestore, setDoc,
    updateDoc
} from "firebase/firestore";
import {DATABASE_URL} from "./constants.ts";
import {type Auth, getAuth} from "firebase/auth";

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

const fetchData = async <T>(collectionName: CollectionName) => {
    const dataCollection = collection(db, collectionName) as CollectionReference<T>;
    const dataSnapshot = await getDocs(dataCollection);
    const dataList = dataSnapshot.docs.map(doc => ({...doc.data(), doc_id: doc.id}));
    return dataList as T[];
}

const setData = async <T>(collectionName: CollectionName, data: T, docId?: string): Promise<string> => {
    if (docId) {
        const docRef = doc(db, collectionName, docId);
        await setDoc(docRef, { ...data, id: docId });
        return docId;
    } else {
        const dataCollection = collection(db, collectionName) as CollectionReference<T>;
        const docRef = await addDoc(dataCollection, data);
        return docRef.id;
    }
}

const updateData = async <T extends object>(doc_id: string, collectionName: CollectionName, updatedData: T):Promise<void> => {
    const docRef = doc(db, collectionName, doc_id);
    await updateDoc(docRef, updatedData);
}

const getData = async <T>(id: string, collectionName: CollectionName,):Promise<T> => {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    return {...docSnap.data(), doc_id: id} as T;
}


export {fetchData, setData, getData, updateData, auth, db }