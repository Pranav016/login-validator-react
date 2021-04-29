import React, { useState, useEffect, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../context/auth-context';
import Input from '../Input/Input';

const emailReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return { value: action.val, isValid: action.val.includes('@') };
	}
	if (action.type === 'INPUT_BLUR') {
		return { value: state.value, isValid: state.value.includes('@') };
	}

	return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return { value: action.val, isValid: action.val.trim().length > 6 };
	}
	if (action.type === 'INPUT_BLUR') {
		return { value: state.value, isValid: state.value.trim().length > 6 };
	}

	return { value: '', isValid: false };
};

const Login = (props) => {
	// const [enteredEmail, setEnteredEmail] = useState('');
	// const [emailIsValid, setEmailIsValid] = useState();
	// const [enteredPassword, setEnteredPassword] = useState('');
	// const [passwordIsValid, setPasswordIsValid] = useState();
	const [formIsValid, setFormIsValid] = useState(false);
	const authCtx = useContext(AuthContext);

	// const [state, dispatch] = useReducer(reducer, initialArg);
	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value: '',
		isValid: null,
	});
	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
		value: '',
		isValid: null,
	});

	const { isValid: emailIsValid } = emailState;
	const { isValid: passwordIsValid } = passwordState;
	/* we use useEffect here because adding variables to
	dependencies helps us track them and avoids repetition of code */
	useEffect(() => {
		const timer = setTimeout(() => {
			console.log('Checking validity');
			setFormIsValid(
				// enteredEmail.includes('@') && enteredPassword.trim().length>6
				emailIsValid && passwordIsValid
			);
		}, 500);

		return () => {
			/* every time we type something a new timer is set and
	  it gets cleared as soon as we type a new character.
	  Thus validation is checked when we take a pause from typing.
	  This saves our valuable calls and processing power */
			console.log('CleanUp');
			clearTimeout(timer);
		};
		// }, [enteredEmail, enteredPassword]);
	}, [emailIsValid, passwordIsValid]);

	const emailChangeHandler = (event) => {
		dispatchEmail({ type: 'USER_INPUT', val: event.target.value });

		// setFormIsValid(
		// 	event.target.value.includes('@') && passwordState.isValid
		// );
	};

	const passwordChangeHandler = (event) => {
		dispatchPassword({ type: 'USER_INPUT', val: event.target.value });

		// setFormIsValid(
		// 	emailState.isValid && event.target.value.trim().length > 6
		// );
	};

	const validateEmailHandler = () => {
		dispatchEmail({ type: 'INPUT_BLUR' });
	};

	const validatePasswordHandler = () => {
		dispatchPassword({ type: 'INPUT_BLUR' });
	};

	const submitHandler = (event) => {
		event.preventDefault();
		authCtx.onLogin(emailState.value, passwordState.value);
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<Input
					id='email'
					type='email'
					label='E-Mail'
					value={emailState.value}
					isValid={emailIsValid}
					onChange={emailChangeHandler}
					onBlur={validateEmailHandler}></Input>
				<Input
					id='password'
					type='password'
					label='Password'
					value={passwordState.value}
					isValid={passwordIsValid}
					onChange={passwordChangeHandler}
					onBlur={validatePasswordHandler}></Input>
				<div className={classes.actions}>
					<Button type='submit' className={classes.btn} disabled={!formIsValid}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;
