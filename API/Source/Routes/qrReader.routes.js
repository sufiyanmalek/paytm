// imports
import express from "express";
import Jimp from "jimp";
import qrCode from "qrcode-reader";

export const fileRouter = express.Router();
fileRouter.post("/qr", async (req, res) => {
  try {
    const data = req.files.qr;
    console.log(data);
    // Parse the image
    await Jimp.read(data.data, function (err, image) {
      if (err) {
        console.error(err);
      }
      let qrcode = new qrCode();
      qrcode.callback = function (err, value) {
        if (err) {
          res.status(400).send(err);
          return;
        }
        if (value) {
          res.status(200).json({
            phone: value.result,
          });
        } else {
          res.status(400).send("QR code not working");
        }
      };
      qrcode.decode(image.bitmap);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
