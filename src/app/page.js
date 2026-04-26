import { fetchAPI } from "@/lib/strapi";
import TravelEntryCard from "@/components/TravelEntryCard";
import JourneyList from "@/components/JourneyList";
import CountryList from "@/components/CountryList";
import WorldMap from "@/components/WorldMap";

export default async function Home() {
  let entries = [];
  let journeys = [];
  let countries = [];
  let fetchError = null;

  try {
    const [entriesRes, journeysRes, countriesRes] = await Promise.all([
      fetchAPI("/travel-entries?populate=*"),
      fetchAPI("/journeys?populate=*"),
      fetchAPI("/countries?populate=*"),
    ]);

    entries = entriesRes.data || [];
    journeys = journeysRes.data || [];
    countries = countriesRes.data || [];
  } catch (error) {
    console.error("Fetch error:", error);
    fetchError = error;
  }

  if (fetchError) {
    return (
      <div>
        Error loading data: {fetchError.message}. Is Backend running?
      </div>
    );
  }

  return (
    <div className="container">
      <section className="entry-grid">
        {entries.map((entry) => (
          <TravelEntryCard key={entry.id} entry={entry} />
        ))}
      </section>

      <JourneyList journeys={journeys} />

      <WorldMap countries={countries} />

      <CountryList countries={countries} />
    </div>
  );
}
