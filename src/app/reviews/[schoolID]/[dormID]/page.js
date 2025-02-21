import { Review } from "@/components/Review";
import { StarRating } from "@/components/StarRating";
import { WriteReview } from "@/containers/WriteReview";
import { getDormFromDormID, getReviews, getSchoolFromSchoolID } from "@/lib/reads";
import Link from "next/link";

export async function generateMetadata({ params }) {
    const { dormID } = await params;
    const { dormName } = await getDormFromDormID(dormID);

    return {
        title: `${dormName} Reviews`,
        description: `${dormName} reviews`,
    };
};

export default async function Page({ params }) {
    const { dormID } = await params;

    const dorm = await getDormFromDormID(dormID);
    const school = await getSchoolFromSchoolID(dorm.schoolID);
    const reviews = await getReviews(dormID);

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <Link
                    className="block text-sm hover:underline"
                    href={`/dorms/${dorm.schoolID}`}
                >
                    &#8592; {school.schoolName} Dorms
                </Link>

                <h1 className="text-3xl font-bold">{dorm.dormName} Reviews</h1>

                {dorm.rating && <StarRating rating={dorm.rating} readOnly/>}

                <p className="font-medium">{dorm.numReviews || 0} Review{dorm.numReviews !==1 &&<>s</>}</p>
            </div>

            <WriteReview dorm={dorm} school={school} />

            <div className="space-y-4">
                {reviews.map((review) => {
                    return (
                        <div key={review.id}>
                            <Review 
                                uid={review.uid}
                                rating={review.rating}
                                comment={review.comment}
                                date={review.date.toDate().toLocaleDateString("en-US")} 
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
