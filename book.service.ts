export interface Book {
    id: number;
    title: string;
    author: string;
    photo: string; // URL representation of the photo
  }
  
  export class BookService {
    private static BOOKS_KEY = 'books';
  

    // save books to storage
    private saveBooksToStorage(books: Book[]): void {
      localStorage.setItem(BookService.BOOKS_KEY, JSON.stringify(books));
    }
  
    // retrieve books from storage
    private getBooksFromStorage(): Book[] {
      const storedBooks = localStorage.getItem(BookService.BOOKS_KEY);
      return storedBooks ? JSON.parse(storedBooks) : [];
    }
  
    // add a new book to storage
    async addBook(book: Partial<Book>, photoURL: string): Promise<void> {
      const existingBooks = this.getBooksFromStorage();
  
      const bookWithId: Book = {
        id: book.id || generateId(),
        title: book.title || '',
        author: book.author || '',
        photo: photoURL || '',
      };
  
      console.log('Book to be added:', bookWithId);

      const updatedBooks = [...existingBooks, bookWithId];
      this.saveBooksToStorage(updatedBooks);
    }

    // remove a book from storage and delete it from the page
    async removeBook(bookId: number): Promise<void> {
        const existingBooks = this.getBooksFromStorage();
        const updatedBooks = existingBooks.filter((book) => book.id !== bookId);
        this.saveBooksToStorage(updatedBooks);
      }
  
    // retrieve all books
    async getBooks(): Promise<Book[]> {
      return this.getBooksFromStorage();
    }
}
  
  // Function to generate a unique ID
  function generateId(): number {
    return new Date().getTime();
  }
  