import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import store from './app/store'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorComponent from './components/Error/ErrorComponent'
import StartScreen from './components/Start/StartScreen'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorComponent />,
    children: [
      {
        path: '/invite/:inviteKey',
        element: <StartScreen />,
      },
      {
        path: '/start',
        element: <StartScreen />,
      },
    ],
  },
  {
    path: '*',
    element: <App />,
    errorElement: <ErrorComponent />,
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter> */}
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
)
