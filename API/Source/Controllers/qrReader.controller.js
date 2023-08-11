import Jimp from "jimp";
import qrCode from "qrcode-reader";
import { User } from "../Models/user.model.js";

export const qrController = async (req, res) => {
  const AcceptedFileType = ["image/png", "image/webp", "image/jpeg"];
  try {
    const data = req.files.qr;
    console.log(data);
    if (AcceptedFileType.includes(data.mimetype)) {
      // Parse the image
      await Jimp.read(data.data, function (err, image) {
        if (err) {
          console.error(err);
        }
        let qrcode = new qrCode();
        qrcode.callback = async function (err, value) {
          if (err) {
            res.status(400).send(err);
            return;
          }
          if (value) {
            if (value.result.length === 22) {
              const data = JSON.parse(value.result);
              if (data.phone) {
                const user = await User.findOne({ phone: data.phone });
                if (user) {
                  res.status(200).json({
                    phone: user.phone,
                  });
                } else {
                  res
                    .status(404)
                    .send("Qr code isn't associated with any user");
                }
              } else {
                res.status(404).send("Invalid QR code");
              }
            } else {
              res.status(404).send("Invalid QR code");
            }
          } else {
            res.status(400).send("QR code not working");
          }
        };
        qrcode.decode(image.bitmap);
      });
    } else {
      res.status(400).send("Invalid File Type");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
