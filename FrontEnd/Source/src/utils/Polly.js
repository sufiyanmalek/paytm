import { Polly } from "aws-sdk";
const AWS_REGION = import.meta.env.VITE_REGION; // Replace with your AWS region
const AWS_ACCESS_KEY = import.meta.env.VITE_AWS_ACCESS_KEY; // Replace with your AWS access key
const AWS_SECRET_KEY = import.meta.env.VITE_AWS_SECRET_KEY; // Replace with your AWS secret key

const PollyClient = new Polly({
  region: AWS_REGION,
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
});

async function TextToSpeech(amount) {
  try {
    const response = await PollyClient.synthesizeSpeech({
      Text: `Rupees ......${amount}... recieved on paytm `,
      OutputFormat: "mp3",
      VoiceId: "Matthew", // Replace with the desired voice (e.g., Joanna, Matthew, etc.)
    }).promise();

    // Create a blob from the response and create a temporary URL to play the audio
    const audioBlob = new Blob([response.AudioStream], {
      type: "audio/mpeg",
    });
    const url = URL.createObjectURL(audioBlob);
    const audio = new Audio(url);

    // Play Audio on DOM Error catch
    audio.addEventListener("canplaythrough", () => {
      // console.log("here");
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
  } catch (error) {
    console.error("Error while synthesizing speech:", error);
  }
}

export default TextToSpeech;
