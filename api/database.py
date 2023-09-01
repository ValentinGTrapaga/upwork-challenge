from pymysql import connect, cursors
import os
from dataclasses import dataclass
from pydantic import BaseModel


@dataclass
class BookRepository():
    def connection_db():
        connection = connect(host=os.environ.get("DATABASE_HOST"),
                             port=3306,
                             user=os.environ.get("DATABASE_USERNAME"),
                             password=os.environ.get("DATABASE_PASSWORD"),
                             database=os.environ.get("DATABASE"),
                             cursorclass=cursors.DictCursor)
        return connection

    def query_get(query):
        connection = BookRepository.connection_db()
        with connection:
            try:
                with connection.cursor() as cursor:
                    cursor.execute(query)
                    queryData = cursor.fetchall()
                    return queryData
            except:
                return "Error"

    def query_put(query, params):
        connection = BookRepository.connection_db()
        with connection:
            try:
                with connection.cursor() as cursor:
                    cursor.execute(query, params)
                    connection.commit()
                    return "Success"
            except:
                return "Error"


@dataclass
class BookFromDb(BaseModel):
    ID: int
    Title: str
    Status: str


@dataclass
class UpdateStatusReq(BaseModel):
    Status: str


@dataclass
class Book(BaseModel):
    Title: str

    def get_all() -> list[BookFromDb]:
        books = BookRepository.query_get("SELECT * FROM books")
        return books

    def insert_one(title: str) -> str:
        book = BookRepository.query_put(
            "INSERT INTO books (Title) VALUES (%s)", (title))
        return book

    def get_by_id(book_id) -> BookFromDb:
        book = BookRepository.query_get(
            f"SELECT * FROM books WHERE ID = {book_id}")
        if (len(book) == 0):
            return False
        return book[0]

    def get_by_title(title) -> BookFromDb | bool:
        books = BookRepository.query_get(
            f"SELECT * FROM books WHERE Title = '{title}'")
        if (len(books) == 0):
            return False
        return books[0]

    def delete_book(book_id) -> str:
        book = BookRepository.query_put(
            "DELETE FROM books WHERE ID = (%s)", (book_id))
        return book

    def delete_all():
        book = BookRepository.query_put("DELETE FROM books", ())
        return book

    def update_book_status(book_id, status) -> str:
        book = BookRepository.query_put(
            "UPDATE books SET status = (%s) WHERE ID = (%s)", (status, book_id))
        return book
