import { classNames } from 'shared/libs/classNames.ts';
import { useTheme } from 'app/providers/ThemeProvider';
import { Navbar } from 'widgets/Navbar';

const App = () => {
	const {theme} = useTheme()
	
	return (
		<div className={ classNames('app', {}, [theme]) }>
			<Navbar/>
		</div>
	);
};

export default App;
