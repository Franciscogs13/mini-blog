import { useState, useEffect, useReducer } from 'react';
import { dataBase } from '../firebase/config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

//inicio do reducer
const initializeState = {
  loading: null,
  error: null,
};

const insertReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { loading: true, error: null };
    case 'INSERTED_DOC':
      return { loading: false, error: null };
    case 'ERROR':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useInsertDocument = (docCollection) => {
  const [response, dispatch] = useReducer(insertReducer, initializeState);

  //deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const checkCancelledBeforeDspatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const insertDocument = async (document) => {
    checkCancelledBeforeDspatch({
      type: 'LOADING',
    });

    try {
      const novoDocumento = { ...document, createdAt: Timestamp.now() };

      const insertedDocument = await addDoc(
        collection(dataBase, docCollection),
        novoDocumento,
      );

      checkCancelledBeforeDspatch({
        type: 'INSERTED_DOC',
        payload: insertedDocument,
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
  return { insertDocument, response };
};
