const hostname = location.hostname
export const IS_DEPLOYED = /player.*\.onrender.com/.test(hostname)

export const HOSTNAME = IS_DEPLOYED
  ? "player-backend-o5aj.onrender.com"
  : "localhost"

export const PORT = IS_DEPLOYED
  ? ""       // no colon
  : ":10000" // includes colon

export const PACK_SOURCE = "/dobble/packs.json"

