module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(artifacts.require("RentalEverything"));
};
