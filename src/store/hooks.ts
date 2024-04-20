// Import necessary functions and types from the 'react-redux' library
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import { TypedUseSelectorHook } from "react-redux/es/types";

// Import custom types from the root index file
import { AppDispatch, RootState } from "./index";

// Define a custom hook to retrieve the Redux dispatch function
// This hook is used to dispatch actions to the Redux store
export const useAppDispatch: () => AppDispatch = useDispatch;

// Define a custom hook to retrieve the selected state from the Redux store
// This hook is used to access and read values from the Redux store state
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
