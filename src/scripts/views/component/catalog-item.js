import CONFIG from '../../globals/config';

class CatalogItem extends HTMLElement {
  set restaurant(restaurant) {
    this._restaurant = restaurant;
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="catalog-item" data-id="${this._restaurant.id}">
        <div class="card resto_item"> 
            <picture class="item-image">
                <source media="(max-width: 600px)" data-srcset="${CONFIG.BASE_IMAGE_URL_SMALL}${this._restaurant.pictureId}">
                <img class="lazyload" data-src="${CONFIG.BASE_IMAGE_URL_MEDIUM}${this._restaurant.pictureId}" alt="gambar restoran ${this._restaurant.name}">
            </picture>
      
            <div class="item_content">
                <div class="inner_content">
                    <span class="item-rating"><i class="fa fa-star"></i> <b>${parseFloat(this._restaurant.rating).toFixed(1)} </b></span>
                    <span class="item-city">${this._restaurant.city}</span>
                </div>
            <h3 class="item-title"><a href="/#/detail/${this._restaurant.id}" tabindex="0">${this._restaurant.name} </a></h3>
            </div>  
        </div>
    </div>
        `;
  }
}
customElements.define('catalog-item', CatalogItem);
