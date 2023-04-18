function GameListener(gameRootEl) {
  const event = (name) => `game:${name}`;

  /**
   * @type {Element}
   */
  this.gameRoot = gameRootEl;

  const cleanUpGameRootClasses = () => {
    this.gameRoot.classList.remove(
      'start-turn',
      'end-turn',
      'player-turn',
      'enemy-turn'
    );
  };

  /**
   * @param {Document} theDoc
   */
  this.listen = (theDoc) => {
    theDoc.addEventListener(event('startTurn'), (e) => {
      cleanUpGameRootClasses();
      this.gameRoot.classList.add('start-turn');
      this.gameRoot.classList.add(
        e.detail.turnIndex === 0 ? 'player-turn' : 'enemy-turn'
      );
    });
    theDoc.addEventListener(event('endTurn'), () => {
      cleanUpGameRootClasses();
      this.gameRoot.classList.add('end-turn');
    });
  };
}

export default GameListener;
