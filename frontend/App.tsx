import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { auth } from "./src/api/firebaseConfig"; // Firebase Auth
import { onAuthStateChanged } from "firebase/auth";
import SocketService from "./src/socket/socket.gateway";
const App: React.FC = () => {
  React.useEffect(() => {
    // Example: Check if a user is logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is logged in:", user);
      } else {
        console.log("No user is logged in");
      }
    });
    SocketService.listenForLocationAlert((data) => {
      console.log(data);
    });
    // Cleanup the subscription
    return () => unsubscribe();
  }, []);

  return <AppNavigator />;
};

export default App;
