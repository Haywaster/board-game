import ReactDOM from 'react-dom/client'
import App from 'app/App.tsx'
import { ThemeProvider } from 'app/providers/ThemeProvider';
import './styles/index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<ThemeProvider>
		<App/>
	</ThemeProvider>
)
