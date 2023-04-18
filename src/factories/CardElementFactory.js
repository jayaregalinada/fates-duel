export function createImage(url) {
  const image = document.createElement('div');
  image.classList.add('image');
  const img = document.createElement('img');
  img.src = url;
  img.addEventListener('error', (event) => {
    event.target.setAttribute('src', './assets/generic-card.png');
  });

  image.appendChild(img);

  return image;
}

function createHeading(...headings) {
  const el = document.createElement('header');
  el.classList.add('heading');

  headings.forEach((heading) => {
    el.appendChild(heading);
  });

  return el;
}

export function createDiv(textContent, ...classList) {
  const el = document.createElement('div');
  el.classList.add(...classList);
  el.textContent = textContent;
  el.title = textContent;

  return el;
}

export function createStats(...stats) {
  const el = document.createElement('div');
  el.classList.add('stats');

  stats.forEach((stat) => {
    el.appendChild(stat);
  });

  return el;
}

/**
 * @param {import('../Card').default|null} card
 */
function CardElementFactory(card) {
  const el = document.createElement('div');

  // If card is undefined, just return a flip card
  if (!card) {
    el.classList.add('card', 'card-back');
    el.appendChild(createImage('./assets/card-back.png'));

    return el;
  }

  el.classList.add('card', `card-${card.type}`);

  el.appendChild(
    createHeading(
      createDiv(card.manaCost, 'mana'),
      createDiv(card.name, 'name')
    )
  );
  el.appendChild(createImage(card.imagePath));

  el.appendChild(createDiv(card.description, 'description'));

  el.appendChild(
    createStats(
      createDiv(card.attack, 'stat', 'attack'),
      createDiv(card.type, 'stat', 'type'),
      createDiv(card.health, 'stat', 'health')
    )
  );

  return el;
}

export default CardElementFactory;
