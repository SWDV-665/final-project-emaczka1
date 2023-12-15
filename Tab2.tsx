import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel } from '@ionic/react';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>How to use</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
       


        {/* Content explaining how to use the app */}
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>Welcome to Digital Bookshelf!</IonCardSubtitle>
            <IonCardTitle>Getting Started</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <p>
              To get started, follow these steps:
            </p>
            <IonList>
              <IonItem>
                <IonLabel>Step 1:</IonLabel>
                <p>Click the Camera button to take or upload a photo of a book.</p>
              </IonItem>
              <IonItem>
                <IonLabel>Step 2:</IonLabel>
                <p>Add the title of the book and the name of it's author.</p>
              </IonItem>
              <IonItem>
                <IonLabel>Step 3:</IonLabel>
                <p>Swipe left on a book to delete it or share it.</p>
              </IonItem>
            </IonList>
            <p>
              Enjoy using the app!
            </p>
          </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default Tab2;
