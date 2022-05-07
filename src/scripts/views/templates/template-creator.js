const createLikeButtonTemplate = () => `
<button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;
const createUnlikeButtonTemplate = () => `
<button aria-label="unlike this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;
const createEmptyTextTemplate = () => `
  <h3 class="empty-text">Empty</h3>
`;
const createSkeletonRestaurantTemplate = (count) => {
  let template = '';

  for (let i = 0; i < count; i += 1) {
    template += `
    <div class="catalog-item">
    <div class="card resto_item"> 
        <picture class="item-image">
            <img src="./images/placeholder.png" alt="skeleton">
        </picture>
        <div class="item_content">
            <div class="inner_content">
                <span class="item-rating"><i class="fa fa-star"></i> <b>0</b></span>
                <span class="item-city">loading</span>
            </div>
        <h3 class="item-title"><a href="#" tabindex="0">Title </a></h3>
        </div>  
    </div>
</div>
  `;
  }
  return template;
};
export {
  createLikeButtonTemplate,
  createUnlikeButtonTemplate,
  createEmptyTextTemplate,
  createSkeletonRestaurantTemplate,
};
