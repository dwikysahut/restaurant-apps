/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
const assert = require('assert');

Feature('Adding Review Restaurants');

Scenario('showing list restaurants', ({ I }) => {
  I.amOnPage('/');
  I.waitForElement('.catalog-item');
  I.seeElement('.catalog-item');
});

Scenario('adding review to a restaurant', async ({ I }) => {
  I.amOnPage('/');
  I.waitForElement('catalog-item');
  I.seeElement('.item-title a');
  //   pause();
  const firstItem = locate('.item-title a').first();

  I.click(firstItem);

  I.seeElement('.detail_poster');
  I.seeElement('#inputName');
  I.seeElement('#inputReview');

  const review = {
    name: 'dwiky',
    text: 'ini bagus',
  };

  I.fillField('inputName', review.name);
  I.fillField('inputReview', review.text);

  I.seeElement('#submitReviewForm');
  I.click('#submitReviewForm');
  const lastReview = locate('.review-text').last();
  const lastReviewText = await I.grabTextFrom(lastReview);

  assert.strictEqual(lastReviewText, review.text);
});
