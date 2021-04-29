import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
	isLoggedIn: false,
	onLogout: () => {},
	onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	/* Points to remember-
  1. this code standalone would get into an infinite loop because
    it will keep checking the condition and re-rendering the component.
  2. We use useEffect here because useEffect runs after rendering of a
    component and will only run if the state of its dependencies change.
    In this case since there are no dependencies, it only runs 1 time that
    is after we have logged in for the first time/ reloaded the page.
  3. isLoggedIn when changed using useState will only re-render the component
    not reload the whole code. Re-rendering doesn't load all the variables
    again but reloading the page/ code does, thus we needed to store a variable
    in the localStorage of the browser
  */
	useEffect(() => {
		const storedInformation = localStorage.getItem('isLoggedIn');
		if (storedInformation === '1') {
			setIsLoggedIn(true);
		}
	}, []);

	const loginHandler = (email, password) => {
		localStorage.setItem('isLoggedIn', '1');
		setIsLoggedIn(true);
	};

	const logoutHandler = () => {
		localStorage.removeItem('isLoggedIn');
		setIsLoggedIn(false);
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				onLogout: logoutHandler,
				onLogin: loginHandler,
			}}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
