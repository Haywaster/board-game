import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from './providers/ThemeProvider';
import { RulesProvider } from './providers/RulesProvider';
import { CheckersProvider } from './providers/CheckersProvider';
import './styles/index.scss';
import { ModalProvider } from './providers/ModalProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <ModalProvider>
      <RulesProvider>
        <CheckersProvider>
          <App/>
        </CheckersProvider>
      </RulesProvider>
    </ModalProvider>
  </ThemeProvider>
);
