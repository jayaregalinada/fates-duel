import BattleField from './BattleField';
import Game from './Game';
import GameListener from './listeners/GameListener';
import Player from './entities/Player';
import cardsData from './data/cardsData';
import heroesData from './data/heroesData';
import shuffleCards from './utils/shuffleCards';

const gameRoot = document.getElementById('root');

const [playerHero, enemyHero] = shuffleCards(heroesData);

const player = new Player('player', cardsData, playerHero);
const enemy = new Player('computer', cardsData, enemyHero);

const battleField = new BattleField(player, enemy);

const gameListener = new GameListener(gameRoot);
gameListener.listen(document);

const game = new Game(battleField);
game.start(window, document);

document.addEventListener('game:render', () => game.render());
