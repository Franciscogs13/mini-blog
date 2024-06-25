import React from 'react';

import Styles from './CreatePost.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// consigo pegar o usuário e atrelar ele ao post
// dessa maneira consigo fazer minha dashboard
import { useAuthValue } from '../../context/authContext';

import { useInsertDocument } from '../../hooks/useInsertDocument';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [imagem, setImagem] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState('');

  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument('posts');

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    //validar url da imagem
      try {
        new URL(imagem)
      } catch (error) {
        setFormError("A imagem precisa ser uma URL.")
      }
    //criar array de tags
      const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())

    //checar todos os valores
      if(!title || !imagem || !tags ||!body){
        setFormError("Por favor, preencha todos os campos.")
      }

    if(formError) return;

    insertDocument({
      title,
      imagem,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    //redirect HomePage
    navigate("/")
  };

  return (
    <div className={Styles.create_post}>
      <h2>Criar Post</h2>
      <p>Escreva sobre o que quiser e compartilhe suas histórias</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="title"
            required
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
            required
            placeholder="insira uma imagem"
            onChange={(e) => setImagem(e.target.value)}
            value={imagem}
          />
        </label>
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
            required
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {!response.loading && <button className="btn">Criar</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde
          </button>
        )}
        {(response.error || formError) && (
          <p className="error">{response.error || formError}</p>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
