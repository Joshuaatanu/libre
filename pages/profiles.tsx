/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";

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
    const router = useRouter()
  
    const {data : user }= useCurrentUser();

  return <div>{user?.name}
    <button className=" px-5 py-8 bg-green-300" onClick={()=>signOut()}>SignOut of libre</button>
  </div>;
}
