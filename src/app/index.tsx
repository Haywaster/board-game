import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider, RulesProvider, CheckersProvider, ModalProvider, ActiveFigureProvider } from './providers';
import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <ModalProvider>
      <RulesProvider>
        <CheckersProvider>
          <ActiveFigureProvider>
            <App/>
          </ActiveFigureProvider>
        </CheckersProvider>
      </RulesProvider>
    </ModalProvider>
  </ThemeProvider>
);
