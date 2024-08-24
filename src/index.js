import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ScrollToTop } from './components';
import { CartProvider } from './context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    {/** This is from a React dependency that allows this project to be able to navigate different webpages. 
     * Common components used in this project are navigate("/...") <Navigate to="/..."/> and <Link to="/..."
     */}
    <BrowserRouter>

      {/**
       * CartProvider is a context using react Context a library allowing data to move to different components without needing to manualy moving there
       * this is used as a the cart to hold the products in. 
       * A downside is that the cart is the browser RAM which results in the cart being cleared when the page is reloaded.
       */}
      <CartProvider> 

        {/**
         * This Component is used to change the position of the viewer to the top of the screen renders a new webpage, since react doesn't support by itself
         */}
          <ScrollToTop />

          {/**
           * Dependency that create notification when needed for simplicity
           */}
          <ToastContainer closeButton={false} autoClose={3000} position={"bottom-right"} />

          {/**
           * the main content
           */}
          <App />
          
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);