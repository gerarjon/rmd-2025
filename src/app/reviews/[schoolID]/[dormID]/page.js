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
            </div>

            <div className="space-y-4">
                {reviews.map((review) => {
                    return <div key={review.id}>{review.comment}</div>
                })}
            </div>
        </div>
    );
}
