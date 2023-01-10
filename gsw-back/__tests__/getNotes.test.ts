import { getNotes } from "../src/utils/getNotes";

describe("testing getNotes function", () => {
  test("Getting all $100 notes and 5 notes of $50", () => {
    const notes = getNotes(1280, { "100": 10, "50": 6, "20": 10, "10": 10 });

    expect(notes.availableNotes["100"]).toBe(0);
    expect(notes.notes["50"]).toBe(5);
  });

  test("Getting available notes when ask more than possible", () => {
    const notes = getNotes(10000, { "100": 10, "50": 6, "20": 10, "10": 10 });

    expect(notes.total).toBe(1600);
  });

  test("Ask value that doesn't have notes", () => {
    const notes = getNotes(5, { "100": 10, "50": 6, "20": 10, "10": 10 });

    expect(notes.total).toBe(0);
  });

  test("Ask value when there are not $100 notes", () => {
    const notes = getNotes(150, { "100": 0, "50": 6, "20": 10, "10": 10 });

    expect(notes.notes["50"]).toBe(3);
  });

  test("Ask $30", () => {
    const notes = getNotes(30, { "100": 10, "50": 10, "20": 10, "10": 10 });

    expect(notes.notes["100"]).toBe(0);
    expect(notes.notes["50"]).toBe(0);
    expect(notes.notes["20"]).toBe(1);
    expect(notes.notes["10"]).toBe(1);

    expect(notes.availableNotes["20"]).toBe(9);
    expect(notes.availableNotes["10"]).toBe(9);
  });

  test("Ask $80", () => {
    const notes = getNotes(80, { "100": 10, "50": 10, "20": 10, "10": 10 });

    expect(notes.notes["100"]).toBe(0);
    expect(notes.notes["50"]).toBe(1);
    expect(notes.notes["20"]).toBe(1);
    expect(notes.notes["10"]).toBe(1);

    expect(notes.availableNotes["50"]).toBe(9);
    expect(notes.availableNotes["20"]).toBe(9);
    expect(notes.availableNotes["10"]).toBe(9);
  });
});
