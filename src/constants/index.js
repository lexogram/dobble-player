const hostname = location.hostname
export const IS_DEPLOYED = /player.*\.onrender.com/.test(hostname)
  || /lexogram.github.io/.test(hostname)

export const HOSTNAME = IS_DEPLOYED
  ? "player-backend-o5aj.onrender.com"
  : "localhost"

export const PORT = IS_DEPLOYED
  ? ""       // no colon
  : ":10000" // includes colon

export const PACK_SOURCE = "/dobble/packs.json"

export const DELAY_ARRAY = [
  [500,  "Show next card after half a second"],
  [1000, "Show next card after 1 second"],
  [2000, "Show next card after 2 seconds"],
  [3000, "Show next card after 3 seconds"],
  [4000, "Show next card after 4 seconds"],
  [5000, "Show next card after 5 seconds"],
  ["click", "Click \"Next Card\" button to show it"]
]