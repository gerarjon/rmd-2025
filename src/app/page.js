import { AdminAddSchool } from "@/containers/admin/AdminAddSchool";
import { getSchools } from "@/lib/reads";
import Link from "next/link";


export default async function Home() {
  const schools = await getSchools();


  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-medium">Rate College Dorms at RMD</h1>

      <div>
        <p className="font-medium">Select your school</p>
        {schools.map((school) => (
          <Link className="block hover:underline" href={`/dorms/${school.id}`} key={school.id}>
            {school.schoolName}
          </Link>
        ))}  
      </div>



      <AdminAddSchool />
    </div>
  );
}
