import Styles from './EditPost.module.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// consigo pegar o usuário e atrelar ele ao post
// dessa maneira consigo fazer minha dashboard
import { useAuthValue } from '../../context/authContext';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';
import { useFetchDocument } from '../../hooks/useFetchDocument';

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument('posts', id);

  const [title, setTitle] = useState('');
  const [imagem, setImagem] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImagem(post.imagem);

      const textTags = post.tagsArray.join(', ');

      setTags(textTags);
    }
  },[post]);

  const { user } = useAuthValue();

  const { updateDocument, response } = useUpdateDocument('posts');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    //validar url da imagem
    try {
      new URL(imagem);
    } catch (error) {
      setFormError('A imagem precisa ser uma URL.');
    }
    //criar array de tags
    const tagsArray = tags.split(',').map((tag) => tag.trim());

    //checar todos os valores
    if (!title || !imagem || !tags || !body) {
      setFormError('Por favor, preencha todos os campos.');
    }

    if (formError) return;

    const data ={ 
      title,
      imagem,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    }

    updateDocument(id, data);

    //redirect HomePage
    navigate('/dashboard');
  };

  return (
    <div className={Styles.edit_post}>
      {post && (
        <>
          <h2>Editar Post: {post.title}</h2>
          <p>Não esqueça de salvar as alterações após a edição</p>
          <form onSubmit={handleSubmit} className={Styles.form}>
            <label>
              <span>Título:</span>
              <input
                type="text"
                name="title"
                placeholder="Título do seu post"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </label>
            <label>
              <span>URL da imagem:</span>
              <input
                type="text"
                name="imagem"
                placeholder="insira uma imagem"
                onChange={(e) => setImagem(e.target.value)}
                value={imagem}
              />
            </label>
            <p className={Styles.preview_title}>Preview da imagem</p>
            <img className={Styles.img_preview} src={post.imagem} alt={post.imagem}/>
            <label>
              <span>Conteúdo:</span>
              <textarea
                name="body"
                required
                placeholder="Insira o conteúdo do seu post"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              ></textarea>
            </label>
            <label>
              <span>Tags:</span>
              <input
                type="text"
                name="tags"
                placeholder="Insira as tags separadas por vírgula"
                onChange={(e) => setTags(e.target.value)}
                value={tags}
              />
            </label>
            {!response.loading && <button className="btn">Salvar</button>}
            {response.loading && (
              <button className="btn" disabled>
                Aguarde
              </button>
            )}
            {(response.error || formError) && (
              <p className="error">{response.error || formError}</p>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;
