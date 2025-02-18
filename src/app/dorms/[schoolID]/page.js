import Link from "next/link";
import { getSchoolFromSchoolID, getDorms } from "@/lib/reads";
import { AdminAddDorm } from "@/containers/admin/AdminAddDorm";


export async function generateMetadata({ params }) {
    const { schoolID } = await params;
    const { schoolName } = await getSchoolFromSchoolID(schoolID);

    return {
        title: `${schoolName} Dorms`,
        description: `${schoolName} dorm reviews`,
    };
};

export default async function Page({ params }) {
    const { schoolID } = await params;

    const school = await getSchoolFromSchoolID(schoolID);
    const dorms = await getDorms(schoolID);



    console.log(dorms);

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <Link className="block text-sm hover:underline" href={`/`} >
                    &#8592; All Schools
                </Link>

                <h1 className="text-3xl font-bold">{school.schoolName} Dorms</h1>

                <p>Browse {dorms.length} dorm{dorms.length !== 1 &&<>s</>}</p>
            </div>

            <ul>
                {dorms.map(dorm => {
                    return (
                        <li key={dorm.dormID}>
                            <Link className="hover:underline" href={`/reviews/${schoolID}/${dorm.dormID}`}>
                                {dorm.dormName}
                            </Link>
                        </li>
                    )
                })}
            </ul>

            <AdminAddDorm schoolID={schoolID}/>
        </div>
    );
};
