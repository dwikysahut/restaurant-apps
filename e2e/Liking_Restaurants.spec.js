/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-undef */
const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#favorite-title');

  I.see('Empty', '.empty-text');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Empty', '.empty-text');

  I.amOnPage('/');

  I.seeElement('.item-title a');
  //   pause();
  const firstItem = locate('.item-title a').first();
  const firstItemTitle = await I.grabTextFrom(firstItem);
  console.log(firstItemTitle);
  I.waitForElement('catalog-item');
  I.click(firstItem);

  I.seeElement('.detail_poster');
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.catalog-item');

  const likedFromTitle = await I.grabTextFrom('.item-title a');
  assert.strictEqual(firstItemTitle, likedFromTitle);
});

Scenario('cancel liking restaurant', async ({ I }) => {
  I.amOnPage('/');
  I.waitForElement('catalog-item');
  I.seeElement('.item-title a');
  //   pause();
  const firstItem = locate('.item-title a').first();
  const firstItemTitle = await I.grabTextFrom(firstItem);
  console.log(firstItemTitle);

  I.click(firstItem);

  I.seeElement('.detail_poster');
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.catalog-item');

  const likedFromTitle = await I.grabTextFrom('.item-title a');
  assert.strictEqual(firstItemTitle, likedFromTitle);

  // unlike restaurant
  I.click(locate('.item-title a').first());
  I.seeElement('#likeButton');
  I.click('#likeButton');

  // cek di halaman favorite kosong
  I.amOnPage('/#/favorite');
  I.see('Empty', '.empty-text');
});
