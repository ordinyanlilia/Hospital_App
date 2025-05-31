import {type FirebaseApp, initializeApp} from "firebase/app";
import {
    addDoc,
    collection,
    CollectionReference,
    doc,
    Firestore,
    getDoc,
    getDocs,
    getFirestore,
    updateDoc
} from "firebase/firestore";
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

export interface Patient {
    id: number;
    name: string;
    surname: string;
    dob: string;
    gender: string;
    email: string;
    phoneNumber: string;
    bloodType: string;
    allergies: string[];
    currentMedications: string[];
    medicalHistory: string[];
    appointments: number[];
    registeredAt: string;
    imageUrl: string;
}

const db: Firestore = getFirestore(app);
type CollectionName = "doctors" | "patients" | "appointments";

const fetchData = async <T>(collectionName: CollectionName) => {
    const dataCollection = collection(db, collectionName) as CollectionReference<T>;
    const dataSnapshot = await getDocs(dataCollection);
    const dataList = dataSnapshot.docs.map(doc => ({...doc.data(), doc_id: doc.id}));
    return dataList;
}

const setData = async <T>(collectionName: CollectionName, data: T): Promise<string> => {
    const dataCollection = collection(db, collectionName) as CollectionReference<T>;
    const docRef = await addDoc(dataCollection, data);
    return docRef.id;
}

const updateData = async <T extends object>(doc_id: string, collectionName: CollectionName, updatedData: T):Promise<void> => {
    const docRef = doc(db, collectionName, doc_id);
    await updateDoc(docRef, updatedData);
}

const getData = async <T>(id: string, collectionName: CollectionName,):Promise<T> => {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    return docSnap.data() as T;
}


export {fetchData, setData, getData, updateData}