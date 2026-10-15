import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store, persistor } from './Store/store'
import { PersistGate } from 'redux-persist/integration/react'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'react-phone-input-2/lib/style.css'

createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <ErrorBoundary>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <PrimeReactProvider value={{ autoZIndex: true, zIndex: { overlay: 1000 } }}>
              <App />
            </PrimeReactProvider>
          </PersistGate>
        </Provider>
      </ErrorBoundary>
    </BrowserRouter>
  </>
)
