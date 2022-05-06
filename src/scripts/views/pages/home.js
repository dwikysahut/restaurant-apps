import RestaurantDbSource from '../../data/restaurantdb-source';
import fallbackFailedFetch from '../templates/fallback-templates';
import '../component/catalog-item';
import '../component/loader';

const Home = {
  async render() {
    return `
        <section class="content">
            <h2 class="content_title">Katalog</h2>
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
      const restaurants = await RestaurantDbSource.listRestaurants();
      loaderElement.style.display = 'none';

      restaurants.forEach((restaurant) => {
        const itemElement = document.createElement('catalog-item');
        itemElement.restaurant = restaurant;
        restaurantsContainer.appendChild(itemElement);
      });
    } catch (error) {
      loaderElement.style.display = 'none';
      contentContainer.innerHTML = fallbackFailedFetch();
    }
  },

};

export default Home;
