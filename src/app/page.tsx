import Feed from "@/components/Feed";
import Link from "next/link";

export default function Home() {
  return (
    <div className=''>
      <div className='px-4 pt-4 flex justify-between text-textGray font-bold border-b-[1px] border-borderGray'>
        <Link
          className='pb-3 flex items-center border-b-4 border-iconBlue'
          href='/'>
          For you
        </Link>
        <Link className='pb-3 flex items-center' href='/'>
          Following
        </Link>
        <Link className='hidden pb-3 md:flex items-center' href='/'>
          Reactjs
        </Link>
        <Link className='hidden pb-3 md:flex items-center' href='/'>
          Javascript
        </Link>
        <Link className='hidden pb-3 md:flex items-center' href='/'>
          CSS
        </Link>
      </div>
      <Feed />
    </div>
  );
}
