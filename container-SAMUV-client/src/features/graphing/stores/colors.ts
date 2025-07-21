export const colors = [
  "#99cb38",
  "#63a537",
  "#37a76f",
  "#44c1a3",
  "#4eb3cf",
  "#216443",
  "#277663",
  "#247187",
  "#0784bf",
  "#add560",
  "#7fc551",
  "#18529D",
  "#28AD56",
];

export const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
}