let books = [
    { title: "JavaScript Book", image: "img/js3d.jpg" },
    { title: "Book 2", image: "img/12d0afec49bbf039a3c6913bf762ecb9.jpg" },
    { title: "Book 3", image: "img/2d85b14b1a846315f97b5e4578c3ef51.jpg" },
    { title: "Book 4", image: "img/71AYChRKzBL._AC_UF350,350_QL50_.jpg" },
    { title: "Book 5", image: "img/7a935d5a91f7e467a9d28b5c34f19f02.jpg" },
    { title: "Book 6", image: "img/8171410882fc2be4c2f3a5b103de9b0c.jpg" },
    { title: "Book 7", image: "img/d1f5a7ff3ec6725a42c80491e8b83833.jpg" },
  ];
  
  let storedBooks = JSON.parse(localStorage.getItem('allBooks')) || [];
  books = books.concat(storedBooks); 
  
  let slider = document.querySelector('.slider');
  let next = document.getElementById('next');
  let prev = document.getElementById('prev');
  
  books.forEach(book => {
    let div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
      <img src="${book.image}" alt="${book.title}">
      <button class="add-to-list-btn">Add to My List</button>
    `;
    slider.insertBefore(div, next);
  });
  
  let items = document.querySelectorAll('.slider .item');
  let active = 3;
  
  function loadShow() {
    let stt = 0;
    items[active].style.transform = `none`;
    items[active].style.zIndex = 1;
    items[active].style.filter = 'none';
    items[active].style.opacity = 1;
  
    for (let i = active + 1; i < items.length; i++) {
      stt++;
      items[i].style.transform = `translateX(${250 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
      items[i].style.zIndex = -stt;
      items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
  
    stt = 0;
    for (let i = active - 1; i >= 0; i--) {
      stt++;
      items[i].style.transform = `translateX(${-250 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
      items[i].style.zIndex = -stt;
      items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
  }
  loadShow();
  
  next.onclick = () => {
    active = active + 1 < items.length ? active + 1 : active;
    loadShow();
  };
  prev.onclick = () => {
    active = active - 1 >= 0 ? active - 1 : active;
    loadShow();
  };
  
let addButtons = document.querySelectorAll('.add-to-list-btn');

addButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        let img = items[index].querySelector('img');
        let src = img.getAttribute('src');

        let list = JSON.parse(localStorage.getItem('myBookList')) || [];

        
        if (!list.includes(src)) {
            list.push(src);
            localStorage.setItem('myBookList', JSON.stringify(list));
            alert("Book added to your list!");
        } else {
            alert("This book is already in your list.");
        }
    });
});
