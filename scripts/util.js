export async function wait(milliseconds) {
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export async function textEffect({
  waitBefore = 0,
  clearAfterMilliseconds = 0,
  isLoadingText = false,
  text,
}) {
  if (typeof text === "undefined")
    throw new Error("Error: You did not pass any text to textEffect");

  await wait(waitBefore);

  if (isLoadingText) {
    await displayLoadingText(text);
  } else {
    $("text").innerText = text;
  }

  await wait(clearAfterMilliseconds);

  $("text").innerText = "";
}

export async function delayUpdate(element, message, delay) {
  await wait(delay);
  element.innerText = message;
}

export async function displayLoadingText(text) {
  for (let i = 0; i < 5; i++) {
    await delayUpdate($("text"), text + ".".repeat(i), 100);
  }
}

export const $ = (selector) => {
  return document.querySelector(selector);
};

export const $$ = (selector) => {
  return document.querySelectorAll(selector);
};

export function replaceAtIndex(array, index, newValue) {
  if (index < 0 || index >= array.length) {
    throw new Error("Invalid index");
  }
  array[index] = newValue;
  return array;
}

export function getLastIndex(array) {
  return array.length - 1;
}

export function isWithinTwo(num1, num2) {
  return Math.abs(num1 - num2) <= 2;
}
