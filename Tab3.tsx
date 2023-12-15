import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonList, IonItem, IonLabel } from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
 
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>About the App</IonCardTitle>
          </IonCardHeader>

      {/* Content explaining the app's purpose */}
          <IonCardContent>
            <p>
              Digital Bookshelf is a place to store the books you have read (or want to read)! Take a picture, save it, and share it with your friends!
            </p>
          </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default Tab3;
