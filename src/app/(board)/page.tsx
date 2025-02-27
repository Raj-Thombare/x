import Feed from "@/components/Feed";
import Share from "@/components/Share";
import Link from "next/link";

export default function Home() {
  return (
    <div className=''>
      <div className='flex justify-evenly text-textGray font-semibold border-b-[1px] border-borderGray'>
        <Link
          className='w-full pb-3 px-4 pt-4 flex items-center hover:bg-[rgba(231,233,234,0.1)] justify-center text-white border-b-4 border-iconBlue'
          href='/'>
          For you
        </Link>
        <Link
          className='w-full pb-3 px-4 pt-4 flex items-center justify-center hover:bg-[rgba(231,233,234,0.1)]'
          href='/'>
          Following
        </Link>
      </div>
      <Share />
      <Feed />
    </div>
  );
}
