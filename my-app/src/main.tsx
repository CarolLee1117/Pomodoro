import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import "./global.css";
import AppRoutes from './routes/AppRoutes';
import TransitionProvider from './providers/TransitionProvider';


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <TransitionProvider>
      <AppRoutes/>
    </TransitionProvider>
    
  </BrowserRouter>,
)