import React from "react";
import "./TourDetail.scss";
import cover from "../../../img/HoiAn01.jpg";
import Map from "../../shared/Map/Map";
import StarRatingComponent from "react-star-rating-component";
import Comment from "../../shared/Comment/Comment";

const imageCoverStyle = {
  backgroundImage: `linear-gradient(
      to right bottom,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    ), url(${cover})`,
};
const TourDetail = () => {
  return (
    <>
      <section className="tour-detail">
        <div className="tour-detail__image-cover" style={imageCoverStyle}>
          <div className="tour-detail__image-content">
            <h3 className="tour-detail__name">Pokemon Adventure</h3>
            <p className="tour-detail__summary">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Repellat, voluptatibus.
            </p>
          </div>
        </div>
        <div className="tour-detail__info">
          <div className="container">
            <div className="tour-detail__section">
              <div className="tour-detail__data">
                <i className="far fa-clock tour-detail__icon"></i>
                <span>10 days</span>
              </div>
              <div className="tour-detail__data">
                <i className="far fa-calendar-alt tour-detail__icon"></i>
                <span>January 1 2020</span>
              </div>
              <div className="tour-detail__data">
                <i className="far fa-flag tour-detail__icon"></i>
                <span>4 stops</span>
              </div>
              <div className="tour-detail__data">
                <i className="far fa-user tour-detail__icon"></i>
                <span>Max: 45</span>
              </div>
              <div className="tour-detail__data">
                <i className="fas fa-plane-departure tour-detail__icon"></i>
                <span>HCM City</span>
              </div>
              <div className="tour-detail__data">
                <i className="fas fa-plane-arrival tour-detail__icon"></i>
                <span>Ha Noi</span>
              </div>
            </div>
          </div>
        </div>
        <div className="tour-detail__description">
          <div className="container">
            <div className="row">
              <div style={{ flex: "3", marginRight: "2rem" }}>
                <div
                  style={{
                    backgroundColor: "#f9f9f9",

                    padding: "1rem",
                  }}
                >
                  <h3 className="tour-detail__description-title">
                    Description
                  </h3>
                  <p className="tour-detail__description-paragraph">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
                    ex praesentium quia deserunt cumque! Veritatis, officiis
                    cupiditate. Ullam dolore accusantium dicta. Iure facere
                    reprehenderit neque eius doloribus libero dicta possimus.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ullam, animi commodi. At sapiente hic, ratione illo ad vero
                    reiciendis? Quaerat reiciendis nam optio neque iusto!
                    Officiis atque quas beatae similique.{" "}
                  </p>
                </div>
                <div
                  className="tour-detail__guide"
                  style={{ margin: "2rem 0" }}
                >
                  <h3
                    style={{
                      fontSize: "2.5rem",
                      fontFamily: "var(--play)",
                      marginBottom: "1rem ",
                    }}
                  >
                    Your Guides
                  </h3>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ flex: "1" }}>
                      <img
                        src="https://randomuser.me/api/portraits/men/90.jpg"
                        alt="Guide"
                        style={{ borderRadius: "50%" }}
                      />
                      <ul>
                        <li>
                          <i
                            className="fas fa-star"
                            style={{
                              color: "#111",
                              margin: "1rem",
                              marginLeft: "1rem",
                            }}
                          ></i>
                          <span>5.0 Rating</span>
                        </li>
                        <li>
                          <i
                            className="fas fa-comment"
                            style={{
                              color: "#111",
                              margin: "1rem",
                              marginLeft: "1rem",
                            }}
                          ></i>
                          <span>20 Reviews</span>
                        </li>
                        <li>
                          <i
                            className="fas fa-suitcase"
                            style={{
                              color: "#111",
                              margin: "1rem",
                              marginLeft: "1rem",
                            }}
                          ></i>
                          <span>5 Tours</span>
                        </li>
                      </ul>
                    </div>
                    <div style={{ flex: "4" }}>
                      <p
                        style={{
                          color: "var(--main)",
                          marginBottom: "2rem",
                          fontSize: "2rem",
                        }}
                      >
                        Peter Parker
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Nemo autem laudantium consequuntur magni in sunt
                        fugit ipsa, eos sequi quasi tenetur qui itaque error
                        molestiae, sint quae saepe quia maiores?
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="tour-detail__guide"
                  style={{ margin: "2rem 0" }}
                >
                  <h3
                    style={{
                      fontSize: "2.5rem",
                      fontFamily: "var(--play)",
                      marginBottom: "3rem ",
                    }}
                  >
                    Tour Location &amp; Schedule
                  </h3>
                  <Map />
                </div>
                <div
                  className="tour-detail__guide"
                  style={{ margin: "2rem 0" }}
                >
                  <h3
                    style={{
                      fontSize: "2.5rem",
                      fontFamily: "var(--play)",
                      marginBottom: "1rem ",
                    }}
                  >
                    Review
                  </h3>
                  <div>
                    <h3 style={{ fontSize: "6rem" }}>4.4</h3>
                    <StarRatingComponent
                      value={4.5}
                      name="tourRating"
                      className="tour-detail__rating-start"
                    />
                    <p style={{ marginBottom: "1rem" }}>Tour Rating</p>
                    <Comment />
                  </div>
                </div>
              </div>
              <div className="fixed" style={{ flex: "1" }}>
                <div className="price">$12.29</div>
                <button className="book">Book Now</button>
                <button
                  className="book"
                  style={{
                    background: "#eee",
                    color: "var(--heading)",
                  }}
                >
                  Compare Tour
                </button>
                <p className="refund">Refund available</p>
                <p style={{ marginBottom: "1rem" }}>Price includes: </p>
                <ul className="includes">
                  <li>
                    <i class="far fa-thumbs-up tour-detail__icon"></i>
                    Hotel Price
                  </li>
                  <li>
                    <i class="far fa-thumbs-up tour-detail__icon"></i>
                    Breakfast, Lunch and Dinner
                  </li>
                  <li>
                    <i class="far fa-thumbs-up tour-detail__icon"></i>
                    Transportaion
                  </li>
                  <li>
                    <i class="far fa-thumbs-up tour-detail__icon"></i>
                    Accomadation
                  </li>
                  <li>
                    <i class="far fa-thumbs-up tour-detail__icon"></i>
                    Entrance Fee
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* <div style={{ backgroundColor: "#f9f9ff" }}>
          <div className="container">
            <h3
              style={{ textAlign: "center", fontSize: "20px", padding: "2rem" }}
            >
              View Our Tour Schedule
            </h3>
            <Map />
          </div>
        </div> */}
      </section>
    </>
  );
};

export default TourDetail;
