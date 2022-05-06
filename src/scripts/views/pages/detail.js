import UrlParser from '../../routes/url-parser';
import RestaurantDbSource from '../../data/restaurantdb-source';
import FavoriteRestaurantIdb from '../../data/favoriterestaurant-db';

import '../component/detail-component';
import '../component/loader';

import PostReviewInitiator from '../../utils/post-review-init';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import fallbackFailedFetch from '../templates/fallback-templates';

const Detail = {
  async render() {
    return `
    <loader-component></loader-component>
    <div id="restaurant" class="container">
        <detail-component></detail-component>
        <div class="review-form">
          <form>
              <div class="review-form__wrapper">
                  <label for="inputName">Name</label><br>
                  <input type="text" id="inputName" name="inputName" class="form-control"><br>
              </div>
              <div class="review-form__wrapper">
                  <label for="inputReview">Review</label><br>
                  <textarea id="inputReview" name="inputReview" class="form-control" rows="7"></textarea>
              </div>
              <div class="submit-container">
                  <button type="submit" id="submitReviewForm" class="submit-button">Submit</button>
              </div>
          </form>
        </div>
    </div>
    <div id="likeButtonContainer"></div>
    `;
  },
  async afterRender() {
    const loaderElement = document.querySelector('loader-component');
    const contentContainer = document.querySelector('#restaurant');
    loaderElement.style.display = 'block';
    try {
      const url = UrlParser.parseActiveWithoutCombiner();
      const data = await RestaurantDbSource.detailRestaurant(url.id);
      const detailComponent = document.querySelector('detail-component');
      loaderElement.style.display = 'none';
      detailComponent.restaurant = data.restaurant;

      LikeButtonPresenter.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        favoriteRestaurants: FavoriteRestaurantIdb,
        restaurant: {
          id: url.id,
          name: data.restaurant.name,
          city: data.restaurant.city,
          rating: data.restaurant.rating,
          pictureId: data.restaurant.pictureId,
        },
      });
      PostReviewInitiator.init({
        id: data.restaurant.id,
        input: {
          name: document.querySelector('#inputName'),
          review: document.querySelector('#inputReview'),
        },
        container: detailComponent.getReviewContainer,
        button: document.querySelector('#submitReviewForm'),

      });
    } catch (error) {
      loaderElement.style.display = 'none';
      contentContainer.innerHTML = fallbackFailedFetch();
    }
  },

};
export default Detail;
