const dashboard = async (req, res) => {
  res.send("dashboard");
  //   if (req.user.isAdmin) {
  //     res.send("success");
  //   } else {
  //     res.send("NOT AUTHORIZED");
  //     res.redirect("/");
  //   }
};

exports.dashboard = dashboard;
