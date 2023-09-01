"use client";
import React, { useRef } from "react";
import { insertBook } from "../actions";

export const CreateBookForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = React.useState<string | null>(null);

  return (
    <form
      className="flex-col flex items-center gap-4"
      action={async (formData) => {
        const response = await insertBook(formData);
        if (response.detail) {
          setError(response.detail);
          setTimeout(() => {
            setError(null);
          }, 3000);
        }
        formRef.current?.reset();
      }}
      ref={formRef}
    >
      <div>
        <input
          type="text"
          id="title"
          name="title"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="The Great Gatsby"
          required
        />
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Enter
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};
