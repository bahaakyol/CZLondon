import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Provider } from 'react-redux';

import { AuthContext } from './src/context/authContext';
import Navigation from './src/navigation/Navigation';
import store from './src/store';

export type UserType = 'admin' | 'manager' | 'user';

export interface IUser {
  id: number;
  username: string;
  password: string;
  type: UserType;
}

const users: IUser[] = [
  { id: 1, username: 'admin', password: 'admin', type: 'admin' },
  { id: 2, username: 'manager', password: 'manager', type: 'manager' },
  { id: 3, username: 'user', password: 'user', type: 'user' },
];

export default function App() {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  return (
    <AuthContext.Provider value={{ users, currentUser, setCurrentUser }}>
      <Provider store={store}>
        <Navigation />
        <StatusBar style="auto" />
      </Provider>
    </AuthContext.Provider>
  );
}
