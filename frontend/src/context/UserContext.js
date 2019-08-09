import { createContext } from "react";
const UserContext = createContext(false);
const AddContactContext = createContext();
const EditContactContext = createContext();
const SortContext = createContext();
export { UserContext, AddContactContext, EditContactContext, SortContext };
