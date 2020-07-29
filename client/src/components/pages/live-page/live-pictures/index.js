import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
   
        }
  
    }

    createSlideContainers = pictures => {
        const numberOfSlides = 3
        const images = pictures.map((picture, i) => <img src={picture} alt="event picture" key={i} />)
        return images.reduce((acc, val, i) => {
            i % numberOfSlides == 0 && acc.push([])
            acc[acc.length - 1].push(val)
            return acc
        }, []).map((slideContent, i) => <Slide index={i}><div>{slideContent}</div></Slide>)
    }
    render(props) {
        
        return (
            <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={50}
                totalSlides={this.createSlideContainers(this.props.pictures).length}
                isPlaying={true}
                infinite={true}
            >
                <Slider>
                    {this.createSlideContainers(this.props.pictures)}
                </Slider>
                <ButtonBack>Back</ButtonBack>
                <ButtonNext>Next</ButtonNext>
            </CarouselProvider>
        );
    }
}