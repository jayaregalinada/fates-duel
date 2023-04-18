export const EVENT_TYPES = {
  addedToField: 'addedToField',
  addedWeapon: 'addedWeapon', 
  addedSpell: 'addedSpell'
};

/**
 * This will create your own event so we can listen to.
 *
 * @param {string} eventType
 * @param {Object} detail
 */
export default function BattleEvent(eventType, detail) {
  this.eventType = `battleField:${eventType}`;
  this.detail = detail;
}
