import swal from 'sweetalert';
import RestaurantDbSource from '../data/restaurantdb-source';
import '../views/component/review-component';

const PostReviewInitiator = {
  async init({
    id, input, container, button,
  }) {
    this._input = input;
    this._id = id;
    this._container = container;
    this._button = button;

    await this._submitAction();
  },
  async _fetchPostReview(body) {
    try {
      const response = await RestaurantDbSource.postReview(body);
      return response;
    } catch (error) {
      return error;
    }
  },
  async _submitAction() {
    const { name, review } = this._input;

    this._button.addEventListener('click', async (event) => {
      event.preventDefault();
      if (name.value === '' || review.value === '') {
        swal('Oops', 'Field Cannot be Empty', 'error');
        name.value = '';
        review.value = '';
      } else {
        const body = {
          id: this._id,
          name: name.value,
          review: review.value,
        };

        await this._isSuccessPost(body);
      }
    });
  },
  async _isSuccessPost(body) {
    const { name, review } = this._input;
    const response = await this._fetchPostReview(body);
    if (response.message === 'success') {
      swal('Thank you !!', 'Review Submitted', 'success');
      await this._renderReviewe(response.customerReviews);
      name.value = '';
      review.value = '';
    } else {
      swal('Oh no..', 'failed, Check your connection', 'error');
    }
  },
  async _renderReviewe(data) {
    // const reviewElement = document.createElement('review-component');
    // reviewElement.reviewer = data.pop();
    this._container.innerHTML = '';
    data.forEach((review) => {
      const reviewElement = document.createElement('review-component');
      reviewElement.reviewer = review;
      this._container.appendChild(reviewElement);
    });

    // window.location.reload(true);
  },
};

export default PostReviewInitiator;
