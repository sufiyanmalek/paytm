import { Kyc } from "../Models/kycRequest.model.js";
import { User } from "../Models/user.model.js";
import { putObject } from "../utils/s3putObject.utils.js";

export const kycController = async (req, res) => {
  const user = req.user;
  setTimeout(async () => {
    try {
      const { aadharFront, aadharBack } = req.files;

      // console.log(aadharBack);
      const { email } = req.body;

      const aadharBackURL = await putObject(aadharBack.data);
      const aadharFrontURL = await putObject(aadharFront.data);

      const newKYC = new Kyc({
        userId: user._id,
        userEmail: email,
        aadharFront: aadharFrontURL,
        aadharBack: aadharBackURL,
      });

      await newKYC.save();

      if (newKYC) {
        const user = await User.findOneAndUpdate(
          { email },
          {
            $set: {
              isKycVerified: true,
            },
          },
          {
            new: true,
          }
        );
        if (user.isKycVerified) {
          res.status(200).send("Kyc Verification Done!");
        } else {
          res.status(401).send("Kyc verification Failed");
        }
      } else {
        res.status(401).send("Kyc verification Failed");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }, [2000]);
};
