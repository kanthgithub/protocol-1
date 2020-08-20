const Finder = artifacts.require("Finder");
const Registry = artifacts.require("Registry");
const { getKeysForNetwork, deploy } = require("@umaprotocol/common");
const { interfaceName } = require("@umaprotocol/common");

module.exports = async function(deployer, network, accounts) {
  const keys = getKeysForNetwork(network, accounts);

  const { contract: registry } = await deploy(deployer, network, Registry, { from: keys.deployer });

  const finder = await Finder.deployed();
  await finder.changeImplementationAddress(web3.utils.utf8ToHex(interfaceName.Registry), registry.address, {
    from: keys.deployer
  });
};