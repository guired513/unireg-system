// At the top if not already present
const User = require('../models/User');

// ADD THIS inside adminController.js
exports.getDashboard = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalStudents = await User.countDocuments({ role: "student" });
  const totalFaculty = await User.countDocuments({ role: "faculty" });
  const totalRegistrars = await User.countDocuments({ role: "registrar" });

  const last6Months = [...Array(6)].map((_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (5 - i));
    return d;
  });

  const monthLabels = last6Months.map(d => d.toLocaleString('default', { month: 'short' }));
  const monthCounts = await Promise.all(
    last6Months.map(async d => {
      const start = new Date(d.getFullYear(), d.getMonth(), 1);
      const end = new Date(d.getFullYear(), d.getMonth() + 1, 0);
      return await User.countDocuments({ createdAt: { $gte: start, $lte: end } });
    })
  );

  res.render("admin/dashboard", {
    user: req.user,
    stats: {
      totalUsers,
      totalStudents,
      totalFaculty,
      totalRegistrars,
      monthLabels,
      monthCounts
    }
  });
};
