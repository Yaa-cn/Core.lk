import { createRoot } from 'react-dom/client'
import './index.css'
import Routes from './routes/Routes'
import { MainProvider } from './context/MainContext'

createRoot(document.getElementById('root')).render(
    <Routes />
)
