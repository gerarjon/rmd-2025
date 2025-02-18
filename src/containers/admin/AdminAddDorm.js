"use client";
import { ButtonPrimary } from "@/components/Button";
import { useAuth } from "@/lib/useAuth";
import { setDormDoc } from "@/lib/writes";
import { useState } from "react";

export const AdminAddDorm = ({ schoolID }) => {
    const [dormName, setDormName] = useState("");
    const { isAdmin } = useAuth();

    if (!isAdmin) {
        return null;
    }

    const submitDorm = async(e) => {
        e.preventDefault();

        try {
            if (!dormName) {
                window.alert("Enter dorm");
                return;
            }

            await setDormDoc({ schoolID, dormName });
            window.alert(`${dormName} added`);
            setDormName("");

        } catch (e) {
            window.alert(e.message);
        }  
        
    };

    return (
        <form
            onSubmit={submitDorm}
            className="space-y-2 bg-gray-100 border rounded p-4"
        >
            <p className="font-medium">
                Admin
            </p>

            <div className="space-x-2">
                <input
                    name="dormName"
                    className="border border-gray-400 rounded p-2"
                    type="text"
                    placeholder="Dorm Name"
                    value={dormName}
                    onChange={(e) => {
                        setDormName(e.target.value);
                    }}
                />

                
                <ButtonPrimary buttonType="submit" onClick={submitDorm}>
                    Add Dorm
                </ButtonPrimary>
            </div>
        </form>
    );
};
