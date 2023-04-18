/**
 * This will create your own event so we can listen to.
 *
 * @param {string} eventType
 * @param {Object} detail
 */
export default function GameEvent(eventType, detail) {
  this.eventType = `game:${eventType}`;
  this.detail = detail;
}
