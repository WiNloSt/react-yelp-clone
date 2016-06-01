import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import CommentList from './CommentList';
import CommentForm from './CommentForm';

class CommentBox extends React.Component {
	state = {
		data: []
	}

	loadCommentsFromServer = () => {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: data => this.setState({data: data}),
			error: (xhr, status, err) => console.error(this.props.url, status, err.toString())
		})
	}

	componentDidMount() {
		this.loadCommentsFromServer();
		setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	}

	render() {
		console.log('state', this.state)
		return (
			<div className='commentBox'>
				<h1>Comments</h1>
				<CommentList data={this.state.data}/>
				<CommentForm />
			</div>
		)
	}
}

const rootFromHjsWebpack = $("#root")[0];
ReactDOM.render(<CommentBox url='/comments.json' pollInterval={2000}/>, rootFromHjsWebpack);
