import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useEffect } from "react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaLock } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { HiOutlineMail } from "react-icons/hi";
import { MdNoteAlt } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { authcontext } from "../../components/context/Authcontext";
import Swal from "sweetalert2";
import { tokencontext } from "../../components/context/Token";
export default function Login() {
  const [loginError, setloginError] = useState(null);
  const [loginLoading, setloginLoading] = useState(false);
  const navigate = useNavigate();
  const { settoken } = useContext(tokencontext);
  const { getLoginFn } = useContext(authcontext);
  const schema = z.object({
    email: z.string().nonempty(" email is required"),
    password: z
      .string()
      .nonempty(" password is required")
      .regex(/^[a-zA-Z0-9]{9}$/, "Password must be 9 character"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all", resolver: zodResolver(schema) });

  const userLogin = async (values) => {
    try {
      setloginError(null);
      setloginLoading(true);
      const { data } = await getLoginFn(values);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "You are logged in successfully",
        showConfirmButton: false,
        timer: 1500,
    
      });
      localStorage.setItem("GetToken", data.token);
      settoken(data.token);
      navigate("/");
      console.log(data);
    } catch (error) {
      setloginError(error.response.data.msg);
      console.log(error.response.data.msg);
      setloginLoading(false);
    } finally {
      setloginLoading(false);
    }
  };
   useEffect(() => {
      document.body.style.overflow='hidden';
      return()=>{
        document.body.style.overflow='auto';
      }
    
     
    }, [])
    

  return (
    <>
      <div className="flex justify-center items-center min-h-screen overflow-hidden ">
        <div className="w-full max-w-xl  ">
          <form
            onSubmit={handleSubmit(userLogin)}
            className="mx-auto max-w-[300px] auth   sm:max-w-md md:max-w-xl  rounded-md  bg-white dark:bg-gray-800 dark:shadow-sm dark:shadow-white   shadow-2xl px-4 sm:px-8 py-10 "
          >
            <div className="bookcircle  flex justify-center items-center">
              <div className="text-3xl flex bg-submain  dark:text-black dark:bg-main text-white justify-center items-center circle">
                <MdNoteAlt />
              </div>
            </div>
            <p className="text-center text-submain dark:text-main my-4 text-xl sm:text-3xl">
              Login Now
            </p>
            {loginError ? (
              <>
                <div
                  className="flex items-center p-2 mb-2 text-sm text-submain rounded-lg bg-main dark:bg-main dark:text-black"
                  role="alert"
                >
                  <svg
                    className="shrink-0 inline w-4 h-4 me-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span className="sr-only">Info</span>
                  <div className="">{loginError}</div>
                </div>
              </>
            ) : (
              ""
            )}
            <div className="relative">
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                class="bg-gray-50 border mb-4  border-gray-300 px-8 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-main focus:outline-none"
                placeholder="Enter your email"
                required
                {...register("email")}
              />
              <div className="absolute dark:text-main text-submain text-[25px] bottom-2 px-1">
                <HiOutlineMail />
              </div>
            </div>

            {errors.email && (
              <div
                className="flex items-center p-2 mb-2 text-sm text-submain rounded-lg bg-main dark:bg-main dark:text-black"
                role="alert"
              >
                <svg
                  className="shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div className="text-white text-xs md:text-sm dark:text-black">
                  {errors.email.message}{" "}
                </div>
              </div>
            )}
            <div className="relative">
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900  dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                class="bg-gray-50 border mb-4 border-gray-300 px-8 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-main focus:outline-none"
                placeholder="Enter your password"
                required
                {...register("password")}
              />
              <div className="absolute dark:text-main text-submain text-[20px] bottom-3 px-1">
                <FaLock />
              </div>
            </div>
            {errors.password && (
              <div
                className="flex items-center p-2 mb-2 text-sm text-submain rounded-lg bg-main dark:bg-main dark:text-black"
                role="alert"
              >
                <svg
                  className="shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div className="text-white text-xs md:text-sm dark:text-black">
                  {errors.password.message}{" "}
                </div>
              </div>
            )}

            <button
              type="submit"
              className="text-white login flex justify-center items-center  bg-submain  hover:bg-main focus:outline-none  font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-main dark:hover:bg-submain dark:text-black hover:text-black hover:dark:text-white "
            >
              {loginLoading ? (
                <div className="flex justify-center items-center border-b-4 rounded-full w-6 h-6 border-gray-100 animate-spin"></div>
              ) : (
                <p> Submit</p>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
