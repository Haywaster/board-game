import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from './providers/ThemeProvider';
import { RulesProvider } from './providers/RulesProvider';
import { CheckersProvider } from './providers/CheckersProvider';
import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <RulesProvider>
      <CheckersProvider>
        <App/>
      </CheckersProvider>
    </RulesProvider>
  </ThemeProvider>
);
