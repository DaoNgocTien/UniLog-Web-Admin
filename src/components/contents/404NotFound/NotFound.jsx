
import React, { Component } from 'react';

class NotFound extends Component {
	render() {
		return (
			<div className="notfound">
				<div className="notfound-404">
					<h1>404</h1>
					<h2>Page not found</h2>
				</div>
				<a href="/auth/login">Homepage</a>
			</div>
		);
	}
}

export default NotFound;