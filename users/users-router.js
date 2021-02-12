const router = require("express").Router();
const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware.js");

router.get("/:userId", restricted, (req, res) => {
  Users.findById(req.params.userId)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => res.send(err));
});

router.put("/:userId", restricted, (req, res) => {
  Users.updateUser(req.body, req.params.userId)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "couldnt update user",
      });
    });
});

// put user info
// router.put("/:userID", restricted, async (req, res) => {
//   const userID = req.params.userID;
//   try {
//     const user = await Users.updateUser(req.body, userID);
//     if (user) {
//       res.status(200).json(user);
//     } else {
//       res
//         .status(404)
//         .json({ error: "server could not find any user with that id" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "server could not update the user" });
//   }
// });

module.exports = router;
