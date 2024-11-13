import { wait, displayLoadingText } from "./util.js";


export async function textEffect({
  clearAfterMilliseconds = 0,
  isLoadingText = false,
  text,
}) {
  if (typeof text === "undefined")
    throw new Error("Error: You did not pass any text to textEffect");

  const callId = ++textEffect.callCount;

  if (isLoadingText) {
    await displayLoadingText(text);
  } else {
    $("text").html(text);
  }

  await wait(clearAfterMilliseconds);

  if (callId === textEffect.callCount) {
    $("text").empty();
  }
}
textEffect.callCount = 0;

export async function whiteScreenEffect(text) {
    console.log("screen adding")
    $(document.body).addClass("white-screen");
    $("p#Explain").text(text);
};

export async function hurtScreenEffect() {
    $(document.body).addClass("hurt-screen");
    await wait(1200);
    $(document.body).removeClass("hurt-screen");
}