import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaLock, FaLongArrowAltRight, FaPhoneAlt } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { authcontext } from "../../components/context/Authcontext";
import { HashLoader, MoonLoader } from "react-spinners";
import { CiCalendar } from "react-icons/ci";
import { HiOutlineMail } from "react-icons/hi";
import { IoPerson } from "react-icons/io5";

export default function Register() {
  let { getRegisterFn } = useContext(authcontext);
  let [RegisterError, setRegisterError] = useState(null);
  let [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const schema = z.object({
    name: z
      .string()
      .nonempty("required")
      .min(4, "Min length is 4")
      .max(8, "Max length is 8"),
    email: z.string().nonempty(" email is required"),
    password: z
      .string()
      .nonempty(" password is required")
      .regex(/^[a-zA-Z0-9]{9}$/, "Password must be 9 character"),
    age: z.coerce.number().min(10, "Min age is 10").max(99, "Max age is 99"),
    phone: z
      .string()
      .nonempty(" phone is required")
      .regex(/^01[0125][0-9]{8}$/),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: zodResolver(schema),
  });
  const getRegister = async (values) => {
    try {
      setloading(true);
      setRegisterError(null);
      const { data } = await getRegisterFn(values);
      console.log(data);
      navigate("/login");
    } catch (error) {
      setloading(false);
      console.log(error.response.data.msg);
      setRegisterError(error.response.data.msg);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="   dark:text-white flex justify-center items-center min-h-screen overflow-hidden  ">
      <div className=" w-full max-w- md:max-w-xl py-14 px-6 xl:py-0 ">
        <form
          onSubmit={handleSubmit(getRegister)}
          className="mx-auto max-w-[300px] py-4    sm:max-w-md md:max-w-xl  rounded-xl  bg-white dark:bg-gray-800 dark:shadow-sm dark:shadow-white   shadow-2xl px-4 sm:px-8 "
        >
          <div className="bookcircle  flex justify-center items-center">
            <div className="text-3xl flex bg-submain dark:text-black dark:bg-main text-white  justify-center items-center circle">
              <GiNotebook />
            </div>
          </div>
          <p className="text-center text-submain dark:text-main my-2 text-xl sm:text-3xl">
            Create an account
          </p>
          {RegisterError ? (
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
                <div className="text-white dark:text-black">
                  {RegisterError}
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          <div className="relative">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              class="bg-gray-50 border mb-4 px-8 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-main focus:outline-none"
              placeholder="Enter your name"
              required
              {...register("name")}
            />
            <div className="absolute dark:text-main text-submain text-[19px] bottom-3 px-1">
              <IoPerson />
            </div>
          </div>
          {errors.name && (
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
              <div className="text-white dark:text-black">
                {errors.name.message}
              </div>
            </div>
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
              class="bg-gray-50 border mb-4 px-8 border-gray-300 focus:outline-none text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-main"
              placeholder="Enter your email"
              required
              {...register("email")}
            />
            <div className="absolute dark:text-main text-submain text-[22px] bottom-2 px-1">
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
              <div className="text-white dark:text-black">
                {errors.email.message}
              </div>
            </div>
          )}
          <div className="relative">
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              class="bg-gray-50 border px-8 mb-4 border-gray-300 focus:outline-none text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-main"
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
              <div className="text-white dark:text-black">
                {errors.password.message}
              </div>
            </div>
          )}
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div className="relative">
              <label
                for="age"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                class="bg-gray-50 border px-8 focus:outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-main"
                placeholder="Enter your age"
                required
                {...register("age")}
              />
              <div className="absolute dark:text-main text-submain text-[20px] bottom-3 px-1">
                <CiCalendar />
              </div>
            </div>
            {errors.age && (
              <div
                className=" flex md:hidden  items-center p-2 mb-2 text-sm text-submain rounded-lg bg-main dark:bg-main dark:text-black"
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
                <div className="text-white dark:text-black">
                  {errors.age.message}
                </div>
              </div>
            )}

            <div className="relative">
              <label
                for="phone"
                class="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                class="bg-gray-50 border siy px-8 dark:focus:border-main focus:outline-none focus:ring-main focus:border-main  text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main "
                placeholder="123-45-678"
                required
                {...register("phone")}
              />
              <div className="absolute dark:text-main text-submain text-[20px] bottom-3 px-1">
                <FaPhoneAlt />
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4 ">
            {errors.age && (
              <div
                className=" flex-grow-0 w-full hidden md:flex  items-center p-2 mb-2 text-sm text-submain rounded-lg bg-main dark:bg-main dark:text-black"
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
                <div className="text-white dark:text-black">
                  {errors.age.message}
                </div>
              </div>
            )}
            {errors.phone && (
              <div
                className="flex flex-grow-0 w-full    items-center p-2 mb-6 md:mb-3 text-sm text-submain rounded-lg bg-main dark:bg-main dark:text-black"
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
                <div className="text-white dark:text-black">
                  {errors.phone.message}
                </div>
              </div>
            )}
          </div>
          <button
            type="submit"
            className=" relative login flex justify-center items-center   bg-submain dark:text-black hover:bg-main hover:text-black text-white dark:bg-main hover:dark:text-white    font-medium rounded-lg text-sm sm:text-md w-full  px-5 py-2.5 text-center  dark:hover:bg-submain dark:hover:text-white"
          >
            {loading ? (
              <div className="flex justify-center items-center h-8 w-8  border-gray-100 rounded-full border-b-3 animate-spin"></div>
            ) : (
              <>
                <p className="text-xs sm:text-base"> Create an Account</p>

                <div className="pl-3 ">
                  <FaLongArrowAltRight />
                </div>
              </>
            )}
          </button>
          <div className="flex justify-center  items-center pt-3">
            <p className="text-center text-submain dark:text-main text-sm sm:text-xl ">
              Already have an account?
            </p>
            <Link
              className="pl-3 text-main dark:text-submain text-xs sm:text-xl"
              to={"login"}
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
