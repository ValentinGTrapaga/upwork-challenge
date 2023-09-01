import React from "react";
import { type ColumnName, type Book, BookStatus } from "../types";
import { BookItem } from "./BookItem";

export const BookList = ({
  books,
  columnName,
}: {
  books: Book[];
  columnName: ColumnName;
}) => {
  const {
    button1Tag,
    button2Tag,
  }: { button1Tag: BookStatus; button2Tag: BookStatus } = (() => {
    switch (columnName) {
      case "To read":
        return {
          button1Tag: "in-progress",
          button2Tag: "completed",
        };
      case "In progress":
        return {
          button1Tag: "to-read",
          button2Tag: "completed",
        };
      case "Completed":
        return {
          button1Tag: "to-read",
          button2Tag: "in-progress",
        };
    }
  })();

  return (
    <section className="flex flex-col h-full flex-1 gap-2">
      <h2 className="font-bold text-center ">{columnName}</h2>
      {books.length > 0 ? (
        <ul className="text-sm font-medium text-gray-900 bg-white border rounded-sm border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          {books.map((book) => (
            <BookItem
              key={book.ID}
              bookId={book.ID}
              bookTitle={book.Title}
              button1Tag={button1Tag}
              button2Tag={button2Tag}
            />
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No books yet</p>
      )}
    </section>
  );
};
