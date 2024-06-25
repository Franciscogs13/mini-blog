import React from 'react';
import Styles from './Home.module.css';

//hooks
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

//components
import PostDetails from '../../components/PostDetails';

const Home = () => {
  const [query, setQuery] = useState('');
  const { documents: posts, loading } = useFetchDocuments('posts');

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className={Styles.home}>
      <h1>Post mais Recentes</h1>
      <form onSubmit={handleSubmit} className={Styles.search_form}>
        <input
          type="text"
          placeholder="faça a busca usando tags"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className={Styles.btn}>Pesquisar</button>
      </form>
      <div>
        {loading && <p>Carregando</p>}
        {posts &&
          posts.map((post) => <PostDetails key={post.id} post={post} />)}
        {posts && posts.length === 0 && (
          <div className={Styles.noPost}>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className="btn">
              Criar Post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
