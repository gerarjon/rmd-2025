import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { userIsAdmin } from "./reads";

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);

            if(user) {
                const isAdmin = await userIsAdmin(user.uid);

                setIsAdmin(isAdmin);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { user, loading, isAdmin };
};
