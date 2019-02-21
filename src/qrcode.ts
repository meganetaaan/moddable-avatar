import qrCode from "qrcode";

const code = qrCode({
  input: "hello world!",
  maxVersion: 4
});
