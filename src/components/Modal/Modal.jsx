import React, { useContext } from "react";
import { modalcontext } from "../context/Modalcontext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { notecontext } from "../context/Nodecontext";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function Modal({ userNote, editnote }) {
  const { showModal, setshowModal } = useContext(modalcontext);
  const { Addnote, updateNote } = useContext(notecontext);
  const schema = z.object({
    title: z.string().nonempty(" title is required"),
    content: z.string().nonempty(" content is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({ mode: "all", resolver: zodResolver(schema) });

  // const updateItems=async(values, noteid)=>{
  //     try {
  //       const{data}=await updateNote(values, noteid)
  //       console.log(data)
  //     } catch (error) {
  //       console.log(error.response.data.msg)
  //     }
  //   }

  const userNotes = async (values) => {
    try {
      if (editnote) {
        const { data } = await updateNote(values, editnote._id);
        console.log(data);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Note are updated successfully",
          showConfirmButton: false,
          timer: 1500,
      
        });
      } else {
        const { data } = await Addnote(values);
        console.log(data);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Note are added successfully",
          showConfirmButton: false,
          timer: 1500,
      
        });
      }
       
      userNote();
      setshowModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (editnote) {
      setValue("title", editnote.title);
      setValue("content", editnote.content);
    }
  }, []);

  return (
    <>
      <div>
        {/* Modal toggle */}

        {/* Main modal */}
        {showModal ? (
          <div
            id="static-modal"
            data-modal-backdrop="static"
            tabIndex={-1}
            aria-hidden="true"
            className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50  justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
              {/* Modal content */}
              <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {editnote ? "Edit Note" : "  New Note"}
                  </h3>
                  <button
                    onClick={() => setshowModal(false)}
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="static-modal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* Modal body */}
                <form onSubmit={handleSubmit(userNotes)}>
                  <div>
                    <input
                      type="title"
                      class=" border mb-4 border-none dark:bg-gray-700 px-4 md:px-5 w-full pt-2 text-gray-900 text-sm rounded-lg   dark:placeholder-gray-400 dark:text-white  focus:outline-none"
                      placeholder="Note Title"
                      required
                      {...register("title")}
                    />
                    {errors.title && (
                      <div
                        className="flex items-center p-2 mb-2 mx-2  text-sm text-submain rounded-lg bg-main dark:bg-main dark:text-black"
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
                          {errors.title.message}{" "}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="">
                    <textarea
                      rows="2"
                      className="mb-4 pt-10 dark:bg-gray-700 resize-none  border-none px-4 md:px-5  w-full  text-gray-900 text-sm rounded-lg   dark:placeholder-gray-400 dark:text-white  focus:outline-none"
                      name=""
                      id=""
                      required
                      placeholder="Write your thoughts here"
                      {...register("content")}
                    ></textarea>
                    {errors.content && (
                      <div
                        className="flex items-center p-2 mx-2  mb-8 text-sm text-submain rounded-lg bg-main dark:bg-main dark:text-black"
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
                          {errors.content.message}{" "}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button
                      data-modal-hide="static-modal"
                      type="submit"
                      className="text-white bg-submain hover:bg-main  outline-none  font-medium rounded-lg dark:text-black dark:hover:text-white text-sm px-5 py-2.5 block ms-auto text-center dark:bg-main dark:hover:bg-submain "
                    >
                      {isSubmitting ? (
                        <div className="flex justify-center items-center border-b-4 rounded-full w-6 h-6 border-gray-100 animate-spin"></div>
                      ) : (
                        <p>{editnote ? "Update Note" : "Add Note"}</p>
                      )}
                    </button>
                  </div>
                </form>
                {/* Modal footer */}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
