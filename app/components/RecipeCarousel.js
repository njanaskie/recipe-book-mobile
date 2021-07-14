import React from 'react';
import Slider from "react-slick";

const RecipeCarousel = ({ items, children }) => {
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: items && items.length < 5 ? items.length : 5,
        slidesToScroll: items && items.length < 5 ? items.length : 5,
        className: "slider variable-width",
        variableWidth: true,
        rows: 1,
        responsive: [
            {
              breakpoint: { max: 3000, min: 1024 },
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3
              }
            },
            {
              breakpoint: { max: 1024, min: 464 },
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: { max: 464, min: 0 },
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
        ]
    };

    return (
        <div className='custom-slider'>
            <Slider {...settings} >
                {children}
            </Slider>
        </div>
    )
};

export default RecipeCarousel;