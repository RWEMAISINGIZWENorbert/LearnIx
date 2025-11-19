import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import { store } from './store/store.js'
import { BrowserRouter } from 'react-router-dom'
import { setAuthFromStorage } from './features/auth/authSlice';

const token = localStorage.getItem('token');
const role = localStorage.getItem('role');

// If we have a token and role, set the auth state
if (token && role) {
  store.dispatch(setAuthFromStorage());
}



createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
       <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
