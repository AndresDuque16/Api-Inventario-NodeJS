const mongoose = require("mongoose");

const getConnection = async () => {
  try {
    const url =
      "mongodb://user_db:ALNZVFcLWifH3b5n@cluster0-shard-00-00.poz3a.mongodb.net:27017,cluster0-shard-00-01.poz3a.mongodb.net:27017,cluster0-shard-00-02.poz3a.mongodb.net:27017/inventarios-backend?ssl=true&replicaSet=atlas-sz6mkj-shard-0&authSource=admin&retryWrites=true&w=majority";
    await mongoose.connect(url);

    console.log("Conexion exitosa");
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getConnection,
};
