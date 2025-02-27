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

const row1 = [
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
];

const row2 = [
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

const row4 = [keyed("SPACEBAR", " ", " ")];

export const keyRows = [row1, row2, row3, row4];
