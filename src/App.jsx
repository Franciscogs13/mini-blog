import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

//mapeia se a autenticação do usuário foi feita com sucesso
import { onAuthStateChanged } from 'firebase/auth';

//hooks
import { useState, useEffect } from 'react';
import { useAutenticacao } from './hooks/useAutenticacao';

//context
import { AuthProvider } from './context/authContext';

//pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/login/Login';
import Registro from './pages/register/Registro';
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from './pages/Dashboard/Dashboard';
import Search from './pages/Search/Search';
import Post from './pages/Posts/Post';
import EditPost from './pages/EditPost/EditPost';

//components
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAutenticacao();
  //se o valor for undefined significa
  //que está carregando de alguma maneira
  //com isso faço um meio para que não exiba nada
  //até o usuário ser carregado. preciso dessa informação para
  //que partes do sistema seja exibido.
  const loadingUser = user === undefined;

  //sempre que mudar o valor da autenticação ele
  //será mapeado pelo useEffect
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="app">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <NavBar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/search" element={<Search />} />
              <Route path="/posts/:id" element={<Post />} />

              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />

              <Route
                path="/register"
                element={!user ? <Registro /> : <Navigate to="/" />}
              />

              <Route
                path="/posts/edit/:id"
                element={user ? <EditPost/> : <Navigate to="?login"/>}
              />

              <Route
                path="/posts/create"
                element={user ? <CreatePost /> : <Navigate to="/login" />}
              />

              <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
