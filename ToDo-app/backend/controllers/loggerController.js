// Simple controller for logging purposes
const loggerController = (req, res) => {
  console.log("CONTROLLER LOGGED");
  res.send("Server response from loggerController");
};

module.exports = {
  loggerController,
};
