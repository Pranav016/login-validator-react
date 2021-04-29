import React, { useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './context/auth-context';

function App() {
	const ctx = useContext(AuthContext);
	return (
		<React.Fragment>
			<MainHeader />
			<main>
				{/* I didn't remove loginHandler from this component below because this component is directly accessing the property and not passing it down and only has a particular function of logging-in hence it doesn't need the function to be passed in context */}
				{!ctx.isLoggedIn && <Login />}
				{ctx.isLoggedIn && <Home />}
			</main>
		</React.Fragment>
	);
}

export default App;
