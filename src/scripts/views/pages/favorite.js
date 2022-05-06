import FavoriteRestaurantIdb from '../../data/favoriterestaurant-db';
// import { createRestaurantItemTemplate } from '../templates/template-creator';
import '../component/catalog-item';
import '../component/loader';
import fallbackFailedFetch from '../templates/fallback-templates';
import { createEmptyTextTemplate } from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
    <section class="content">
    <h2 id="favorite-title" class="content_title">Favorite List</h2>
    <loader-component></loader-component>
    <div id="restaurants" class="catalog-list">
    </div>
</section>

        `;
  },
  async afterRender() {
    const loaderElement = document.querySelector('loader-component');
    const restaurantsContainer = document.querySelector('#restaurants');
    const contentContainer = document.querySelector('.content');
    loaderElement.style.display = 'block';
    try {
      const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
      loaderElement.style.display = 'none';
      if (restaurants.length > 0) {
        restaurants.forEach((restaurant) => {
          const itemElement = document.createElement('catalog-item');
          itemElement.restaurant = restaurant;
          restaurantsContainer.appendChild(itemElement);
        });
      } else {
        contentContainer.innerHTML += createEmptyTextTemplate();
      }
    } catch (error) {
      loaderElement.style.display = 'none';
      contentContainer.innerHTML = fallbackFailedFetch();
    }
  },

};

export default Favorite;
