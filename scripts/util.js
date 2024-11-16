export async function wait(milliseconds) {
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export async function delayUpdate($element, message, delay) {
  await wait(delay);
  $element.text(message);
}

export async function displayLoadingText(text) {
  for (let i = 0; i < 5; i++) {
    await delayUpdate($("text"), text + ".".repeat(i), 100);
  }
}

export function getLastIndex(array) {
  return array.length - 1;
}

export function isWithinTwo(num1, num2) {
  return Math.abs(num1 - num2) <= 2;
}

export function hideScreens() {
  $(document.body).addClass("skip-preloader").removeClass("white-screen");
}