import React from 'react';

const SearchBar = ({
  setSearchTerm,
  setTypeFilter,
  setMinPrice,
  setMaxPrice,
  setMinBeds,
  setMaxBeds,
  setPostcodeArea,
  setDateFrom,
  setDateTo,
  setTenureFilter
}) => {
  return (
    <section>
      <h1>Believe in Finding it</h1>
      <h3>Search for the gadget, you are looking for [rent or sale]</h3>

      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="term">Search Gadget or Location:</label><br />
        <input type="text" id="term" name="term" onChange={(e) => setSearchTerm(e.target.value)} />
        <br /><br />

        <label htmlFor="type">Property Type:</label><br />
        <select id="type" name="type" onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="Any">Any</option>
          <option value="House">House</option>
          <option value="Flat">Flat</option>
        </select>
        <br /><br />

        <label htmlFor="minPrice">Min Price:</label><br />
        <input type="number" id="minPrice" name="minPrice" onChange={(e) => setMinPrice(e.target.value)} />
        <br /><br />

        <label htmlFor="maxPrice">Max Price:</label><br />
        <input type="number" id="maxPrice" name="maxPrice" onChange={(e) => setMaxPrice(e.target.value)} />
        <br /><br />

        <label htmlFor="minBeds">Min Bedrooms:</label><br />
        <input type="number" id="minBeds" name="minBeds" onChange={(e) => setMinBeds(e.target.value)} />
        <br /><br />

        <label htmlFor="maxBeds">Max Bedrooms:</label><br />
        <input type="number" id="maxBeds" name="maxBeds" onChange={(e) => setMaxBeds(e.target.value)} />
        <br /><br />

        <label htmlFor="postcodeArea">Postcode Area (e.g. BR5, NW1):</label><br />
        <input type="text" id="postcodeArea" name="postcodeArea" onChange={(e) => setPostcodeArea(e.target.value)} />
        <br /><br />

        <label htmlFor="dateFrom">Date Added From:</label><br />
        <input type="date" id="dateFrom" name="dateFrom" onChange={(e) => setDateFrom(e.target.value)} />
        <br /><br />

        <label htmlFor="dateTo">Date Added To:</label><br />
        <input type="date" id="dateTo" name="dateTo" onChange={(e) => setDateTo(e.target.value)} />
        <br /><br />

        <button type="button" className="button buttonPrimary" onClick={() => setTenureFilter('Sale')}>
          For Sale
        </button>

        <button type="button" className="button buttonPrimary" onClick={() => setTenureFilter('Rent')}>
          For Rent
        </button>
 
        <button type="button" className="button" onClick={() => setTenureFilter('Any')}>
          Show All
        </button>

      </form>
    </section>
  );
};

export default SearchBar;
