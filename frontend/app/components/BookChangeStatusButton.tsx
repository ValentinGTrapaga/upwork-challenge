"use client";

import React from "react";
import { BookStatus } from "../types";
import { buttonTags } from "./utils";
import { updateBook } from "../actions";

export const BookChangeStatusButton = ({
  bookId,
  changeToStatus,
}: {
  bookId: number;
  changeToStatus: BookStatus;
}) => {
  const handleUpdateBookStatus = async () => {
    await updateBook(bookId, changeToStatus);
  };

  const buttonTag = buttonTags[changeToStatus];
  return (
    <button
      onClick={handleUpdateBookStatus}
      className="bg-blue-100 w-24 hover:bg-blue-200 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 inline-flex items-center justify-center"
    >
      {buttonTag}
    </button>
  );
};
