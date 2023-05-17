const grid = document.querySelector('.grid');
const prevButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');
const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
let currentPage = 1;
// llamada de la api
function renderCharacters(page, name) {
  let url = `https://rickandmortyapi.com/api/character/?page=${page}`;
  if (name) {
    url += `&name=${name}`;
  }
  let i=1;

  let row = '';
  fetch(url)
    .then(response => response.json())
    .then(data => {
      data.results.forEach(character => {
        if (i==1) {
          row = row + `<div class="card-group" id="conjuntoTarjetas">`;
        }
        row = row + `        
          <div class="card" id="tarjeta">
            <img src="${character.image}" class="card-img-top" alt="...">
            <div class="card-body">
                    <h5 class="card-title">${character.name}</h5>
                    <p class="card-text">Especies : ${character.species} </p>
                    <p class="card-text">Status : ${character.status} </p>
                </div>
        </div>            
        `;
        if (i%5==0) {
          row = row + `</div><div class="card-group">`;
          
        }
        i = i+1;
        
      });

    grid.innerHTML = row;
     })
    // .catch(error => console.error(error));
}

searchButton.addEventListener('click', () => {
  const name = searchInput.value.trim();
  if (name) {
    renderCharacters(1, name);
    currentPage = 1;
  }
});

renderCharacters(currentPage);

// Botonera para paginar
prevButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderCharacters(currentPage, searchInput.value.trim());
  }
});

nextButton.addEventListener('click', () => {
  currentPage++;
  renderCharacters(currentPage, searchInput.value.trim());
});

