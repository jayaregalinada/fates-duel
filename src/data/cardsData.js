import { MinionCard, SpellCard, WeaponCard } from '../entities/Card';

export default [
  new MinionCard('Ironclad Golem', 5, 7, 6, 'A sturdy golem built for battle'),
  new MinionCard(
    'Flame Imp',
    2,
    3,
    1,
    'A fiery imp that causes chaos on the battlefield'
  ),
  new MinionCard(
    'Yeti',
    4,
    5,
    4,
    'A powerful yeti that can crush enemies with ease'
  ),
  new MinionCard(
    'Gnoll Warrior',
    4,
    5,
    4,
    'A fierce gnoll that attacks with reckless abandon'
  ),
  new MinionCard(
    'Naiadra',
    3,
    4,
    3,
    'A mystical being that controls the power of water'
  ),
  new MinionCard(
    'Tauren Shaman',
    2,
    6,
    4,
    'A wise shaman that can heal allies and summon the forces of nature'
  ),
  new MinionCard(
    'Worgen Infiltrator',
    1,
    2,
    1,
    'A sneaky worgen that can slip past enemy defenses'
  ),
  new MinionCard(
    'Dragonkin Sorcerer',
    3,
    4,
    3,
    'A magical dragonkin that can cast powerful spells'
  ),
  new MinionCard(
    'Dark Iron Dwarf',
    4,
    4,
    4,
    'A tough dwarf that can boost the attack of other minions'
  ),
  new MinionCard(
    'Bloodfen Raptor',
    2,
    3,
    2,
    'A fierce raptor that strikes fear into the hearts of enemies'
  ),
  new MinionCard(
    'Kobold Geomancer',
    2,
    2,
    2,
    'A cunning kobold that channels the power of magic'
  ),
  new MinionCard(
    'River Crocolisk',
    2,
    3,
    2,
    'A deadly crocodile that lurks in rivers and lakes'
  ),
  new MinionCard(
    'Voodoo Doctor',
    1,
    2,
    1,
    'A wise voodoo practitioner that can heal allies'
  ),
  new MinionCard(
    'Murloc Raider',
    2,
    1,
    1,
    'A fierce murloc warrior that attacks with reckless abandon'
  ),
  new MinionCard(
    'Young Dragonhawk',
    1,
    1,
    1,
    'A small dragonhawk that can fly over enemy lines'
  ),
  new MinionCard(
    'Bloodsail Corsair',
    2,
    1,
    1,
    'A ruthless pirate that can disarm enemy weapons'
  ),
  new MinionCard(
    'Shieldbearer',
    1,
    4,
    1,
    'A brave warrior that can protect allies from harm'
  ),
  new MinionCard(
    'Dire Wolf Alpha',
    2,
    2,
    2,
    'A fierce dire wolf that can lead other minions into battle'
  ),
  new MinionCard(
    'Southsea Deckhand',
    2,
    2,
    1,
    'A numble pirate that can charge into battle'
  ),
  new MinionCard(
    'Leper Gnome',
    1,
    1,
    1,
    'A sneaky gnome that can damage enemy hereos'
  ),

  new SpellCard('Fireball', 5, 4, 'Deals 5 damage to a single target'),
  new SpellCard(
    'Frostbolt',
    3,
    2,
    'Deals 3 damage to a single target and freezes its, preventing it from attacking for one turn'
  ),
  new SpellCard(
    'Arcane Explosion',
    1,
    2,
    'Deals 1 damage to all enemy minions'
  ),
  new SpellCard('Healing Touch', 0, 3, 'Restores 8 health to a single target'),
  new SpellCard('Holy Smite', 2, 1, 'Deals 2 damage to a single target'),
  new SpellCard('Shadow Bolt', 4, 3, 'Deals 4 damage to a single target'),
  new SpellCard(
    'Bloodlust',
    0,
    5,
    'All friendly minions gain +3 attack from this turn'
  ),
  new SpellCard(
    'Swipe',
    4,
    4,
    'Deals 4 damage to a single target and 1 damage to all other enemies'
  ),
  new SpellCard(
    'Arcane Missiles',
    3,
    1,
    'Deals 3 damage randomly split among enemy minions'
  ),
  new SpellCard(
    'Mortal Coil',
    1,
    1,
    'Deals 1 damage to a single target and draws a card if the target dies'
  ),
  new SpellCard('Blessing of Might', 0, 1, 'Gives a friendly minion +3 attack'),
  new SpellCard('Blessing of Kings', 0, 4, 'Gives a friendly minion +4/+4'),
  new SpellCard(
    'Frost Nova',
    0,
    3,
    'Freezes all enemy minions, preventing them from attacking for one turn'
  ),
  new SpellCard(
    'Inner Fire',
    0,
    1,
    'Changes a friendly minion attack to be equal to its health'
  ),
  new SpellCard('Moonfire', 1, 0, 'Deals 1 damage to a single target'),
  new SpellCard(
    'Shadow Word Pain',
    0,
    2,
    'Destroys a minion with 3 or less attack'
  ),

  new WeaponCard('War Axe', 2, 2, 2, 'Increases the attack and health'),
  new WeaponCard('Battle Hammer', 1, 2, 2, 'Increase the attack and health'),
  new WeaponCard('Arcane Sword', 2, 3, 1, 'Gives +2 damage and +1 health'),
  new WeaponCard(
    'Poison Blade',
    2,
    2,
    0,
    'Ability to deal damage to the enemy equal to its attack'
  ),
  new WeaponCard('Iron Mace', 3, 3, 0, 'Increases the attack'),
  new WeaponCard('Shadow Dagger', 1, 1, 0, 'Increases the attack'),
  new WeaponCard(
    'Frost Spear',
    3,
    3,
    0,
    'Increases the attack and freezes the target'
  ),
  new WeaponCard('Lightbringer', 1, 3, 3, 'Gives Divine Health'),
  new WeaponCard('Thunder Hammer', 4, 4, 2, 'Increases the attack and Health'),
  new WeaponCard('Flametongue Blade', 2, 3, 0, 'Increases the attack'),
];

