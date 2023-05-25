import { createContext } from 'react';

import { IUser } from '../../App';

export interface IAuthContext {
  users: IUser[];
  currentUser: IUser | null;
  setCurrentUser: (user: IUser | null) => void;
}

export const AuthContext = createContext<IAuthContext>({
  users: [],
  currentUser: null,
  setCurrentUser: () => {},
});
