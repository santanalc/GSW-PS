export function getNotes(
  value: number,
  availableNotes: { "100": number; "50": number; "20": number; "10": number }
) {
  const enter = value;

  let counter100 = 0;
  let counter50 = 0;
  let counter20 = 0;
  let counter10 = 0;

  if (value != 0) {
    while (value >= 100 && availableNotes["100"] > 0) {
      counter100++;
      value -= 100;

      availableNotes["100"] -= 1;
    }

    while (value >= 50 && availableNotes["50"] > 0) {
      counter50++;
      value -= 50;

      availableNotes["50"] -= 1;
    }

    while (value >= 20 && availableNotes["20"] > 0) {
      counter20++;
      value -= 20;

      availableNotes["20"] -= 1;
    }

    while (value >= 10 && availableNotes["10"] > 0) {
      counter10++;
      value -= 10;

      availableNotes["10"] -= 1;
    }
  }

  const total =
    counter100 * 100 + counter50 * 50 + counter20 * 20 + counter10 * 10;

  const rest = enter - total;

  return {
    total,
    rest,
    availableNotes,
    notes: {
      "100": counter100,
      "50": counter50,
      "20": counter20,
      "10": counter10,
    },
  };
}
