import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Login from './Login';
import Register from './Register'
import Create from './Create';
import Poll from './Poll';
import CreateExam from './CreateExam';
import Exam from './Exam';
import UserAccount from './UserAccount';
import ExamResponses from './ExamResponses';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path:'/',
    element: <App/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/register',
    element:<Register/>
  },
  {
    path:'/poll/create',
    element:<Create/>
  },
  {
    path:'/poll/respond/:id',
    element:<Poll/>
  },
  {
    path:'/exam/create',
    element:<CreateExam/>
  },
  {
    path:'/exam/respond/:id',
    element:<Exam/>
  },
  {
    path:'/exam/responses/:id',
    element:<ExamResponses/>
  },
  {
    path:'/account',
    element:<UserAccount/>
  }
])


root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
