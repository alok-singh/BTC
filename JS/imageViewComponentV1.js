import React, { Component } from 'react';

const imageInViewPort = 50;
const imageThumbHeight = 270;
const numberOfColumns = 5;

export default class ImageViewComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            largeImageURL: '',
            imageList: this.props.data.slice(0, imageInViewPort)
        }
        this.onKeyDown = this.onKeyDown.bind(this);
        this.currentIndex = 0;
        this.topSentinelPreviousY = 0;
        this.topSentinelPreviousRatio = 0;
        this.bottomSentinelPreviousY = 0;
        this.bottomSentinelPreviousRatio = 0;
        this.botSentCallback = this.botSentCallback.bind(this);
        this.topSentCallback = this.topSentCallback.bind(this);
        this.getSlidingWindow = this.getSlidingWindow.bind(this);
        this.adjustPaddings = this.adjustPaddings.bind(this);
        this.recycleDOM = this.recycleDOM.bind(this);
    }

    recycleDOM(firstIndex) {
        this.setState({
            imageList: this.props.data.slice(firstIndex - 20, firstIndex + imageInViewPort - 20)
        });
    }

    getSlidingWindow(isScrollDown) {
        let firstIndex;
        let increment = this.state.imageList.length / (2 * numberOfColumns);
        if (isScrollDown) {
            firstIndex = this.currentIndex + increment;
        } else {
            firstIndex = this.currentIndex - increment;
        }
        if (firstIndex < 0) {
            firstIndex = 0;
        }
        return firstIndex;
    }

    getNumFromStyle(numStr) {
        return Number(numStr.substring(0, numStr.length - 2));
    }

    adjustPaddings(isScrollDown) {
        const container = document.querySelector(".image-container");
        const currentPaddingTop = this.getNumFromStyle(container.style.paddingTop);
        const currentPaddingBottom = this.getNumFromStyle(container.style.paddingBottom);
        const remPaddingsVal = imageThumbHeight * (this.state.imageList.length / (2 * numberOfColumns));
        if (isScrollDown) {
            container.style.paddingTop = currentPaddingTop + remPaddingsVal + "px";
            container.style.paddingBottom = currentPaddingBottom === 0 ? "0px" : currentPaddingBottom - remPaddingsVal + "px";
        } else {
            container.style.paddingBottom = currentPaddingBottom + remPaddingsVal + "px";
            container.style.paddingTop = currentPaddingTop === 0 ? "0px" : currentPaddingTop - remPaddingsVal + "px";
        }
    }

    botSentCallback(entry) {
        if (this.currentIndex === this.props.data.length - this.state.imageList.length) {
            return;
        }
        const currentY = entry.boundingClientRect.top;
        const currentRatio = entry.intersectionRatio;
        const isIntersecting = entry.isIntersecting;

        // conditional check for Scrolling down
        if (
            currentY < this.bottomSentinelPreviousY &&
            currentRatio > this.bottomSentinelPreviousRatio &&
            isIntersecting
        ) {
            const firstIndex = this.getSlidingWindow(true);
            this.adjustPaddings(true);
            this.recycleDOM(firstIndex);
            this.currentIndex = firstIndex;
        }

        this.bottomSentinelPreviousY = currentY;
        this.bottomSentinelPreviousRatio = currentRatio;
    }


    topSentCallback(entry) {
        if (this.currentIndex === 0) {
            const container = document.querySelector(".image-container");
            container.style.paddingTop = "0px";
            container.style.paddingBottom = "0px";
        }

        const currentY = entry.boundingClientRect.top;
        const currentRatio = entry.intersectionRatio;
        const isIntersecting = entry.isIntersecting;

        // conditional check for Scrolling up
        if (
            currentY > this.topSentinelPreviousY &&
            isIntersecting &&
            currentRatio >= this.topSentinelPreviousRatio &&
            this.currentIndex !== 0
        ) {
            const firstIndex = this.getSlidingWindow(false);
            this.adjustPaddings(false);
            this.recycleDOM(firstIndex);
            this.currentIndex = firstIndex;
        }

        this.topSentinelPreviousY = currentY;
        this.topSentinelPreviousRatio = currentRatio;
    }

    componentDidMount() {
        let listSize = this.state.imageList.length;
        let observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.target.id === 'image-0') {
                    this.topSentCallback(entry);
                } else if (entry.target.id === `image-${listSize - 1}`) {
                    this.botSentCallback(entry);
                }
            });
        }, {});
        observer.observe(document.querySelector("#image-0"));
        observer.observe(document.querySelector(`#image-${listSize - 1}`));
        document.body.addEventListener('keydown', this.onKeyDown);
    }

    onKeyDown(event) {
        let {largeImageIndex} = this.state;
        largeImageIndex = event.keyCode == 39 ? largeImageIndex + 1 : (event.keyCode == 37 ? largeImageIndex - 1 : -1);
        if(largeImageIndex >= 0 && largeImageIndex < this.props.data.length){
            this.setState({
                largeImageIndex,
                largeImageURL: (`/IMG/${this.props.data[largeImageIndex].imageName}`)
            });
        }
        else{
            this.setState({
                largeImageURL: ''
            });
        }
    }

    onClickImage(largeImageIndex) {
        let largeImageURL = largeImageIndex !== -1 ? (`/IMG/${this.props.data[largeImageIndex].imageName}`) : ''
        this.setState({
            largeImageURL,
            largeImageIndex
        })
    }

    getImageElement(imageData, index) {
        let url = `/IMG/mn:h-200,w-200,f-webp,e-sharpen/${imageData.imageName}`;
        return <div id={`image-${index}`} className="img-div" style={{backgroundImage: `url("${url}")`}} onClick={() => this.onClickImage(index)} key={`image-${index}`}>
            <div className="img-overlay">
                <span title={imageData.placeName} className="text">{index}</span>
            </div>
        </div> 
    }

    renderLargeImage() {
        return this.state.largeImageURL ? <div className="full" onClick={() => this.onClickImage(-1)}>
            <img src={this.state.largeImageURL} />
        </div> : null
    }

    renderJSONData() {
        return typeof window == 'undefined' ? <div id="data" style={{display:'none'}}>{JSON.stringify(this.props.data)}</div> : null;
    }

    renderImageList() {
        let imageDataList = this.state.imageList;
        return <div className="image-container">
            {imageDataList.map((imageData, index) => {
                return this.getImageElement(imageData, index);
            })}
        </div>
    }

    render() {
        return <div className="main">
            {this.renderLargeImage()}
            {this.renderImageList()}
            {this.renderJSONData()}
        </div>
    }
}