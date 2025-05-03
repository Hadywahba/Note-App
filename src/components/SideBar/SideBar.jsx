import React, { useContext, useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BsPersonFillAdd } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { FaSun } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { IoMdClose, IoMdCloseCircle, IoMdLogIn } from "react-icons/io";
import { IoMoonSharp } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { tokencontext } from "../context/tokenContext";
import Swal from "sweetalert2";

export default function SideBar() {
  const ref = useRef(null);
  let [showoption, setshowoption] = useState(false);
  let [openSideBar, setopenSideBar] = useState(false);
  let [dark, setdark] = useState(false);
  const navigate = useNavigate();
  const { token, settoken } = useContext(tokencontext);
  useEffect(() => {
    const saveMode = localStorage.getItem("theme");
    if (saveMode == "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  function darkMode() {
    const mode = !dark;
    setdark(mode);
    if (mode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }
  function toggleButton() {
    setopenSideBar(!openSideBar);
  }

  const logout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your account",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sign out!",
    }).then((result) => {
      if (result.isConfirmed) {
        settoken(null);
        localStorage.removeItem("GetToken");
        navigate("/login");
      }
    });
  };
  return (
    <div className={``}>
      <aside
        className={`fixed top-0 left-0 z-40 w-full ${
          openSideBar ? "visible" : "hidden"
        }  sm:w-20 sm:block   h-screen   transition-transform  bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        id="logo-sidebar"
        aria-label="Sidebar"
      >
        <div
          className={`h-full    flex flex-col justify-between   overflow-y-auto bg-gray-200 dark:bg-gray-800`}
        >
          <div className=" flex gap-3 flex-col pt-4   items-center justify-start  ">
            <button className="p-2 text-gray-900 rounded-lg dark:text-white">
              <span className="ms-3 text-center cursor-default">Note </span>
            </button>
            <hr className=" border-gray-500 w-full mb-5" />

            {token ? (
              <>
                <div className="flex flex-col  items-center gap-3">
                  <button
                    onClick={() => {
                      setshowoption(!showoption);
                      setopenSideBar(false);
                    }}
                  >
                    <FaCirclePlus
                      className={`text-3xl  text-black dark:text-white ${
                        showoption ? "rotate-45" : ""
                      }`}
                    />
                  </button>

                  <div
                    onClick={() => setshowoption(false)}
                    className={`text-white text-sm cursor-pointer  bg-slate-400 rounded-md p-1 ${
                      showoption ? "visible" : "hidden"
                    } `}
                  >
                    add note
                  </div>
                </div>
              </>
            ) : (
              <>
                <NavLink
                  to={"register"}
                  className="text-3xl  text-black dark:text-white"
                  onClick={()=>{  setopenSideBar(false);}}
                >
                  <BsPersonFillAdd />
                </NavLink>
                <NavLink
                  to={"login"}
                  onClick={()=>{  setopenSideBar(false);}}
                  className="text-3xl text-black dark:text-white "
                >
                  <IoMdLogIn />
                </NavLink>
              </>
            )}
          </div>

          <div className=" flex flex-col pb-10 items-center justify-end mt-10 ">
            {token ? (
              <>
                <div
                  onClick={() => {
                    logout();
                    setopenSideBar(false);
                  }}
                  className="text-3xl cursor-pointer  text-black dark:text-white"
                >
                  <CiLogout />
                </div>
              </>
            ) : (
              ""
            )}

            <hr className=" border-gray-500 w-full my-3" />
            <button
              onClick={() => {
                darkMode();
                setopenSideBar(false);
              }}
              className={" text-3xl   text-black dark:text-white "}
              ref={ref}
            >
              {dark ? <IoMoonSharp /> : <FaSun />}
            </button>
          </div>
        </div>
      </aside>
      <div className="p-4 sm:ml-64"></div>


      
      <nav className="fixed top-0 z-50 w-full  ">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                onClick={toggleButton}
                type="button"
                className=" right-3 absolute top-3 p-2 text-sm  text-black rounded-lg sm:hidden  focus:outline-none  dark:text-black   dark:bg-slate-500"
              >
                <span className="sr-only">Open sidebar</span>
                {openSideBar ? (
                  <>
                    <div className="text-2xl">
                      {" "}
                      <IoMdClose />
                    </div>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-6 h-6"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
