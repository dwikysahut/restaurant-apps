class TopBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <header>
        <div class="logo">
            <img width="100px" height="100px" src="./images/logo-restaurant.png" alt="logo web Go Eat">    
            <h1 class="header_title">
                Go Eat
            </h1>
        </div>
        <button id="hamburger" aria-label="hamburger button drawer" href="#">☰</button>
        <nav id="drawer" class="nav">

            <ul class="nav_list">
                <li class="nav_item"><a href="#/home">Home</a></li>
                <li class="nav_item"><a href="#/favorite">Favorite</a></li>
                <li class="nav_item"><a href="https://github.com/dwikysahut?tab=repositories">About Us</a></li>
            </ul>
        </nav>
    </header>
        `;
  }
}
customElements.define('top-bar', TopBar);
