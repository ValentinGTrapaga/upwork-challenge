import { BookList } from "./components/BookList";
import { CreateBookForm } from "./components/CreateBookForm";
import { API_URL } from "./components/utils";
import { Book } from "./types";

async function fetchBooks() {
  const response = await fetch(API_URL, {
    cache: "no-cache",
    next: { tags: ["books"] },
  });
  const json = await response.json();
  console.log(json);
  return json;
}

export default async function Home() {
  const books: Book[] = await fetchBooks();

  const booksToRead = books?.filter((book) => book.Status === "to-read");
  const booksReading = books?.filter((book) => book.Status === "in-progress");
  const booksRead = books?.filter((book) => book.Status === "completed");

  return (
    <main className="flex min-h-screen min-w-screen flex-col items-center justify-center p-24 gap-4">
      <h1 className="text-4xl text-center">Welcome to your library</h1>
      <p className="text-center">Insert the book title to add to your list</p>
      <CreateBookForm />
      <div className="flex-col lg:flex-row w-full h-full gap-4 sm:flex">
        <BookList books={booksToRead} columnName="To read" />
        <BookList books={booksReading} columnName="In progress" />
        <BookList books={booksRead} columnName="Completed" />
      </div>
    </main>
  );
}