// export default [
//   new MinionCard('Body Bagger', 1, 3),
//   new MinionCard('Noxious Cadaver', 1, 2),
//   new MinionCard('Skeletal Sidekick', 1, 2),
//   new MinionCard('Ymirjar Frostbreaker', 1, 2),
//   new MinionCard('Battlefiend', 1, 2),
//   new MinionCard('Batty Guest', 1, 1),
//   new MinionCard('Arcane Wyrm', 1, 2),
//   new MinionCard('Sanguine Soldier', 2, 1),
//   new MinionCard('Righteous Protector', 1, 1),
//   new MinionCard('Novice Zapper', 3, 2),
//   new SpellCard('Heart Strike', 2),
//   new SpellCard('Icy Touch', 2),
//   new SpellCard('Taste of Chaos', 2),
//   new SpellCard('Unleash Fel', 1),
//   new SpellCard('Death Strike', 6),
//   new SpellCard('Marked Shot', 4),
//   new SpellCard('Piercing Shot', 6),
//   new SpellCard('Fireball', 6),
//   new SpellCard('Void Shard', 4),
//   new SpellCard('Demonic Assault', 3),
//   new WeaponCard('Venomstrike Bow', 1),
//   new WeaponCard('Truesilver Champion', 4, 2),
//   new WeaponCard('Counterfeit Blade', 4, 2),
//   new WeaponCard('Blacksmithing Hammer', 5, 1),
//   new WeaponCard('Bone Breaker', 2, 2),
//   new WeaponCard('Candleshot', 1, 3),
//   new WeaponCard('Blackwater Cutlass', 2, 2),
//   new WeaponCard('Whetstone Hatchet', 1, 4),
//   new WeaponCard('The Lobotomizer', 2, 2),
//   new WeaponCard('Frostmourne', 5, 5),
//   new WeaponCard('Flamereaper', 5, 5),
// ];
