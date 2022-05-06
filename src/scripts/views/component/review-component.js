class ReviewComponent extends HTMLElement {
  set reviewer(reviewer) {
    this._reviewer = reviewer;
    this.render();
  }

  get getFormContainer() {
    return {
      name: document.querySelector('#inputName'),
      review: document.querySelector('#inputReview'),
    };
  }

  render() {
    this.innerHTML = `
    <div class="card review">
    <div class="review-item">
        <span class="review-name">${this._reviewer.name}</span>
        <p class="review-text">${this._reviewer.review}</p>
        <span class="review-date">${this._reviewer.date}</span>
    </div>
</div>
    `;
  }
}

customElements.define('review-component', ReviewComponent);
