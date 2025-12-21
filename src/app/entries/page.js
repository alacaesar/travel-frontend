import { fetchAPI } from "@/lib/strapi";
import TravelEntryCard from "@/components/TravelEntryCard";

export const metadata = {
    title: 'Travel Activities',
    description: 'List of all travel activities',
};

export default async function EntriesPage({ searchParams }) {
    const { country: countryCode } = await searchParams;

    let entries = [];
    let pageTitle = "All Activities";

    try {
        if (countryCode) {
            // Fetch filtered entries and country details in parallel
            const [entriesRes, countryRes] = await Promise.all([
                fetchAPI(`/travel-entries?filters[country][code][$eq]=${countryCode}&populate=*`),
                fetchAPI(`/countries?filters[code][$eq]=${countryCode}`)
            ]);

            entries = entriesRes.data || [];
            const countryData = countryRes.data?.[0];

            if (countryData) {
                // Assuming countryData.name is available directly or via attributes depending on API structure
                // Previous code suggested attributes are flattened or handled, but let's be safe
                const name = countryData.name || countryData.attributes?.name || countryCode;
                pageTitle = `Activities in ${name}`;

                // Update metadata title dynamically if possible? 
                // Metadata export is static or separate generateMetadata function. 
                // For now, page title in UI is sufficient.
            } else {
                pageTitle = `Activities in ${countryCode.toUpperCase()}`;
            }

        } else {
            // Fetch all entries if no filter
            const entriesRes = await fetchAPI("/travel-entries?populate=*");
            entries = entriesRes.data || [];
        }

        return (
            <div className="activities-list-page container">
                <h1>{pageTitle}</h1>

                {entries.length > 0 ? (
                    <div className="entry-grid">
                        {entries.map((entry) => (
                            <TravelEntryCard key={entry.id} entry={entry} />
                        ))}
                    </div>
                ) : (
                    <p className="lead">No activities found.</p>
                )}
            </div>
        );
    } catch (error) {
        console.error("Error loading entries:", error);
        return <div className="container py-8">Error loading activities. Please try again.</div>;
    }
}
