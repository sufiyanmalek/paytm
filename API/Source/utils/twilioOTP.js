import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config();

export const twilioOTP = (otp, phone) => {
  try {
    const accountSid = process.env.Account_SID;
    const authToken = process.env.Auth_Token;

    const client = twilio(accountSid, authToken);

    client.messages
      .create({
        body: `Your PAYTM verification code is: ${otp}`,
        to: `+91${phone}`, // Text your number
        from: process.env.Twilio_number, // From a valid Twilio number
      })
      .then((message) => console.log("otp sent"));
  } catch (e) {
    console.log(e);
  }
};
