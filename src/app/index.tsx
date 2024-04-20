import ReactDOM from 'react-dom/client'
import App from 'app/App.tsx'
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { RulesProvider } from 'app/providers/RulesProvider';
import './styles/index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <RulesProvider>
      <App/>
    </RulesProvider>
  </ThemeProvider>
)
