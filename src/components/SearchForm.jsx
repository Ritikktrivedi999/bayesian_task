import React, { useState } from 'react';
import axios from 'axios';
import './SearchForm.css';

const SearchForm = () => {
  const [origin, setOrigin] = useState('SYD');
  const [destination, setDestination] = useState('JFK');
  const [cabin, setCabin] = useState('economy');
  const [results, setResults] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const json_data = {
      origin: origin,
      destination: destination,
      partnerPrograms: [
        'Air Canada',
        'United Airlines',
        'KLM',
        'Qantas',
        'American Airlines',
        'Etihad Airways',
        'Alaska Airlines',
        'Qatar Airways',
        'LifeMiles',
      ],
      stops: 2,
      departureTimeFrom: '2024-07-09T00:00:00Z',
      departureTimeTo: '2024-10-07T00:00:00Z',
      isOldData: false,
      limit: 302,
      offset: 0,
      cabinSelection: [cabin],
      date: '2024-07-09T12:00:17.796Z',
    };

    try {
      const response = await axios.post('https://cardgpt.in/apitest', json_data, {
        headers: {
          'accept': 'application/json, text/plain, */*',
          'accept-language': 'en-US,en;q=0.9,hi;q=0.8',
          'cache-control': 'no-cache',
          'content-type': 'application/json',
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        },
      });
      setResults(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="form-group">
          <label>Origin</label>
          <select value={origin} onChange={(e) => setOrigin(e.target.value)} className="dropdown">
            <option value="SYD">SYD</option>
            <option value="LAX">LAX</option>
            <option value="HKG">HKG</option>
            {/* Add other options as necessary */}
          </select>
        </div>
        <div className="form-group">
          <label>Destination</label>
          <select value={destination} onChange={(e) => setDestination(e.target.value)} className="dropdown">
            <option value="JFK">JFK</option>
            <option value="LHR">LHR</option>
            <option value="NRT">NRT</option>
            {/* Add other options as necessary */}
          </select>
        </div>
        <div className="form-group">
          <label>Cabin Selection</label>
          <select value={cabin} onChange={(e) => setCabin(e.target.value)} className="dropdown">
            <option value="economy">Economy</option>
            <option value="business">Business</option>
            <option value="first">First</option>
          </select>
        </div>
        <button type="submit" className="search-button">Search</button>
      </form>
      <div className="results">
        {results.length === 0 ? (
          <p>Try another search route.</p>
        ) : (
          results.map((result, index) => (
            <div key={index} className="result-card">
              <img src="/path/to/logo.png" alt="Logo" className="logo" />
              <p>Partner: {result.partner_program}</p>
              <p>Min Business Miles: {result.min_business_miles ?? 'N/A'}</p>
              <p>Min Business Tax: {result.min_business_tax ?? 'N/A'}</p>
              <p>Min Economy Miles: {result.min_economy_miles ?? 'N/A'}</p>
              <p>Min Economy Tax: {result.min_economy_tax ?? 'N/A'}</p>
              <p>Min First Miles: {result.min_first_miles ?? 'N/A'}</p>
              <p>Min First Tax: {result.min_first_tax ?? 'N/A'}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchForm;
