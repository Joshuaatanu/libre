import React, { useCallback, useState } from "react";
import Input from "@/components/Input";
import Image from "next/image";

import axios from "axios";
import netflixLogo from "@/public/images/real-white.png";
import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function Auth() {
    const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });

      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return (
    <div className='relative h-[900px] w-full bg-[url("/images/library.webp")] bg-no-repeat bg-center bg-fixed bg-cover'>
      <div className="bg-black w-full h-full lg:bg-opacity-70">
        <nav className="px-12 py-5">
          {/* <img src="/images/logo.png" alt="Logo" className="h-12 " /> */}
          <Image src={netflixLogo} alt="Logo" className="h-12 w-52 " />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black  bg-opacity-70 py-16 px-16 self-center mt-20 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  label="Username"
                  onChange={(ev: any) => setName(ev.target.value)}
                  id="name"
                  value={name}
                  type="text"
                />
              )}

              <Input
                label="Email"
                onChange={(ev: any) => setEmail(ev.target.value)}
                id="name"
                value={email}
                type="email"
              />
              <Input
                label="Password"
                onChange={(ev: any) => setPassword(ev.target.value)}
                id="password"
                value={password}
                type="password"
              />
            </div>
            <button
              onClick={variant === "login" ? login : register}
              className="bg-red-600 rounded-md text-white py-3 w-full mt-10 hover:bg-red-700 transition "
            >
              {variant === "login" ? "Login" : "Sign Up"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="
                   w-10
                   h-10
                bg-white
                  rounded-full
                  flex 
                  items-center
                  justify-center
                  cursor-pointer
                  hover:opacity-80
                  transition

                     "
              >
                <FcGoogle />
              </div>

              <div
                onClick={() => signIn("github", { callbackUrl: "/" })}
                className="
                   w-10
                   h-10
                bg-white
                  rounded-full
                  flex 
                  items-center
                  justify-center
                  cursor-pointer
                  hover:opacity-80
                  transition

                     "
              >
                <FaGithub className="text-black" />
              </div>
            </div>

            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? " First time using Libre ?"
                : "Already have an account ?"}
              <span
                onClick={toggleVariant}
                className=" text-white text-sm ml-1 hover:underline cursor-pointer"
              >
                {variant === "register" ? " Login" : "Create an account"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
