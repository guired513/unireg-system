exports.requireLogin = (req, res, next) => {
    if (!req.session.user) {
      req.flash("error", "Please login first.");
      return res.redirect("/login");
    }
    next();
  };
  
  exports.checkRole = (role) => {
    return (req, res, next) => {
      if (!req.session.user || req.session.user.role !== role) {
        return res.status(403).send("Access denied");
      }
      next();
    };
  };
  