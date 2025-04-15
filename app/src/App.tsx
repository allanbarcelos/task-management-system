import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { store } from './store';
import { Provider } from 'react-redux'; // Importe o Provider do Redux
import { AuthProvider } from '@providers/AuthProvider';
import Exceptions from '@components/Exceptions';
import { ToastContainer } from 'react-toastify';

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
    <Exceptions />
    {/* ---- */}
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
    </>

  );
}

export default App;