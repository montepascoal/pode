/* eslint-disable no-useless-escape */
export function noWhiteSpace(string) {
  return string.replace(/\s+/g,' ');
}

export function stringCapitalizer(string) {

  string = string.toLowerCase().replace(/(?:^|\s)\S/g, function (capitalize) { return capitalize.toUpperCase(); });

  let PreposM = ["Da", "Do", "Das", "Dos", "A", "E"];
  let prepos = ["da", "do", "das", "dos", "a", "e"];

  for (let i = PreposM.length - 1; i >= 0; i--) {
    string = string.replace(RegExp("\\b" + PreposM[i].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + "\\b", "g"), prepos[i]);
  }

  return noWhiteSpace(string);
}


export function stringLowercase(string) {
  return string.toLowerCase();
}


export function stringUppercase(string) {
  return string.toUpperCase();
}