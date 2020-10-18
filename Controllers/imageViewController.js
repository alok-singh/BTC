import React from 'react';
import {renderToString} from 'react-dom/server';
import {getImagePathList} from './imageListController';
import ImageViewComponent from '../JS/imageViewComponent';


export const imageViewController = (req, res) => {
	getImagePathList().then(data => {
		res.render('common', {
			pageTitle: 'Image View',
			cssPath: './CSS/imageView.css',
			jsPath: './build/imageView.bundle.js',
			innerHTML: renderToString(<ImageViewComponent data={data} />)
		});
	}, error => {
		console.log(error);
	})
}