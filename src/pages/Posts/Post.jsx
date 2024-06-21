import React from 'react';
import Styles from './Post.module.css';

//hooks
import { useParams } from 'react-router-dom';
import { useFetchDocument } from '../../hooks/useFetchDocument';

const Post = () => {
  const { id } = useParams();
  const { document: post, loading } = useFetchDocument('posts', id);

  return (
    <div className={Styles.post_container}>
      {loading && <p>Carregando informações do Post</p>}
      {post && (
        <>
          <h1>{post.title}</h1>
          <img src={post.imagem} alt={post.title}></img>
          <p>{post.boy}</p>
          <h3>Tags</h3>
          <div className={Styles.tags}>
            {post.tagsArray.map((tag) => (
              <p key={tag}>
                <span>#</span>
                {tag}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
