import { useState, useEffect, useReducer } from 'react';
import { dataBase } from '../firebase/config';
import { doc, deleteDoc } from 'firebase/firestore';

//inicio do reducer
const initializeState = {
  loading: null,
  error: null,
};

const deleteReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { loading: true, error: null };
    case 'DELETED_DOC':
      return { loading: false, error: null };
    case 'ERROR':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useDeleteDocument = (docCollection) => {
  const [response, dispatch] = useReducer(deleteReducer, initializeState);

  //deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const checkCancelledBeforeDspatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const deleteDocument = async (id) => {
    checkCancelledBeforeDspatch({
      type: 'LOADING',
    });

    try {
      const deletedDocument = await deleteDoc(doc(dataBase, docCollection, id));

      checkCancelledBeforeDspatch({
        type: 'DELETED_DOC',
        payload: deletedDocument,
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
  return { deleteDocument, response };
};
