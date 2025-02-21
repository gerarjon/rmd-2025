"use client"

import { useAuth } from "@/lib/useAuth";
import { StarRating } from "./StarRating";

export const Review = ({ rating, comment, date, uid }) => {
    const {isAdmin, loading} = useAuth();

    return (
        !loading && (
            <div className="space-y-3 w-full border p-4 rounded-xl">
                <StarRating rating={rating} readOnly />

                <p>{comment}</p>

                <p className="text-gray-600 text-sm">{date}</p>

                {isAdmin && 
                    <button 
                        type="button"
                        className="text-sm text-red-600" 
                        onClick={async() => {
                            try {
                                await banUser(uid);
                                window.alert(`User:${uid} banned`);
                            } catch (e) {
                                window.alert("Error Banning");
                            }
                }}
                
                >Ban user</button>}
            </div>
        )
    )
}