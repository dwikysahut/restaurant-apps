class CustomHero extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="hero">
    <picture class="hero-image">
        <source media="(max-width: 600px)" srcset="./images/heros/hero-image_2-small.jpg">
        <img 
            src="./images/heros/hero-image_2-large.jpg" 
            alt="hero go eat"></img>
    </picture>
    <div class="hero_inner">
        <h1 class="hero_title">Kebahagiaan datang saat kita merasakan nikmatnya makan</h1>
        <p class="hero_tagline">Nikmati tiap suapan makanan mu, dan kebahagiaan akan datang kepadamu</p>
    </div>
  </div>
          `;
  }
}
customElements.define('custom-hero', CustomHero);
