import PlayerInfoElementFactory from '../factories/PlayerInfoElementFactory';

/**
 * @param {import('../Game').default} game
 * @param {Object} config
 */
function PlayerInfoRenderer(game, config) {
  this.config = config;

  /**
   * @param {HTMLElement} element
   */
  function emptyElement(element) {
    while (element.firstElementChild) {
      element.firstElementChild.remove();
    }
  }

  this.render = () => {
    const {
      playerHealthEl,
      playerManaEl,
      enemyHealthEl,
      enemyManaEl,
      playerHeroEl,
      enemyHeroEl,
    } = this.config;

    [
      playerHealthEl,
      playerManaEl,
      enemyHealthEl,
      enemyManaEl,
      playerHeroEl,
      enemyHeroEl,
    ].forEach((element) => {
      emptyElement(element);
    });

    const [player, enemy] = game.players;

    const playerInfo = new PlayerInfoElementFactory(player);

    playerInfo.health.forEach((el) => {
      playerHealthEl.appendChild(el);
    });
    playerInfo.mana.forEach((el) => {
      playerManaEl.appendChild(el);
    });
    playerInfo.hero.forEach((el) => {
      playerHeroEl.appendChild(el);
    });

    const enemyInfo = new PlayerInfoElementFactory(enemy, true);

    enemyInfo.health.forEach((el) => {
      enemyHealthEl.appendChild(el);
    });
    enemyInfo.mana.forEach((el) => {
      enemyManaEl.appendChild(el);
    });
    enemyInfo.hero.forEach((el) => {
      enemyHeroEl.appendChild(el);
    });
  };
}

export default PlayerInfoRenderer;
