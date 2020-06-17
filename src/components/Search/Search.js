import React, { useState } from "react";
import "./Search.scss";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
const Search = ({ tourTypes }) => {
  const [searchOption, setSearchOption] = useState({
    keyword: "",
    tourType: "",
    duration: "",
  });

  const history = useHistory();
  const handleSearchTour = e => {
    const { keyword, tourType, duration } = searchOption;
    e.preventDefault();
    if (!duration)
      return toast.warning("Duration is required", {
        position: "top-center",
        autoClose: 2000,
      });
    if (!tourType)
      return toast.warning("Tour Type is required", {
        position: "top-center",
        autoClose: 2000,
      });
    let searchCriteria = "";
    if (keyword) searchCriteria += `name=${keyword}&`;
    if (tourType) searchCriteria += `tourType=${tourType}&`;
    if (duration) searchCriteria += `duration=${duration}`;
    history.push(`/tours?${searchCriteria}`);
  };

  const handleSeachTourOptionChange = ({ target: element }) => {
    if (element.id === "keyword") {
      setSearchOption({ ...searchOption, [element.id]: element.value });
    }
    if (element.id !== "keyword") {
      element.firstChild.disabled = true;
      setSearchOption({ ...searchOption, [element.id]: element.value });
    }
  };

  return (
    <>
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
                  id="keyword"
                  onChange={handleSeachTourOptionChange}
                />
              </div>
              <div className="search-section__input">
                <select
                  id="duration"
                  className="search-section__select"
                  value={searchOption.duration}
                  onChange={handleSeachTourOptionChange}
                >
                  <option value="" className="search-section__option">
                    Duration
                  </option>
                  <option className="search-section__option" value="4">
                    2-4 Days
                  </option>
                  <option className="search-section__option" value="6">
                    5-7 Days
                  </option>
                  <option className="search-section__option" value="7">
                    7+ Days
                  </option>
                </select>
              </div>
              <div className="search-section__input">
                <select
                  id="tourType"
                  className="search-section__select"
                  value={searchOption.tourType}
                  onChange={handleSeachTourOptionChange}
                >
                  <option value="" className="search-section__option">
                    Tour Type
                  </option>
                  {tourTypes.map(type => (
                    <option
                      value={type.id}
                      className="search-section__option"
                      key={type.id}
                    >
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
              <button className="btn btn--primary" type="submit">
                Search
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Search;
