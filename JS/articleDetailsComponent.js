import React, { Component } from "react";
import { article } from '../Data/article';

const constants = {
	authorImage: 'https://d23yle2kieo2t7.cloudfront.net/prodsite/media/assets/default-author-icn.png'
}

class ArticleDetails extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			id: "",
			title: "",
			imageUrl: "",
			imageCaption: "",
			description: "",
			publishDate: "",
			feedUrl: "",
			articleBody: "",
			authors: [],
			tags: []
		};
		// let a = {a:23,b:34};
        // this.something = {...a};
	}

	componentDidMount() {
		if(article.responseCode == 200) {
			let articleData = article.response;
			// this.setState({...articleData});
		}
	}

	renderArticleTitle() {
		return <h1 className="article-title">{this.state.title}</h1>
	}

	renderAuthors() {
		let authorText = this.state.authors.map(author => author.fullName).join(', ');
		let publishDate = new Date(this.state.publishDate);
		return <div className="author-wrapper">
			<div className="autho-image-wrapper">
				{this.state.authors.map(author => {
					return <img className="author-image" alt={authorText} title={authorText} src={constants.authorImage} />
				})}
			</div>
			<div className="author-date">
				<div>{authorText}</div>
				<div>{publishDate.toString()}</div>
			</div>
		</div>
	}
	
	renderMainImage() {
		return <div className="main-image">
			<img src={this.state.imageUrl} title={this.state.title} />
			<div className="image-description">
				{this.state.imageCaption}
			</div>
		</div>
	}
	
	renderContent() {
		return <div className="article-content" dangerouslySetInnerHTML={{__html: this.state.articleBody}} />
	}

	renderTags() {
		return <div className="tag-wrapper">
			{this.state.tags.map(tag => {
				return <span className="article-tag">
					#{tag.name}
				</span>
			})}
		</div>
	}
	
	render() {
    	return <div className="container">
			{this.renderArticleTitle()}
			{this.renderAuthors()}
			{this.renderMainImage()}
			{this.renderContent()}
			{this.renderTags()}
		</div>
  	}
}

export default ArticleDetails;
