import axios from "axios";
import React, { createContext } from "react";

export const notecontext = createContext();
export default function Nodecontext({ children }) {
  const getNote = async () => {
    try {
      const data = await axios.get(
        `https://note-sigma-black.vercel.app/api/v1/notes`,
        {
          headers: { token: "3b8ny__" + localStorage.getItem("GetToken") },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const Addnote = async (values) => {
    try {
      const data = await axios.post(
        `https://note-sigma-black.vercel.app/api/v1/notes`,
        values,
        {
          headers: { token: "3b8ny__" + localStorage.getItem("GetToken") },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const deleteNote = async (noteid) => {
    try {
      const data = await axios.delete(
        `https://note-sigma-black.vercel.app/api/v1/notes/${noteid}`,
        {
          headers: { token: "3b8ny__" + localStorage.getItem("GetToken") },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const updateNote = async (values, noteid) => {
    try {
      const data = await axios.put(
        `https://note-sigma-black.vercel.app/api/v1/notes/${noteid}`,
        values,
        {
          headers: { token: "3b8ny__" + localStorage.getItem("GetToken") },
        }
      );
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return (
    <notecontext.Provider value={{ Addnote, getNote, deleteNote ,updateNote }}>
      {children}
    </notecontext.Provider>
  );
}
