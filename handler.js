exports.zalgo = async (event) => {
  console.info(event);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: zalgoText(event.body, "chaotic"),
    }),
  };
};

function zalgoText(text, intensity) {
  const zalgoUp = [
    "\u030d",
    "\u030e",
    "\u0304",
    "\u0305",
    "\u033f",
    "\u0311",
    "\u0312",
    "\u031a",
    "\u033e",
  ];
  const zalgoDown = [
    "\u0316",
    "\u0317",
    "\u0318",
    "\u0319",
    "\u031c",
    "\u031d",
    "\u031e",
    "\u031f",
    "\u0320",
  ];
  const zalgoMid = [
    "\u0315",
    "\u031b",
    "\u0340",
    "\u0341",
    "\u0358",
    "\u0323",
    "\u0326",
    "\u032b",
    "\u0338",
  ];

  let zalgoMarks = {
    mild: { up: 1, mid: 1, down: 1 },
    chaotic: { up: 2, mid: 2, down: 2 },
    apocalyptic: { up: 3, mid: 3, down: 3 },
  };

  const levels = zalgoMarks[intensity] || zalgoMarks.mild;

  return text
    .split("")
    .map((char) => {
      const up = Array.from(
        { length: levels.up },
        () => zalgoUp[Math.floor(Math.random() * zalgoUp.length)]
      ).join("");
      const down = Array.from(
        { length: levels.down },
        () => zalgoDown[Math.floor(Math.random() * zalgoDown.length)]
      ).join("");
      const mid = Array.from(
        { length: levels.mid },
        () => zalgoMid[Math.floor(Math.random() * zalgoMid.length)]
      ).join("");

      return char + up + mid + down;
    })
    .join("");
}
