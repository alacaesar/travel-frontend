import { fetchAPI } from "@/lib/strapi";
import LocationMap from "@/components/LocationMap";
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { notFound } from "next/navigation";
import Link from "next/link";
import { getStrapiMedia } from "@/lib/helpers";

// Generate metadata for the page
export async function generateMetadata({ params }) {
    const { slug } = await params;
    const response = await fetchAPI(`/travel-entries?filters[slug][$eq]=${slug}&populate=*`);
    const entry = response.data?.[0];

    if (!entry) return {};

    return {
        title: entry.title,
        description: entry.description,
    };
}

export default async function TravelEntryValidPage({ params }) {
    const { slug } = await params;

    const response = await fetchAPI(`/travel-entries?filters[slug][$eq]=${slug}&populate=*`);
    const entry = response.data?.[0];

    if (!entry) {
        notFound();
    }

    const imageUrl = getStrapiMedia(entry.coverImage?.url) || '/placeholder.jpg';

    return (
        <article className="travel-entry-detail container">
            <header>
                <figure>
                    <img src={imageUrl} alt={entry.title} />
                </figure>
                <div>
                    <h1>{entry.title}</h1>

                    <ul className="meta">
                        <li>
                            <span className={`fi fi-${entry.country.code}`}></span>
                            <Link className='link' href={`/entries?country=${entry.country.code}`}>{entry.country.name}</Link>
                        </li>
                        <li>
                            {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </li>
                    </ul>


                </div>
            </header>

            {entry.location && (
                <div className="location-container">
                    {/* Check structure of location, assuming { lat, lng } based on standard usage */}
                    <LocationMap lat={entry.location.lat || entry.location.geometry?.coordinates[1]} lng={entry.location.lng || entry.location.geometry?.coordinates[0]} />

                    <div className="google-maps-link">
                        <a
                            href={`https://www.google.com/maps?q=${entry.location.lat || entry.location.geometry?.coordinates[1]},${entry.location.lng || entry.location.geometry?.coordinates[0]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View on Google Maps →
                        </a>
                    </div>
                </div>
            )}

            <div className="entry-content">
                <p className="lead">{entry.description}</p>

                <div className="blocks-content">
                    {entry.content && <BlocksRenderer content={entry.content} />}
                </div>
            </div>
        </article>
    );
}
