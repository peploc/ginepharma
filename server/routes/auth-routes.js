const express = require("express");
const authRoutes = express.Router();

const passport = require("passport");
const bcrypt = require("bcrypt");
const puppeteer = require("puppeteer");
const fs = require("fs").promises;

const User = require("../models/User");

let scrape = async val => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();

  await page.goto(
    `https://www.icomem.es/ventanilla-unica/buscador-colegiados/${val}`
  );
  await page.waitFor(500);

  const result = await page.evaluate(() => {
    let data;
    if (document.querySelector(".datos-perfil>ul") !== null) {
      data = document
        .querySelector(".datos-perfil>ul")
        .innerText.split("\n")
        .map(el => el.substr(el.indexOf(":") + 2));
    } else {
      data = false;
    }

    if (data) return data;
    else return false;
  });

  browser.close();
  return result;
};

authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username.trim();
  const password = req.body.password.trim();

  if (!username || !password) {
    res
      .status(400)
      .json({ message: "Provide your Name and your Medical License Number" });
    return;
  }
  if (password.length !== 9) {
    res.status(400).json({
      message: "Insert a valid Medical License Number"
    });
    return;
  }

  User.findOne({ username }, (err, foundUser) => {
    if (err) {
      res.status(500).json({ message: "Something goes wrong" });
      return;
    }
    if (foundUser) {
      res.status(400).json({ message: "You already have an account" });
      return;
    }

  let scrapedNumber = 0;
  let scrapedUserName = "";

  (async () => {
    let data = await scrape(password);

    if (data) {
      scrapedUserName = data[0]
        .toLowerCase()
        .trim()
        .replace(/ /g, "")
        .concat(data[1].toLowerCase().trim().replace(/ /g, ""));
      scrapedPassword = data[2];

      if (scrapedUserName === username) {
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);
        const aNewUser = new User({
          username,
          password: hashPass
        });

        aNewUser.save(err => {
          if (err) {
            res
              .status(400)
              .json({ message: "Saving user to database went wrong." });
            return;
          }
          // Automatically log in user after sign up  .login() here is actually predefined passport method
          req.login(aNewUser, err => {
            if (err) {
              res.status(500).json({ message: "Login after signup went bad." });
              return;
            }
            // Send the user's information to the frontend. We can use also: res.status(200).json(req.user);
            res.status(200).json(aNewUser);
          });
        });
      } else {
        res.status(500).json({ message: "Incorrect Data" });
        return;
      }
    } else {
      res.status(500).json({ message: "Medical License Number not found" });
      return;
    }
  })();
  })
});

/* authRoutes.post("/verification", (req, res, next) => {
  const number = req.body.number;
  const firstname = req.body.firstname.toLowerCase().trim();
  const lastname = req.body.lastname.toLowerCase().trim();
  if (!number || !firstname || !lastname) {
    res.status(500).json({ message: "Incorrect Data" });
    return;
  }
  let scrapedNumber = 0;
  let scrapedFirstName = "";
  let scrapedLastName = "";

  (async () => {
    let data = await scrape(number);

    if (data) {
      scrapedFirstName = data[0].toLowerCase().trim();
      scrapedLastName = data[1].toLowerCase().trim();
      scrapedNumber = data[2];

      if (scrapedFirstName === firstname && scrapedLastName === lastname) {
        res
          .status(200)
          .json({
            firstname: firstname,
            lastname: lastname,
            number: number,
            verified: true
          });
      } else {
        res.status(500).json({ message: "Incorrect Data" });
        return;
      }
    } else {
      res.status(500).json({ message: "Número de Colegiado not found" });
      return;
    }
  })();
}); */

authRoutes.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Something went wrong authenticating user" });
      return;
    }
    // "failureDetails" contains the error messages from our logic in "LocalStrategy" { message: '...' }.
    if (!theUser) {
      res.status(401).json(failureDetails);
      return;
    }
    // save user in session
    req.login(theUser, err => {
      if (err) {
        res.status(500).json({ message: "Session save went bad." });
        return;
      }
      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

authRoutes.post("/logout", (req, res, next) => {
  // req.logout() is defined by passport
  req.logout();
  res.status(200).json({ message: "Log out success!" });
});

authRoutes.get("/loggedin", (req, res, next) => {
  // req.isAuthenticated() is defined by passport
  console.log(req.user);
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: "Unauthorized" });
});

module.exports = authRoutes;
