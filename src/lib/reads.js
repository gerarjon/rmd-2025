import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

export const getSchools = async () => {
    return (await getDocs(query(collection(db, "schools")))).docs.map(
        (docSnap) => ({
            ...docSnap.data(),
            id: docSnap.id,
        })
    );
};

export const getDorms = async (schoolID) => {
    return (
        await getDocs(
            query(collection(db, "dorms"), where("schoolID", "==", schoolID))
        )
    ).docs.map((docSnap) => ({
            ...docSnap.data(),
            id: docSnap.id,
    }));
};

export const getSchoolFromSchoolID = async (schoolID) => {
    return (await getDoc(doc(db, "schools", schoolID))).data();
};

export const getDormFromDormID = async (dormID) => {
    return (await getDoc(doc(db, "dorms", dormID))).data();
};

export const userIsAdmin = async (uid) => {
    return (await getDoc(doc(db, "admins", uid))).exists();
};

export const getReviews = async (dormID) => {
    return (
        await getDocs(
            query(collection(db, "reviews"), where("dormID", "==", dormID))
        )).docs.map((docSnap) => ({
            ...docSnap.data(),
            id: docSnap.id,
        })
    );
};
