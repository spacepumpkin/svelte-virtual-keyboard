export interface KeyConfig {
  label: string;
  value: string;
  upper: string;
  ignoreValue: boolean;
}

/**
 * @param label - label of keyboard key
 * @param upper - value when key is pressed together with Shift
 * @param value - value when key is pressed
 */
const keyed = (
  label: string,
  upper?: string,
  value?: string,
  ignoreValue = false
): KeyConfig => {
  value ??= label.toLowerCase();
  upper ??= value.toUpperCase();

  return {
    label,
    value,
    upper,
    ignoreValue,
  };
};
const row0 = [
  keyed("1", "!"),
  keyed("2", "@"),
  keyed("3", "#"),
  keyed("4", "$"),
  keyed("5", "%"),
  keyed("6", "^"),
  keyed("7", "&"),
  keyed("8", "*"),
  keyed("9", "("),
  keyed("0", ")"),
  keyed("-", "_"),
  keyed("=", "+"),
  keyed("BACKSPACE", undefined, undefined),
];

const row1 = [
  keyed("TAB", "\t", "\t"),
  keyed("q"),
  keyed("w"),
  keyed("e"),
  keyed("r"),
  keyed("t"),
  keyed("y"),
  keyed("u"),
  keyed("i"),
  keyed("o"),
  keyed("p"),
  keyed("[", "{"),
  keyed("]", "}"),
  keyed("\\", "|"),
];

const row2 = [
  keyed("CAPS", "CAPS", "capslock", true),
  keyed("a"),
  keyed("s"),
  keyed("d"),
  keyed("f"),
  keyed("g"),
  keyed("h"),
  keyed("j"),
  keyed("k"),
  keyed("l"),
  keyed(";", ":"),
  keyed("'", '"'),
  keyed("ENTER", "\n", "\n"),
];

const row3 = [
  keyed("SHIFT", undefined, undefined, true),
  keyed("z"),
  keyed("x"),
  keyed("c"),
  keyed("v"),
  keyed("b"),
  keyed("n"),
  keyed("m"),
  keyed(",", "<"),
  keyed(".", ">"),
  keyed("/", "?"),
];

const row4 = [keyed("SPACE", " ", " ")];

export const keyRows = [row0, row1, row2, row3, row4];
