import {
  PollyClient,
  StartSpeechSynthesisTaskCommand,
} from "@aws-sdk/client-polly";
import dotenv from "dotenv";

dotenv.config();

export const pollyService = async (amount) => {
  const pollyClient = new PollyClient({
    region: process.env.region,
    credentials: {
      accessKeyId: process.env.aws_access_key_id,
      secretAccessKey: process.env.aws_secret_access_key,
    },
  });

  // Create the parameters
  var params = {
    OutputFormat: "mp3",
    OutputS3BucketName: "paytm-audios",
    Text: `Rupees ......${amount}... recieved on paytm`,
    TextType: "text",
    VoiceId: "Matthew",
    SampleRate: "22050",
  };
  try {
    const res = await pollyClient.send(
      new StartSpeechSynthesisTaskCommand(params)
    );
    return res.SynthesisTask.OutputUri;
  } catch (err) {
    console.log("Error putting object", err);
  }
};
