import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './App';
import NotKnown from './components/NotKnown/NotKnown'
import CampaignsList from './components/CampaignsList/CampaignsList';
import CampaignForm from './components/CampaignForm/CampaignForm';
import NavBar from './components/NavBar/NavBar';
import EditCampaignForm from './components/EditCampaignForm/EditCampaignForm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route exact path="/products/:productName/create" element={<CampaignForm />} />
        <Route exact path="/products/:productName/:index/update" element={<EditCampaignForm />} />
        <Route exact path="/products/:productName" element={<CampaignsList />} />
        <Route path="*" element={<NotKnown />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
