import { wait, displayLoadingText, $ } from "./util.js";


let callCount = 0;
export async function textEffect({
  clearAfterMilliseconds = 0,
  isLoadingText = false,
  text,
}) {
  if (typeof text === "undefined")
    throw new Error("Error: You did not pass any text to textEffect");

  const callId = ++callCount;

  if (isLoadingText) {
    await displayLoadingText(text);
  } else {
    $("text").innerText = text;
  }

  await wait(clearAfterMilliseconds);

  if (callId === callCount) {
    $("text").innerText = "";
  }
}

export async function whiteScreenEffect(text) {
    console.log("screen adding")
    document.body.classList.add("white-screen");
    $("p#Explain").innerText = text;
};

export async function hurtScreenEffect() {
    document.body.classList.add("hurt-screen");
    await wait(1200);
    document.body.classList.remove("hurt-screen");
}