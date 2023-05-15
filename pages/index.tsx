import Image from "next/image";
import { Inter } from "next/font/google";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import Link from "next/link";
import netflixLogo from "@/public/images/real-white.png";
import useCurrentUser from "@/hooks/useCurrentUser";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
export default function Home() {
  const { data: user } = useCurrentUser();
  return (
    <div>
      <div className="flex flex-row py-5 px-3 ">
        <Image src={netflixLogo} alt="Logo" className="h-12 w-52 " />
        <Link href="/">
          <p className=" text-red-500 ml-6 text-lg mt-2 ml-[100px]  hover:text-red-100 transition duration-200">
            Home
          </p>
        </Link>
        <Link href="/">
          <p className=" text-white ml-6 text-lg mt-2 ml-[100px] hover:text-red-500 transition duration-200">
            Library
          </p>
        </Link>
        <Link href="/">
          <p className=" text-white ml-6 text-lg mt-2 ml-[100px] hover:text-red-500 transition duration-200">
            Downloads
          </p>
        </Link>
        <Link href="/profiles">
          <p className=" text-white ml-6 text-lg mt-2 ml-[100px] hover:text-red-500 transition duration-200">
            Profile
          </p>
        </Link>
        <div className=" flex  ml-auto float-right   ">
          <p className=" text-white text-lg mt-2 mr-10"> Hi, {user?.name}</p>
          <button
            className=" px-4 py-2 bg-red-600 rounded-xl"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      </div>
      <section className="w-full px-3 mt-20">
        <div className="flex flex-row">
          <div className="bg-slate-400 w-[600px] h-[700px] rounded-md"></div>
          <div className=" ml-20  px-20">
            <h3 className="text-3xl"> Title</h3>
            <p className="text-xl italic font-light mt-10">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus
              commodi, perspiciatis eveniet suscipit atque aspernatur delectus
              veniam est quaerat dolorem debitis quia corrupti alias eaque. Sunt
              debitis sequi odio voluptates.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
