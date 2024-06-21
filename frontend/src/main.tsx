import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/auth-context.tsx';
import { SocketContextProvider } from './context/socket-context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthContextProvider>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
)
