import React from "react";
import { BookChangeStatusButton } from "./BookChangeStatusButton";
import { BookStatus } from "../types";
import { DeleteButton } from "./DeleteButton";

export const BookItem = ({
  bookId,
  bookTitle,
  button1Tag,
  button2Tag,
}: {
  bookId: number;
  bookTitle: string;
  button1Tag: BookStatus;
  button2Tag: BookStatus;
}) => {
  return (
    <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 flex items-center justify-between gap-2">
      <div className="w-[85%] flex flex-col">
        <p className="text-center sm:text-lg">{bookTitle}</p>
        <span className="flex flex-col sm:flex-row gap-2 items-center justify-center">
          <BookChangeStatusButton changeToStatus={button1Tag} bookId={bookId} />
          <BookChangeStatusButton changeToStatus={button2Tag} bookId={bookId} />
        </span>
      </div>
      <DeleteButton bookId={bookId} />
    </li>
  );
};
