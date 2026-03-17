export const decodeHTML = (str) =>
  str
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

export const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);