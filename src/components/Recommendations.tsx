import Link from "next/link";
import Image from "./Image";

const Recommendations = () => {
  return (
    <div className='p-4 rounded-2xl border-[1px] border-borderGray flex flex-col gap-4'>
      {/* USER CARD */}
      <div className='flex items-center justify-between'>
        {/* IMAGE AND USER INFO */}
        <div className='flex items-center gap-2'>
          <div className='relative rounded-full overflow-hidden w-10 h-10'>
            <Image
              path='general/user.png'
              alt='John Doe'
              w={100}
              h={100}
              tr={true}
            />
          </div>
          <div className=''>
            <h1 className='text-md font-bold'>Elon Musk</h1>
            <span className='text-textGray text-sm'>@elonmusk</span>
          </div>
        </div>
        {/* BUTTON */}
        <button className='py-1 px-4 font-semibold bg-white text-black rounded-full'>
          Follow
        </button>
      </div>
      <div className='flex items-center justify-between'>
        {/* IMAGE AND USER INFO */}
        <div className='flex items-center gap-2'>
          <div className='relative rounded-full overflow-hidden w-10 h-10'>
            <Image
              path='general/user.png'
              alt='John Doe'
              w={100}
              h={100}
              tr={true}
            />
          </div>
          <div className=''>
            <h1 className='text-md font-bold'>Rohit Sharma</h1>
            <span className='text-textGray text-sm'>@ImRo45</span>
          </div>
        </div>
        {/* BUTTON */}
        <button className='py-1 px-4 font-semibold bg-white text-black rounded-full'>
          Follow
        </button>
      </div>
      <div className='flex items-center justify-between'>
        {/* IMAGE AND USER INFO */}
        <div className='flex items-center gap-2'>
          <div className='relative rounded-full overflow-hidden w-10 h-10'>
            <Image
              path='general/user.png'
              alt='John Doe'
              w={100}
              h={100}
              tr={true}
            />
          </div>
          <div className=''>
            <h1 className='text-md font-bold'>Harkirat Singh</h1>
            <span className='text-textGray text-sm'>@hkirat</span>
          </div>
        </div>
        {/* BUTTON */}
        <button className='py-1 px-4 font-semibold bg-white text-black rounded-full'>
          Follow
        </button>
      </div>
      <Link href='/' className='text-iconBlue'>
        Show More
      </Link>
    </div>
  );
};

export default Recommendations;
