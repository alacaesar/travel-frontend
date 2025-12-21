'use client';

import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import JourneyCard from './JourneyCard';

const JourneyList = ({ journeys }) => {
    return (
        <section className="journey-section">
            <h2 className="section-title">Journey&apos;s</h2>
            <Splide options={{
                type: 'loop',
                perPage: 3,
                perMove: 1,
                gap: '2rem',
                autoplay: false,
                interval: 3000,
                pauseOnHover: true,
                arrows: true,
                pagination: false,
                breakpoints: {
                    1024: {
                        perPage: 2,
                        gap: '1rem',
                    },
                    640: {
                        perPage: 1,
                        gap: '1rem',
                    },
                }
            }}>
                {journeys.map((journey) => (
                    <SplideSlide key={journey.id}>
                        <JourneyCard journey={journey} />
                    </SplideSlide>
                ))}
            </Splide>
        </section>
    );
};

export default JourneyList;
