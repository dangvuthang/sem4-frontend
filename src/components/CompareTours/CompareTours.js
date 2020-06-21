import React from "react";
import  "./CompareTours.scss";
//import styles from "./CompareTours.module.css";
import src from "../../img/HoiAn01.jpg";
const CompareTours = (props) => {
  return (
    <section className="tour-section">
      <div className="container">
        <div class="container backpack-container">
          <div class="row">
            <div class= "btn btn-primary" id="headerPanel">
              <h3 align="center">Welcome to your Backpack</h3>
              <h3 align="center">
                Compare your selections &amp; narrow down the best tour for you!
                Click "BOOK NOW" to check availability.
              </h3>
            </div>
          </div>
        </div>
        <div className="compare-container">
          <div id="comparedToursContainer">
            <table id="compareTable" className="backpack">
              <thead>
                <tr>
                  <th>
                    <div className="compare-header">
                      <div className="remove">
                        <a class="remove-tour">
                          REMOVE <i class="fa fa-close"></i>
                        </a>
                      </div>
                      <div>
                        <img
                          src={src}
                          srcset="https://res.cloudinary.com/tour-amigo/image/upload/w_780,h_380,c_fit,q_80/qe03sbcathjc2wsum3j3.jpg 2x"
                          class="tour-image"
                          alt="Majestic Alaska with Cruise Verandah Stateroom Tour Amigo"
                        />
                      </div>
                      <div class="title">
                        <a href="#">
                          Majestic Alaska with Cruise Verandah Stateroom
                        </a>
                      </div>
                    </div>
                  </th>
                  <th>
                    <div className="compare-header">
                      <div className="remove">
                        <a class="remove-tour">
                          REMOVE <i class="fa fa-close"></i>
                        </a>
                      </div>
                      <div>
                        <img
                          src={src}
                          srcset="https://res.cloudinary.com/tour-amigo/image/upload/w_780,h_380,c_fit,q_80/qe03sbcathjc2wsum3j3.jpg 2x"
                          class="tour-image"
                          alt="Majestic Alaska with Cruise Verandah Stateroom Tour Amigo"
                        />
                      </div>
                      <div class="title">
                        <a href="#">
                          Majestic Alaska with Cruise Verandah Stateroom
                        </a>
                      </div>
                    </div>
                  </th>
                </tr>

                <tr>
                  <th class="book-now-header">
                    <button class="btn btn-success btn-wide btn-raised no-padding check-availability-btn" type="button">
                      <span class="book-now-header-content">BOOK NOW</span>
                    </button>
                  </th>
                  <th class="book-now-header">
                    <button class="btn btn-success btn-wide btn-raised no-padding check-availability-btn" type="button">
                      <span class="book-now-header-content">BOOK NOW</span>
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div class="compare-info">
                      <span class="compare-title">
                        <i className="far fa-money-bill-alt tour-card__icon"></i>
                        Price
                      </span>
                      <br></br>
                      <span>350$</span>
                    </div>
                  </td>
                  <td>
                    <div class="compare-info">
                      <span class="compare-title">
                        <i className="far fa-money-bill-alt tour-card__icon"></i>
                        Price
                      </span>
                      <br></br>
                      <span>350$</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="compare-info">
                      <span class="compare-title">
                        <i className="far fa-clock tour-card__icon"></i>
                        Duration
                      </span>{" "}
                      <br></br>
                      <span>10 days</span>
                    </div>
                  </td>
                  <td>
                    <div class="compare-info">
                      <span class="compare-title">
                        <i className="far fa-clock tour-card__icon"></i>
                        Duration
                      </span>{" "}
                      <br></br>
                      <span>10 days</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="compare-info">
                      <span class="compare-title">
                        <i className="far fa-calendar-alt tour-card__icon"></i>
                        Start date
                      </span>{" "}
                      <br></br>
                      <span>January 1 2020</span>
                    </div>
                  </td>
                  <td>
                    <div class="compare-info">
                      <span class="compare-title">
                        <i className="far fa-calendar-alt tour-card__icon"></i>
                        Start date
                      </span>{" "}
                      <br></br>
                      <span>January 1 2020</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="compare-info">
                      <span class="compare-title">
                        <i className="far fa-user tour-card__icon"></i> Number
                        of customers
                      </span>{" "}
                      <br></br>
                      <span>45</span>
                    </div>
                  </td>
                  <td>
                    <div class="compare-info">
                      <span class="compare-title">
                        <i className="far fa-user tour-card__icon"></i> Number
                        of customers
                      </span>{" "}
                      <br></br>
                      <span>45</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="compare-info">
                      <span class="compare-title">
                        <i className="far fa-star tour-card__icon"></i>
                        Rating
                      </span>{" "}
                      <br></br>
                      <span>4.5 (3 Reviews)</span>
                    </div>
                  </td>
                  <td>
                    <div class="compare-info">
                      <span class="compare-title">
                        <i className="far fa-star tour-card__icon"></i>
                        Rating
                      </span>{" "}
                      <br></br>
                      <span>4.5 (3 Reviews)</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div class="compare-info">
                      <span class="compare-title">Highlights</span> <br></br>
                      <span>
                        {" "}
                        <p className="tour-card__summary">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Hic ex praesentium quia deserunt cumque!
                          Veritatis, officiis cupiditate. Ullam dolore
                          accusantium dicta. Iure facere reprehenderit neque
                          eius doloribus libero dicta possimus. Lorem ipsum
                          dolor sit amet consectetur adipisicing elit. Ullam,
                          animi commodi. At sapiente hic, ratione illo ad vero
                          reiciendis? Quaerat reiciendis nam optio neque iusto!
                          Officiis atque quas beatae similique.{" "}
                        </p>
                      </span>
                    </div>
                  </td>
                  <td>
                    <div class="compare-info">
                      <span class="compare-title">Highlights</span> <br></br>
                      <span>
                        {" "}
                        <p className="tour-card__summary">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Hic ex praesentium quia deserunt cumque!
                          Veritatis, officiis cupiditate. Ullam dolore
                          accusantium dicta. Iure facere reprehenderit neque
                          eius doloribus libero dicta possimus. Lorem ipsum
                          dolor sit amet consectetur adipisicing elit. Ullam,
                          animi commodi. At sapiente hic, ratione illo ad vero
                          reiciendis? Quaerat reiciendis nam optio neque iusto!
                          Officiis atque quas beatae similique.{" "}
                        </p>
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompareTours;
