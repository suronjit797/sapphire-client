import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

axios.defaults.baseURL = 'https://assignment-12-sp.herokuapp.com/'
// axios.defaults.baseURL = 'http://localhost:5000/'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
