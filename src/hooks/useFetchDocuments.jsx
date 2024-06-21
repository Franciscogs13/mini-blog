import { useState, useEffect } from 'react';
import { dataBase } from '../firebase/config';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  QuerySnapshot,
  waitForPendingWrites,
} from 'firebase/firestore';

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // deal with memmory leak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) {
        return;
      }

      setLoading(true);

      const collectionRef = await collection(dataBase, docCollection);

      try {
        let qry;
        //busca
        //dashboard
        if (search) {
          qry = await query(
            collectionRef,
            where('tagsArray', 'array-contains', search),
            orderBy('createdAt', 'desc'),
          );
        } else if (uid) {
          (qry = await query(collectionRef, where('uid', '==', uid))),
            orderBy('createdAt', 'desc');
        } else {
          qry = await query(collectionRef, orderBy('createdAt', 'desc'));
        }

        //mapear os dados, sempre que houver um dado alterado
        //ele trará este dado renovado pra gente, ou seja,
        //se for adicionado um dado novo na coleção ele vai marcar os dados que tenho
        //verá que tem diferença e vai trazer
        await onSnapshot(qry, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })),
          );
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);

        setLoading(false);
      }
    }
    loadData();
  }, [docCollection, search, uid, cancelled]);

  useEffect(() => {
    return setCancelled(true);
  }, []);

  return { documents, loading, error };
};
