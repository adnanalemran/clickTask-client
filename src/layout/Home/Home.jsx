import React from 'react';
import Hero from './Hero/Hero';
import Testimonial from './Testimonial/Testimonial';

const Home = () => {
    return (
        <div className='container mx-auto '>
            <Hero/>
            <Testimonial/>
        </div>
    );
};

export default Home;