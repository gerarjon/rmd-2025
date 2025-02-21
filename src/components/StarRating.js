"use client"

export const StarRating = ({ rating, setrating, readOnly }) => {
    if (readOnly && !rating) {
        return null;
    }

    return (
        <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    onClick={() => {
                        if (readOnly) {
                            return;
                        }

                        setrating(star)
                    }}
                    className={`text-2xl ${
                        star <= rating ? "text-yellow-400" : "text-gray-400"
                    } ${readOnly ? "cursor-default" : "cursor-pointer"}
                    `}
                >
                    ★
                </span>
            ))}
        </div>
    )
}
