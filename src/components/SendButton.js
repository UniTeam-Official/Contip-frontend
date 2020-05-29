/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useToasts, ToastProvider } from 'react-toast-notifications';

const SendButton = ({ id, className, buttonName, onSubmit }) => {
	return (
		<ToastProvider>
			<Button id={ id } className={ className ? className : "" } buttonName={ buttonName } onSubmit={ onSubmit } />
		</ToastProvider>
	);
}

const Button = ({ id, className, buttonName, onSubmit }) => {
    const { addToast } = useToasts()
    const onClick = (event) => {
        onSubmit(event, addToast);
    };

	if (id === "DeleteProfileButton") {
		return (
			<div className="col-6 col-12-medium">
				<ul className="actions stacked">
					{/* <li><a href="#" className="button small fit">Delete Account</a></li> */}
					<li id={ id }><a href="#" className="button small fit" onClick={ onClick } >{ buttonName }</a></li>
				</ul>
			</div>
		);
	} else {
		return (
			<button type="submit" value="Submit" className={`primary ${ className }`} onClick={ onClick } >{ buttonName }</button>
		);
	}
}

export default SendButton;
