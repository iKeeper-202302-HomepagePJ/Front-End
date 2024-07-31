import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import ApplicantsList from './ComponentApplicantsList';
export default async function Page() {
  return (
    <main className="min-h-screen w-full">
      {<ApplicantsList/>}
    </main >
  );
};