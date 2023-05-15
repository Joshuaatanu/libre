/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";
import Image from "next/image";

import netflixLogo from "@/public/images/real-white.png";
import Link from "next/link";

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

export default function profiles() {
  const router = useRouter();

  const { data: user } = useCurrentUser();

  return (
    <div className="flex flex-row py-5 px-3 ">
      <Image src={netflixLogo} alt="Logo" className="h-12 w-52 " />
      <Link href="/">
        <p className=" text-white ml-6 text-lg mt-2 ml-[100px] hover:text-red-500 transition duration-200">
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
          <p className=" text-red-500 ml-6 text-lg mt-2 ml-[100px] hover:text-red-100 transition duration-200">
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
  );
}
