import {type FirebaseApp, initializeApp} from "firebase/app";
import {
    addDoc,
    collection,
    CollectionReference,
    Firestore,
    getDocs,
    getFirestore,
    getDoc,
    doc,
    Timestamp
} from "firebase/firestore";
import {DATABASE_URL} from "./constants.ts";
import type {Appointment} from "../features/appointments/appointmentsSlice.ts";

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
    registeredAt: Timestamp;
    password: string;
}

const db: Firestore = getFirestore(app);
type CollectionName = "doctors" | "patients" | "appointments";

const fetchData = async (collectionName: CollectionName) => {
    const dataCollection = collection(db, collectionName);
    const dataSnapshot = await getDocs(dataCollection);
    const dataList = dataSnapshot.docs.map(doc => ({ ...doc.data(), doc_id: doc.id}));
    return dataList;
}

const setData = async <T>(collectionName: CollectionName, data: T):Promise<string> => {
    const dataCollection = collection(db, collectionName) as CollectionReference<T>;
    const docRef =  await addDoc(dataCollection, data);
    return docRef.id;
}

const getData = async (id:string) => {
    const docRef = doc(db, "patients", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}

const getAppointment  = async (id:string):Promise<Appointment> => {
    const docRef = doc(db, "appointments", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}
export {fetchData, setData, getData, getAppointment}