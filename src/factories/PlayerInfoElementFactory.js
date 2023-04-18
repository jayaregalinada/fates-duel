function createManaValue(mana, maxMana) {
  const elements = [];
  for (let index = 0; index < mana; index += 1) {
    const el = document.createElement('div');
    el.classList.add('value');

    elements.push(el);
  }
  const noValueMana = maxMana - mana;
  for (let index = 0; index < noValueMana; index += 1) {
    const el = document.createElement('div');
    el.classList.add('no-value');

    elements.push(el);
  }

  return elements;
}

function createHealthValue(health) {
  const el = document.createElement('div');
  el.classList.add('value');
  el.style.width = `${health}%`;

  const textValue = document.createElement('div');
  textValue.classList.add('text-value');
  textValue.textContent = health;

  return [el, textValue];
}

/**
 * @param {import('../Hero').default} hero
 */
function createHero(hero, inverted = false) {
  const elements = [];

  const img = document.createElement('img');
  img.setAttribute('src', hero.imagePath);

  const nameContainer = document.createElement('div');
  nameContainer.classList.add('name-container');

  const name = document.createElement('p');
  name.textContent = hero.name;
  name.classList.add('name');

  const subName = document.createElement('p');
  subName.textContent = hero.subName;
  subName.classList.add('sub-name');

  nameContainer.appendChild(name);
  nameContainer.appendChild(subName);

  const el = [img, nameContainer];

  if (inverted) {
    el.reverse();
  }

  elements.push(...el);

  return elements;
}

/**
 * @param {import('../Player').default} player
 */
function PlayerInfoElementFactory(player, inverted = false) {
  return {
    health: createHealthValue(player.health),
    mana: createManaValue(player.mana, player.getTotalMana()),
    hero: createHero(player.hero, inverted),
  };
}

export default PlayerInfoElementFactory;
