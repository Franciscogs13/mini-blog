import React from 'react';
import { Link } from 'react-router-dom';

//context
import { useAuthValue } from '../../context/authContext';
//hook
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useDeleteDocument } from '../../hooks/useDeleteDocument';

import Styles from './Dasboard.module.css';

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  //post do usuário
  const { documents: posts, loading } = useFetchDocuments('posts', null, uid);

  const { deleteDocument } = useDeleteDocument('posts');

  if (loading) {
    return <p>Carregando</p>;
  }

  return (
    <div className={Styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerenciar Posts</p>
      {posts && posts.length === 0 ? (
        <div className={Styles.noposts}>
          <p>Você não possui nenhum post</p>
          <Link to="/posts/create" className="btn">
            Criar primeiro post
          </Link>
        </div>
      ) : (
        <>
          <div className={Styles.post_header}>
            <span>Título</span>
            <span>Ações</span>
          </div>

          {posts &&
            posts.map((post) => (
              <div key={post.id} className={Styles.post_row}>
                <p>{post.title}</p>
                <div>
                  <Link to={`/posts/${post.id}`} >
                    <button className={Styles.btn}>Ver</button>
                  </Link>
                  <Link
                    to={`/posts/edit/${post.id}`}
                    
                  >
                    <button className={Styles.btn}>Editar</button>
                  </Link>
                  <Link>
                  <button
                    onClick={() => deleteDocument(post.id)}
                    className={Styles.btn}
                  >
                    Excluir
                  </button>
                  </Link>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Dashboard;
