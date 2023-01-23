const { adminData } = require("../data/adminData");
const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");

async function loadAdminData() {
  const isAdmin = await User.findOne({ email: adminData.email });

  if (!isAdmin) {
    const password = await bcrypt.hash(adminData.password, 16);

    const dataWithHashedPassword = {
      ...adminData,
      password,
    };

    const admin = await User.create(dataWithHashedPassword);

    console.log(admin);
  }
}

async function del() {
  await User.deleteOne({ email: "admin@gmail.com" });
}

module.exports = { loadAdminData, del };
