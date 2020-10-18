import React, { Component } from 'react';

const imageInViewport = 90;

export default class ImageViewComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageList: this.props.data.slice(0, imageInViewport),
        }
        this.currentStartIndex = 0;
    }

    updateImages(currentStartIndex, callback) {
        let finalImageList = this.props.data.slice(currentStartIndex, currentStartIndex + imageInViewport);
        this.imageContainer.style.paddingTop = 270*currentStartIndex/5 + 'px';
        this.setState({
            imageList: finalImageList
        }, callback)
    }

    updateObserver(observer, entryId, currentStartIndex, listSize) {
        let toUnobserve = document.querySelector(`#${entryId}`);
        if(toUnobserve) {
            observer.unobserve(toUnobserve);
        }
        this.updateImages(currentStartIndex, () => {
            let topObserver = document.querySelector(`#image-${this.currentStartIndex}`);
            let bottomObserver = document.querySelector(`#image-${listSize - 1 + this.currentStartIndex}`);
            if(topObserver) {
                observer.observe(topObserver);
            }
            if(bottomObserver) {
                observer.observe(bottomObserver);
            }
        });
    }

    componentDidMount() {
        let listSize = this.state.imageList.length;
        let previousScrollTop = document.documentElement.scrollTop;
        let observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                let entryId = entry.target.id;
                if(entry.isIntersecting) {
                    if(document.documentElement.scrollTop < previousScrollTop) {
                        if(entry.target.id === `image-${this.currentStartIndex}`) {
                            this.currentStartIndex = this.currentStartIndex ? this.currentStartIndex - imageInViewport/2 : 0;
                            this.updateObserver(observer, entryId, this.currentStartIndex, listSize);
                        }
                    }
                    else {
                        if(entry.target.id === `image-${listSize - 1 + this.currentStartIndex}`) {
                            this.currentStartIndex = this.currentStartIndex + imageInViewport/2;
                            this.updateObserver(observer, entryId, this.currentStartIndex, listSize);
                        }
                    }
                }
                previousScrollTop = document.documentElement.scrollTop;
            });
        }, {});
        observer.observe(document.querySelector(`#image-${0}`));
        observer.observe(document.querySelector(`#image-${listSize - 1}`));
    }

    getImageElement(imageData, index, actualIndex) {
        let url = `/IMG/mn:h-200,w-200,f-webp,e-sharpen/${imageData.imageName}`;
        let id = actualIndex;
        return <div id={`image-${id}`} className="img-div" style={{backgroundImage: `url("${url}")`}} key={`image-${url}`}>
            <div className="img-overlay">
                <span title={imageData.placeName} className="text">{`image-${id}`}</span>
            </div>
        </div>
    }

    renderJSONData() {
        return typeof window == 'undefined' ? <div id="data" style={{display:'none'}}>{JSON.stringify(this.props.data)}</div> : null;
    }

    renderImageList() {
        return <div className="image-container" ref={ref => this.imageContainer = ref}>
            {this.state.imageList.map((imageData, index) => {
                let actualIndex = this.props.data.findIndex(value => value.imageName == imageData.imageName);
                return this.getImageElement(imageData, index, actualIndex);
            })}
        </div>
    }

    render() {
        return <div className="main">
            {this.renderImageList()}
            {this.renderJSONData()}
        </div>
    }
}