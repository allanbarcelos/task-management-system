import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { store } from './store';
import { Provider } from 'react-redux';
import { AuthProvider } from '@providers/AuthProvider';
import Exceptions from '@components/Exceptions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Provider store={store}>
        <AuthProvider>
          <Exceptions>
            <RouterProvider router={router} />
          </Exceptions>
        </AuthProvider>
      </Provider>
    </>
  );
}

export default App;