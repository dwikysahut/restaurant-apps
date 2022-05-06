import CONFIG from '../../globals/config';
import './review-component';

class DetailComponent extends HTMLElement {
  set restaurant(restaurant) {
    this._restaurant = restaurant;
    this.render();
  }

  get getReviewContainer() {
    return document.querySelector('.testimoni');
  }

  render() {
    this.innerHTML = `
        <div class="restaurant-detail">
            <h2 tabIndex="0" class="detail_title">${this._restaurant.name}</h2>
            <div class="detail_poster">
                <img src="${CONFIG.BASE_IMAGE_URL_MEDIUM}${this._restaurant.pictureId}"
                    alt="gambar restoran ${this._restaurant.name}">
            </div>
            <div class="detail_info">
                <h3>Information</h3>
                <div class="inner_info flex">
                    <p><i class="fas fa-map-marker-alt" aria-hidden="true"></i> ${this._restaurant.address},
                        ${this._restaurant.city}</p>
                    <p><i class="fas fa-star" aria-hidden="true"></i>
                        ${parseFloat(this._restaurant.rating).toFixed(1)}</p>
                </div>
                <div class="detail_deskripsi">
                    <h4>Deskripsi</h4>
                    <p>${this._restaurant.description}</p>
                </div>
            </div>
            <div class="detail_category">
                ${this._restaurant.categories.map((category) => `<span>${category.name}</span>`).join('')}

            </div>
            <div class="container_menu">
                <h4 class="title-menu">Menu</h4>
                <div class="category_menu flex">
                    <div class="menu">
                        <h4>Makanan</h4>
                        <ul>
                            ${this._restaurant.menus.foods.map((food) => `<li>${food.name}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="menu">
                        <h4>Minuman</h4>
                        <ul>
                            ${this._restaurant.menus.drinks.map((drink) => `<li>${drink.name}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
            <div class="detail_reviews">
                <h3>Reviews</h3>
                <div class="testimoni">
                   
                </div>
            </div>
        </div>
      
    
   

    `;
    const testimoniContainer = document.querySelector('.testimoni');
    this._restaurant.customerReviews.map((reviewer) => {
      const reviewElement = document.createElement('review-component');
      reviewElement.reviewer = reviewer;
      return testimoniContainer.appendChild(reviewElement);
    });
  }
}

customElements.define('detail-component', DetailComponent);
