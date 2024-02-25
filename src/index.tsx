import ReactDOM from 'react-dom/client'
import App from 'app/App.tsx'
import './index.scss'
import { ThemeProvider } from 'app/providers/ThemeProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<ThemeProvider>
		<App/>
	</ThemeProvider>
)
