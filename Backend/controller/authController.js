import bcrypt from "bcrypt";
import { queryPromise } from "../helper/queryPromise.js";

export const registerNewUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username) return res.status(404).send("Username is Required!");
  if (!email) return res.status(404).send("Email is Required!");
  if (!password) return res.status(404).send("Password is Required!");

  const existUserQry = `SELECT * FROM users WHERE username= ?`;
  const existingUsername = await queryPromise(existUserQry, [username]);
  if (existingUsername.length) {
    return res.status(404).send("Username is used, Try Login!");
  }

  const existEmailQry = `SELECT * FROM users WHERE email= ?`;
  const existingEmail = await queryPromise(existEmailQry, [email]);
  if (existingEmail.length) {
    return res.status(404).send("Email is used, Try another!");
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUserQry = `INSERT INTO users (username,email,password) VALUES (?,?,?)`;
  const newUserCreated = await queryPromise(newUserQry, [
    username,
    email,
    hashedPassword,
  ]);

  if (newUserCreated.affectedRows) {
    return res
      .status(200)
      .send({ message: "Successfully Registered new user!" });
  } else {
    return res.status(500).send("Internal Server Error!");
  }
};

export const loginController = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(404).send("Invalid Email or Password!");
  }

  // Check if user registered
  const isUserQry = "SELECT * FROM users WHERE username= ?";
  const user = await queryPromise(isUserQry, [username]);
  if (!user.length) {
    return res.status(404).send("User not registered!");
  }

  //   return res.status(200).send(registeredUser);
  // Check Password with hashed Password
  const matchPass = await bcrypt.compare(password, user[0].password);
  if (!matchPass) {
    return res.status(404).send("Wrong Password!");
  }

  return res.status(200).send(user[0]);
};

export const resetPasswordController = async (req, res) => {
  const { email, newPassword } = req.body;
  if (!email) return res.status(404).send("Email required!");
  if (!newPassword) return res.status(404).send("Password required!");

  const srchUser = `SELECT * FROM users WHERE email= ?`;
  try {
    const user = await queryPromise(srchUser, [email]);
    if (!user.length) {
      return res.status(404).send("No User Found!");
    }
    const newPassQry = `UPDATE users SET password = ? WHERE email = ?`;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    const { changedRows } = await queryPromise(newPassQry, [
      hashedPassword,
      email,
    ]);
    return res.status(200).send(`Password Reset Successfull: ${changedRows}`);
  } catch (error) {
    return res.status(501).send("Internal server error!");
  }
};
