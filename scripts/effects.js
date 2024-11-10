import { wait, displayLoadingText, $ } from "./util.js";

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