import React, { useState } from 'react';

import Header from '../Header';
import './index.css';

function Home() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [searchInfo, setSearchInfo] = useState({}); 

  const handleSearch = async e => {
    e.preventDefault();
    if (search === '') return;
    setResults([]);
    setSearchInfo({});
  
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&
    prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${search}`;

    const response = await fetch(endpoint);

    if (!response.ok) {
      throw Error(response.statusText);
    }

    const json = await response.json();

    setResults(json.query.search);
    setSearchInfo(json.query.searchinfo);
  };

 

  return (
    <>
      <div className='App'>
        <header>
          <Header />
          <div className='container'>
            <img className="wiki-logo" 
              src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-dynamic-webapps/wiki-logo-img.png" 
              alt="wikipedia-logo"
            />
            <h1>Wikipedia Search</h1>
            <form className='search-box' onSubmit={handleSearch}>
              <input
                type="search"
                placeholder='enter text to search'
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </form>
          </div>
          {(searchInfo.totalhits) ? <p>About: {searchInfo.totalhits} Results</p> : ''}
        </header>
        <div className='results-container'>
          {results.map((result, i) => {
            const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
            return (
              <div className='results' key={i}>
                <h3>{result.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: result.snippet }}></p>
                <a href={url} target='_blank' rel="noopener noreferrer">Read more</a>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
