import { classNames } from 'shared/libs/classNames.ts';
import { useTheme } from 'app/providers/ThemeProvider';
import { Navbar } from 'widgets/Navbar';
import { Board } from 'widgets/Board';
import { FigureProvider } from 'widgets/Board/providers/FigureProvider';

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
