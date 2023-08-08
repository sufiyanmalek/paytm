export const playNotificationSound = () => {
  const audio = new Audio(
    "https://paytm-audios.s3.ap-south-1.amazonaws.com/Apple+Notification+Tone.mp3"
  );
  audio.addEventListener("canplaythrough", () => {
    console.log("here");
    audio.play().catch((e) => {
      window.addEventListener(
        "click",
        () => {
          audio.play();
        },
        { once: true }
      );
    });
  });
};
