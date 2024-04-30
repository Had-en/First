import mainSchema from "./models/mainmodel.js";

export async function start(req, res) {
  try {
    const elemens = await mainSchema.findById("662e4d9bb5a214967f79ad3a");

    if (elemens.response === "undefined")
      return res.status(200).json({ message: true });
    else return res.status(200).json({ message: false });
  } catch (err) {
    return res.status(400).json({ Message: "couldnt store data" });
  }
}

export async function validate(req, res, next) {
  const name = req.body.name;
  const fname = req.body.fname;
  const email = req.body.email;

  if (!name || !fname || !email) {
    return res.status(400).json({ message: "Fill all fields" });
  }
  next();
}

function formatter(ele) {
  return ele.toLowerCase().trim().replace(/\s/g, "");
}

export async function check(req, res) {
  const name = formatter(req.body.name);
  const fname = formatter(req.body.fname);
  const email = formatter(req.body.email);
  let message = {};
  if (name != "maseerataskeen") {
    message.name = "Enter Full Valid name";
  }
  if (fname != "ashfaqahmed") {
    message.fname = "Enter Full Valid Dad's name";
  }
  if (email != "taskeenmaseera7@gmail.com") {
    message.email = "Enter Valid personal email";
  }

  if (message.name || message.fname || message.email)
    return res.status(422).json({ message: message });

  try {
    const elemens = await mainSchema.findById("662e4c34b5a214967f79ad39");

    elemens.loginTimes += 1;
    const result = await mainSchema.findByIdAndUpdate(
      "662e4c34b5a214967f79ad39",
      { loginTimes: elemens.loginTimes }
    );
  } catch (err) {
    res.status(404).json({ status: "failed", message: err });
  }

  res.status(200).json({ message: "success", access: "granted" });
}

export async function response(req, res) {
  try {
    const newEle = await mainSchema.findByIdAndUpdate(
      "662e4d9bb5a214967f79ad3a",
      {
        response: req.body.response,
      }
    );
    res.status(201).json({ status: "success", data: { newEle } });
  } catch (err) {
    return res.status(400).json({ Message: "couldnt store data" });
  }
}
