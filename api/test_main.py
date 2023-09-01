from main import app
import pytest
from fastapi.testclient import TestClient

client = TestClient(app)


def create_book_in_db(title):
    return client.post("/books", json={"Title": title})


def update_book_status_in_db(book_id, status):
    return client.put(f"/books/{book_id}", json={"Status": status})


@pytest.fixture
def resetDb():
    response = client.get("/resetDb")
    assert response.status_code == 200
    assert response.json() == "The database has been reset"


def test_get_all_books(resetDb):
    response = client.get("/books")
    assert response.status_code == 200
    assert response.json() == []


def test_create_book(resetDb):
    db_before_insertion = client.get("/books").json()
    response = create_book_in_db("The Hobbit")
    db_after_insertion = client.get("/books").json()
    title_exists = False
    assert response.status_code == 200
    if (response.json()["Title"] == "The Hobbit"):
        title_exists = True
    assert title_exists
    assert len(db_after_insertion) == len(db_before_insertion) + 1


def test_create_book_fails_if_already_in_db(resetDb):
    test_create_book(resetDb)
    db_before_insertion = client.get("/books").json()
    response = client.post("/books", json={"Title": "The Hobbit"})
    db_after_insertion = client.get("/books").json()
    assert len(db_before_insertion) == len(db_after_insertion)
    assert response.status_code == 400
    assert response.json() == {"detail": "Book already exists"}


def test_update_book_status(resetDb):
    test_create_book(resetDb)
    book = client.get("/books").json()[0]
    book_id = book["ID"]
    book_title = book["Title"]
    response = update_book_status_in_db(book_id, "completed")
    assert response.status_code == 200
    assert response.json()["Status"] == "completed"
    response_after_updation = client.get(f"/books/{book_id}").json()
    assert response_after_updation["Status"] == "completed"
    assert response_after_updation["Title"] == book_title


def test_update_book_status_fails_if_book_does_not_exist(resetDb):
    response = update_book_status_in_db(1, "completed")
    assert response.status_code == 400
    assert response.json() == {"detail": "Book does not exist"}
