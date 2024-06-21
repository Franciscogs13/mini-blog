import Styles from './PostDetails.module.css';

import { Link } from 'react-router-dom';

import React from 'react';

const PostDetails = ({ post }) => {
  return (
    <div className={Styles.post_detail}>
      <img src={post.imagem} alt={post.title} />
      <h2>{post.title}</h2>
      <p className={Styles.createdby}>por: {post.createdBy}</p>
      <div className={Styles.tags}>
        {post.tagsArray.map((tag) => (
          <p key={tag}>
            <span>#</span>
            {tag}
          </p>
        ))}
      </div>
      <Link to={`/posts/${post.id}`} className='btn btn_outline'>Detalhes</Link>
    </div>
  );
};

export default PostDetails;
