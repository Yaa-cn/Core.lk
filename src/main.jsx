import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Routes from './routes/Routes'
import { MainProvider } from './context/MainContext'
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/500.css';
import '@fontsource/nunito/700.css';
import '@fontsource/nunito/800.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainProvider>
      <Routes />
    </MainProvider>
  </StrictMode>,
)
