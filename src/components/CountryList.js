import Link from 'next/link';
import React from 'react';

const CountryList = ({ countries }) => {
    // Group countries by continent
    const groupedCountries = countries.reduce((acc, country) => {
        const continent = country.continent || 'Other'; // Access continent from attributes
        if (!acc[continent]) {
            acc[continent] = [];
        }
        acc[continent].push(country);
        return acc;
    }, {});

    return (
        <section className="country-section">
            <h2 className="section-title">{countries.length} Countries and counting...</h2>
            <div className='inside'>
                {Object.entries(groupedCountries).map(([continent, countryList]) => (
                    <section key={continent} className="continent-group mb-8">
                        <h3>{continent}</h3>
                        <ul className="country-list">
                            {countryList.map((country) => (
                                <li key={country.id} className="country-item">
                                    <span className={`fi fi-${country.code}`}></span>
                                    <Link className='link' href={`/entries?country=${country.code}`}>
                                        {country.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>
        </section>
    );
};

export default CountryList;