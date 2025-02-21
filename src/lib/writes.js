import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

const stringToID = (str) => {
    return str
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
};

export const setSchoolDoc = (schoolName) => {
    const schoolID = stringToID(schoolName);

    return setDoc(doc(db, "schools", schoolID), {
        schoolName: schoolName,
        schoolID: schoolID,
    });
};

export const setDormDoc = ({ schoolID, dormName }) => {
    const dormID = stringToID(`${schoolID} ${stringToID(dormName)}`);

    return setDoc(doc(db, "dorms", dormID), {
        schoolID: schoolID,
        dormID,
        dormName,
    });
};

export const setReviewDoc = (data) => {
    return addDoc(collection(db, "reviews"), data);
};

export const banUser = (uid) => {
    return setDoc(doc(db, "banned", uid), { uid });
};
