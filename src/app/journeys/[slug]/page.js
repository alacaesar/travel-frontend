import { fetchAPI } from "@/lib/strapi";
import TravelEntryCard from "@/components/TravelEntryCard";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const response = await fetchAPI(`/journeys?filters[slug][$eq]=${slug}&populate=*`);
    const journey = response.data?.[0];

    if (!journey) return {};

    return {
        title: journey.title,
        description: journey.description,
    };
}

export default async function JourneyDetailPage({ params }) {
    const { slug } = await params;

    // Deep populate to get travel entries with their images and country
    const query = [
        `filters[slug][$eq]=${encodeURIComponent(slug)}`,
        `populate[coverImage]=true`,
        `populate[travel_entries][populate][coverImage]=true`,
        `populate[travel_entries][populate][country]=true`
    ].join('&');

    const response = await fetchAPI(`/journeys?${query}`);
    const journey = response.data?.[0];

    if (!journey) {
        notFound();
    }

    const imageUrl = journey.coverImage?.url
        ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}${journey.coverImage.url}`
        : '/placeholder.jpg';

    return (
        <article className="journey-detail container">
            <header className="journey-header">
                <h1>{journey.title}</h1>
                {journey.description && (
                    <p className="lead">
                        {journey.description}
                    </p>
                )}
            </header>

            <figure className="journey-cover">
                <img src={imageUrl} alt={journey.title} />
            </figure>

            <section className="journey-entries">
                <h2>
                    Activities in this Journey
                </h2>

                {journey.travel_entries && journey.travel_entries.length > 0 ? (
                    <div className="entry-grid">
                        {journey.travel_entries.map((entry) => (
                            <TravelEntryCard key={entry.id} entry={entry} />
                        ))}
                    </div>
                ) : (
                    <p>No activities added to this journey yet.</p>
                )}
            </section>
        </article>
    );
}
