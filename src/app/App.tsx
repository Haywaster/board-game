import { classNames } from 'shared/libs/classNames.ts';
import { useTheme } from './providers/ThemeProvider';
import { FigureProvider } from './providers/FigureProvider';
import { Navbar } from 'widgets/Navbar';
import { Board } from 'widgets/Board';

const App = () => {
	const {theme} = useTheme()
	
	return (
		<div className={ classNames('app', {}, [theme]) }>
			<Navbar/>
			<FigureProvider>
				<Board/>
			</FigureProvider>
		</div>
	);
};

export default App;
