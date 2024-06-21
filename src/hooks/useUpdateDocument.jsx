import { useState, useEffect, useReducer } from 'react';
import { dataBase } from '../firebase/config';
import { updateDoc, doc } from 'firebase/firestore';

//inicio do reducer
const initializeState = {
  loading: null,
  error: null,
};

const updateReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { loading: true, error: null };
    case 'UPDATED_DOC':
      return { loading: false, error: null };
    case 'ERROR':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useUpdateDocument = (docCollection) => {
  const [response, dispatch] = useReducer(updateReducer, initializeState);

  //deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const checkCancelledBeforeDspatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const updateDocument = async (id, data) => {
    checkCancelledBeforeDspatch({
      type: 'LOADING',
    });

    try {
      const docRef = await doc(dataBase, docCollection, id);
      const updatedDocument = await updateDoc(docRef, data);

      checkCancelledBeforeDspatch({
        type: 'UPDATED_DOC',
        payload: updatedDocument,
      });
    } catch (error) {
      checkCancelledBeforeDspatch({
        type: 'ERROR',
        payload: error.message,
      });
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);
  return { updateDocument, response };
};
