import React from 'react';
import { Link } from 'react-router-dom';
//css
import Styles from "./Search.module.css"


//hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useQuery } from '../../hooks/useQuery';

//components
import PostDetails from '../../components/PostDetails';

const Search = () => {
  const query = useQuery();
  const search = query.get('q');

  const { documents: posts } = useFetchDocuments('posts', search);

  return (
    <div className={Styles.search_container}>
      <h2>Resultados da pesquisa:</h2>
      <div className='posts_list'>
        {posts && posts.length === 0 && (
          <div className={Styles.noPosts}>
            <p>
              Não foram encontrados posts a partir da sua busca
            </p>
            <Link to='/' className='btn btn_dark'>Voltar</Link>
          </div>
        )}
        {posts &&
          posts.map((post) => <PostDetails key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Search;
