import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonImg, IonFab, IonFabButton, IonIcon, IonModal, IonButton, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/react';
import { cameraOutline, closeOutline } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { BookService, Book } from '../services/book.service';
import { trash, share } from 'ionicons/icons';
import './Tab1.css';
import { Share } from '@capacitor/share';


const bookService = new BookService(); // Create an instance of the book service


const Tab1: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [photo, setPhoto] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  // Take photo using decive's camera 
  const takePhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
      });
      
      if (image.webPath) {
        setPhoto(image.webPath);
        setShowModal(true);
      } else {
        console.error('Error: webPath is undefined');
      }
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  };

  // Function to save a book
  const saveBook = async () => {
    const book = { title, author, photo };
    console.log('Book to be saved:', book); 
    await bookService.addBook(book, photo);
    loadBooks(); // Reload list of books
    setShowModal(false);
    setPhoto('');
    setTitle('');
    setAuthor('');
  };

  // Function to remove a book
  const removeBook = async (id: number) => {
    await bookService.removeBook(id);
    loadBooks();
  };

  // Load books form storage
  const loadBooks = async () => {
    const fetchedBooks = await bookService.getBooks();
    setBooks(fetchedBooks);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  // Function to share a book
  const shareBook = async (book: Book) => {
    console.log('Sharing book:', book);

    if (book && typeof book.title === 'string' && typeof book.author === 'string' && typeof book.photo === 'string') {
      try {
        const subject = `Check out: ${book.title}`;
        const message = `Title: ${book.title}, Author: ${book.author}`;
        const url = book.photo;
  
        await Share.share({
          title: subject,
          text: message,

        });
        
        console.log('Shared Successfully!');
      } catch (error) {
        console.error('Error sharing book:', error);
      }
    } else {
      console.error('Invalid book object:', book);
    }
  };
  

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>Bookshelf</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonList>
          {books.map((book: Book) => (
            <IonItemSliding key={book.id}>
            <IonItem>
              <IonLabel>
                <h2>{book.title}</h2>
                <p>{book.author}</p>
              </IonLabel>
              <IonImg src={book.photo} style={{ maxWidth: '400px', height: 'auto' }} />
            </IonItem>
            <IonItemOptions side="end">
              
              {/* delete button */}
              <IonItemOption onClick={() => removeBook(book.id)}>
                <IonIcon icon={trash} />
                Delete
              </IonItemOption>

            {/* share button */}
            <IonItemOption onClick={() => shareBook(book)}>
              <IonIcon icon={share} />
              Share
            </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
          ))}
        </IonList>

        {/* camera button */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={takePhoto}>
            <IonIcon icon={cameraOutline} />
          </IonFabButton>
        </IonFab>

        <IonModal isOpen={showModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Add Book</IonTitle>
            </IonToolbar>
          </IonHeader>

          {/* display content */}
          <IonContent>
            <IonImg src={photo} />

            {/* title input */}
            <IonItem>
              <IonLabel position="stacked">Title</IonLabel>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </IonItem>

            {/* author input */}
            <IonItem>
              <IonLabel position="stacked">Author</IonLabel>
              <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
            </IonItem>

            {/* save button */}
            <IonButton onClick={saveBook}>Save Book</IonButton>
            <IonButton onClick={() => setShowModal(false)}>
              <IonIcon icon={closeOutline} slot="start" />
              Cancel
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;