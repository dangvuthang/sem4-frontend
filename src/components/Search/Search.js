import React, { useState } from "react";
import "./Search.scss";
import DatePicker from "react-date-picker";
const Search = () => {
  const [datePicker, setDatePicker] = useState("");

  const [searchOption, setSearchOption] = useState({
    keyword: "",
    tourType: "",
  });

  const handleSelectTourTypes = ({ target: select }) => {
    select.firstChild.disabled = true;
    setSearchOption({ ...searchOption, tourType: select.value });
  };

  const handleSearchTour = e => {
    e.preventDefault();
  };

  return (
    <section className="search-section">
      <div className="container">
        <form onSubmit={handleSearchTour}>
          <div className="search-section__search-area">
            <h3 className="search-section__title">Where you want to go?</h3>
            <div className="search-section__input">
              <input
                className="search-section__keyword"
                placeholder="Where to go?"
                value={searchOption.keyword}
                onChange={e =>
                  setSearchOption({ ...searchOption, keyword: e.target.value })
                }
              />
            </div>
            <div className="search-section__input">
              <DatePicker
                value={datePicker}
                onChange={setDatePicker}
                format="dd/MM/y"
                className="search-section__date-picker"
              />
            </div>
            <div className="search-section__input">
              <select
                className="search-section__select"
                value={searchOption.tourType}
                onChange={handleSelectTourTypes}
              >
                <option value="" className="search-section__option">
                  Tour Type
                </option>
                <option value="saab" className="search-section__option">
                  Saab
                </option>
                <option value="mercedes" className="search-section__option">
                  Mercedes
                </option>
                <option value="audi" className="search-section__option">
                  Audi
                </option>
              </select>
            </div>
            <button className="btn btn--primary" type="submit">
              Search
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Search;
