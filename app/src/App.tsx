import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { store } from './store';
import { Provider } from 'react-redux'; // Importe o Provider do Redux
import { AuthProvider } from '@providers/AuthProvider';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  );
}

export default App;