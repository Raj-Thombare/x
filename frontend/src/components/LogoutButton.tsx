import { useClerk } from "@clerk/nextjs";

const LogoutButton = () => {
  const { signOut } = useClerk();

  return (
    <button
      onClick={() => signOut()}
      className='text-red-500 hover:text-red-700 font-semibold'>
      Logout
    </button>
  );
};

export default LogoutButton;
