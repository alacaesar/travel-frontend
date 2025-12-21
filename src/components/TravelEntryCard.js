import React from 'react';
import Link from 'next/link';
// import './TravelEntryCard.scss'; // Assuming we handle styles globally or modules. Let's use inline or global for now to fit existing sass structure?
// Better to create a scss file for it.

const TravelEntryCard = ({ entry }) => {
    const { title, description, coverImage, country, date, category } = entry;
    const imageUrl = coverImage?.url ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}${coverImage.url}` : '/placeholder.jpg';

    return (
        <div className="travel-entry-card">
            <div className="image-container">
                <Link href={`/entries/${entry.slug}`}><img src={imageUrl} alt={title} /></Link>
            </div>
            <div className="content">
                <Link href={`/entries/${entry.slug}`}><h3>{title}</h3></Link>
                <p className="description">{description}</p>
                <ul className="meta">
                    <li>
                        <span className={`fi fi-${country.code}`}></span>
                        <Link className='link' href={`/entries?country=${country.code}`}>{country.name}</Link>
                    </li>
                    <li>
                        {new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default TravelEntryCard;
