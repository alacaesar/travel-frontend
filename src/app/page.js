import { fetchAPI } from "@/lib/strapi";
import TravelEntryCard from "@/components/TravelEntryCard";
import JourneyList from "@/components/JourneyList";
import CountryList from "@/components/CountryList";
import WorldMap from "@/components/WorldMap";

export default async function Home() {

  // Parallel data fetching
  try {
    const [entriesRes, journeysRes, countriesRes] = await Promise.all([
      fetchAPI("/travel-entries?populate=*"),
      fetchAPI("/journeys?populate=*"),
      fetchAPI("/countries?populate=*")
    ]);

    console.log("Entries Response:", JSON.stringify(entriesRes, null, 2));
    console.log("Journeys Response:", JSON.stringify(journeysRes, null, 2));

    const entries = entriesRes.data || [];
    const journeys = journeysRes.data || [];

    const countries = countriesRes.data || [];

    return (
      <div className="container">
        {/* Travel Entries Grid */}
        <section className="entry-grid">
          {entries.map((entry) => (
            <TravelEntryCard key={entry.id} entry={entry} />
          ))}
        </section>

        {/* Journeys Section */}
        <JourneyList journeys={journeys} />

        {/* World Map Section */}
        <WorldMap countries={countries} />

        <CountryList countries={countries} />
      </div>
    );
  } catch (error) {
    console.error("Fetch error:", error);
    return <div>Error loading data: {error.message}. Is Backend running?</div>;
  }
}

