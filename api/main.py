from fastapi import FastAPI, HTTPException
from database import Book, BookFromDb, UpdateStatusReq

app = FastAPI()

books_read_status = ['to-read', 'in-progress', 'completed']


@app.get("/books/", response_model=list[BookFromDb], tags=["books"])
async def get_all_books():
    books = Book.get_all()
    print(books)
    return books


@app.get("/books/{book_id}", response_model=BookFromDb, tags=["books"], summary="Get a book by ID")
async def get_book(book_id: int):
    book = Book.get_by_id(book_id)
    return book


@app.get("/resetDb", response_model=str, tags=["books"], summary="Reset the database")
async def resetDb():
    Book.delete_all()
    return "The database has been reset"


@app.post("/books/", response_model=BookFromDb, tags=["books"])
async def create_book(book: Book):
    book_exists = Book.get_by_title(book.Title)
    if (book_exists):
        raise HTTPException(status_code=400, detail="Book already exists")
    success = Book.insert_one(book.Title)
    if (success):
        book = Book.get_by_title(book.Title)
        return book
    else:
        raise HTTPException(status_code=400, detail="Book has not been added")


@app.put("/books/{book_id}", response_model=BookFromDb, tags=["books"], summary="Update a book's status")
async def update_book(book_id: int, status: UpdateStatusReq):
    readStatus = status.Status
    book_exists = Book.get_by_id(book_id)
    if (not book_exists):
        raise HTTPException(status_code=400, detail="Book does not exist")
    if (readStatus not in books_read_status):
        raise HTTPException(status_code=400, detail="Status is not valid")
    Book.update_book_status(book_id, readStatus)
    book = Book.get_by_id(book_id)
    return book


@app.delete("/books/{book_id}", response_model=str, tags=["books"], summary="Delete a book")
async def delete_book(book_id: int):
    book_exists = Book.get_by_id(book_id)
    if (not book_exists):
        raise HTTPException(status_code=400, detail="Book does not exist")
    Book.delete_book(book_id)
    return "Book has been deleted"
