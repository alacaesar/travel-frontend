import React from 'react';
import Link from 'next/link';

import { getStrapiMedia } from '../lib/helpers';

const JourneyCard = ({ journey }) => {
    const { title, description, coverImage, slug, travel_entries } = journey;
    const imageUrl = getStrapiMedia(coverImage?.url) || '/placeholder.jpg';

    return (
        <div className="travel-entry-card journey-card">
            <div className="image-container">
                <Link href={`/journeys/${slug}`}><img src={imageUrl} alt={title} /></Link>
            </div>
            <div className="content">
                <Link href={`/journeys/${slug}`}><h3>{title}</h3></Link>
                <span>{travel_entries?.length || 0} Activities </span>
            </div>
        </div>
    );
};

export default JourneyCard;
