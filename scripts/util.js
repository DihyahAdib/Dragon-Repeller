export async function wait(milliseconds) {
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
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

export function getLastIndex(array) {
  return array.length - 1;
}

export function isWithinTwo(num1, num2) {
  return Math.abs(num1 - num2) <= 2;
}

export function hideScreens() {
  document.body.classList.add("skip-preloader");
  document.body.classList.remove("white-screen");
}