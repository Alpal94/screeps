require('prototype.spawn')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleDefender = require('role.defender');
var roleWallRepairer = require('role.wallRepairer');
var roleMiner = require('role.miner');
var roleLongDistanceHarvester = require('role.longDistanceHarvester');
var roleLongUpgrader = require('role.longUpgrader');
var roleClaimer = require('role.claimer');
var roleAttacker = require('role.attacker');
var roleMineralHarvester = require('role.mineralTransport');

module.exports.loop = function () {
	mainFunction(Game.spawns.Terminator, Game.spawns.TerminatorT850, 'E48S7', false);
	if(Game.spawns.TheTerminator) supportBaseEnergy(Game.spawns.TheTerminator, 'E48S6', true);
};

function mainFunction(TheTerminator, TheTerminator2,  home, newBase) {
	const linkFrom = Game.rooms[home].lookForAt('structure', 38, 3)[0];

	const linkTo = Game.rooms[home].lookForAt('structure', 11, 28)[0];
	linkFrom.transferEnergy(linkTo);


	for(let name in Memory.creeps) {
		if (Game.creeps[name] == undefined) {
			delete Memory.creeps[name];
		}
	}
	var minimumNumberOfHarvesters = 5;
	var minimumNumberOfUpgraders = 4;
	var minimumNumberOfBuilders = 5;
	var minimumNumberOfRepairers = 2;
	var minimumNumberOfWallRepairers = 2;
	var minimumNumberOfMiners = 2;
	var minimumNumberOfLongDistanceHarvesters = 2;

	var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester' && c.memory.home == home && c.memory.sId == '0');
	var numberOfTowerHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester' && c.memory.home == home && c.memory.sId == '1');
	var numberOfMineralHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'mineral_harvester' && c.memory.home == home);
	var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader' && c.memory.home == home);
	var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder' && c.memory.home == home && c.memory.sId == '0');
	var numberOfRemoteBuilders1 = _.sum(Game.creeps, (c) => c.memory.role == 'builder' && c.memory.sId == '1');
	var numberOfRemoteBuilders2 = _.sum(Game.creeps, (c) => c.memory.role == 'builder' && c.memory.sId == '2');
	var numberOfRemoteBuilders3 = _.sum(Game.creeps, (c) => c.memory.role == 'builder' && c.memory.sId == '3');
	var numberOfRemoteRepairers2 = _.sum(Game.creeps, (c) => c.memory.role == 'repairer' && c.memory.sId == '2');
	var numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer' && c.memory.home == home && c.memory.sId == '0');
	var numberOfClaimers1 = _.sum(Game.creeps, (c) => c.memory.role == 'claimer');

	var numberOfAttackers = _.sum(Game.creeps, (c) => c.memory.role == 'attacker' && c.memory.home == home && c.memory.type == 'brute');
	var numberOfAttackers2 = _.sum(Game.creeps, (c) => c.memory.role == 'attacker' && c.memory.home == home && c.memory.type == 'brute2');
	var numberOfHealers = _.sum(Game.creeps, (c) => c.memory.role == 'attacker' && c.memory.home == home && c.memory.type == 'healer');
	var numberOfLongRange = _.sum(Game.creeps, (c) => c.memory.role == 'attacker' && c.memory.home == home && c.memory.type == 'long_range');


	var numberOfWallRepairers =  _.sum(Game.creeps, (c) => c.memory.role == 'wall_repairer');
	var numberOfMiners =  _.sum(Game.creeps, (c) => c.memory.role == 'miner' && c.memory.sId == '0');
	var numberOfMiners2 =  _.sum(Game.creeps, (c) => c.memory.role == 'miner2' && c.memory.sId == '0');
	var numberOfResourceMiners =  _.sum(Game.creeps, (c) => c.memory.role == 'miner_resources' && c.memory.sId == '0');
	var numberOfLongDistanceHarvesters3 =  _.sum(Game.creeps, (c) => c.memory.role == 'long_distance_harvester' && c.memory.sId == 3);
	var numberOfLongDistanceHarvesters4 =  _.sum(Game.creeps, (c) => c.memory.role == 'long_distance_harvester' && c.memory.sId == 4);
	var numberOfCloseLongDistance =  _.sum(Game.creeps, (c) => c.memory.sId == 2);
	var numberOfLongUpgraders =  _.sum(Game.creeps, (c) => c.memory.role == 'long_upgrader');
	var numberOfLongSecond = _.sum(Game.creeps, (c) => c.memory.sId == 1);
	/*console.log("Safe mode:");
	console.log(Game.rooms[home].controller.activateSafeMode());*/
	for(let name in Game.creeps) {
		var creep = Game.creeps[name];
		//roleBuilder.run(creep);
		if (creep.memory.role == 'harvester') {
			roleHarvester.run(creep);
		} if (creep.memory.role == 'mineral_harvester') {
			roleMineralHarvester.run(creep);
		}else if (creep.memory.role == 'upgrader') {
			roleUpgrader.run(creep);
		} else if (creep.memory.role == 'builder') {
			roleBuilder.run(creep);
		} else if (creep.memory.role == 'repairer') {
			roleRepairer.run(creep);
		} else if (creep.memory.role == 'defender') {
			roleDefender.run(creep);
		} else if (creep.memory.role == 'wall_repairer') {
			roleWallRepairer.run(creep);
		} else if (creep.memory.role == 'miner') {
			roleMiner.run(creep, 17, 26, home);
		} else if (creep.memory.role == 'miner2') {
			roleMiner.run(creep, 24, 32, home);
		} else if (creep.memory.role == 'miner_resources') {
			roleMiner.run(creep, 36, 38, home);
		} else if (creep.memory.role == 'long_distance_harvester') {
			roleLongDistanceHarvester.run(creep, home);
		} else if (creep.memory.role == 'long_upgrader') {
			roleLongUpgrader.run(creep);
		} else if (creep.memory.role == 'claimer') {
			roleClaimer.run(creep);
		} else if (creep.memory.role == 'attacker') {
			roleAttacker.run(creep);
		}
	}

	var towers = Game.rooms[home].find(FIND_STRUCTURES, {
		filter: (s) => s.structureType == STRUCTURE_TOWER
	});
	if(towers !== undefined) {
		let towerNumber = 0;
		for (let tower of towers) {
			towerNumber++;
			var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
			if (target != undefined) {
				tower.attack(target);
			} else {
				var walls;
				if(towerNumber === 1) {
					walls = tower.room.find(FIND_STRUCTURES, {
						filter: (s) => s.structureType == STRUCTURE_RAMPART
					});
				} else {
					walls = tower.room.find(FIND_STRUCTURES, {
						filter: (s) => s.structureType == STRUCTURE_RAMPART || s.structureType == STRUCTURE_WALL
					});
				}
				var ramparts = tower.room.find(FIND_STRUCTURES, {
					filter: (s) => s.structureType == STRUCTURE_RAMPART
				});

				var target = undefined;

				for (let percentage = 0.0001; percentage <= 1; percentage = percentage + 0.00001) {
					target = tower.pos.findClosestByPath(walls, {
						filter: (w) => w.hits / w.hitsMax < percentage
					});

					if (target != undefined) {
						break;
					}
				}
				var targetRampart = tower.pos.findClosestByPath(ramparts, {
					filter: (w) => w.hits < 2000
				});
				if(targetRampart != undefined && tower.energy > 400) {
					tower.repair(targetRampart);
				} if(target != undefined && tower.energy > 800) {
					var date = new Date(); 
					var timestamp = date.getTime();
					if(timestamp % 1000 * 120 > 1000 * 110) {
						tower.repair(target);
					} else {
					}
					
				}
			
			}
		}
	}
	var name = undefined;

	var energy = TheTerminator.room.energyCapacityAvailable > 800 ? 800 : TheTerminator.room.energyCapacityAvailable; 
	/*console.log("Energy");
	console.log(TheTerminator.room.energyCapacityAvailable);*/
	var energyLong = TheTerminator.room.energyCapacityAvailable; 
	if (!newBase) {
		if(numberOfHarvesters < 1) name = TheTerminator.createCustomCreep(energy,  'harvester', 0, home);
		else if(numberOfMiners < 2) name = TheTerminator.createCustomCreep(energy,  'miner', 0, home);
		else if(numberOfMiners2 < 2) name = TheTerminator.createCustomCreep(energy,  'miner2', 0, home);
		else if(numberOfResourceMiners < 1) name = TheTerminator.createCustomCreep(energy,  'miner_resources', 0, home);
		else if(numberOfMineralHarvesters < 1) name = TheTerminator.createCustomCreep(energy,  'mineral_harvester', 0, home);
	}
	console.log("NO REPAIRERS: " + numberOfRepairers);

	if(numberOfHarvesters < 2) name = TheTerminator.createCustomCreep(energy,  'harvester', 0, home);
	if(numberOfTowerHarvesters < 1) name = TheTerminator.createCustomCreep(energy,  'harvester', 1, home);
	else if(numberOfBuilders < 2) name = TheTerminator.createCustomCreep(energy,  'builder', 0, home);

	else if(numberOfUpgraders < 3) name = TheTerminator.createCustomCreep(2000,  'upgrader', 0, home);
	else if(numberOfRepairers < 2) name = TheTerminator.createCustomCreep(energy,  'repairer', 0, home);
	else if(numberOfLongDistanceHarvesters3 < 3) name = TheTerminator.createCustomCreep(energy,  'long_distance_harvester', 3, home);
	else if(numberOfLongDistanceHarvesters4 < 2) name = TheTerminator.createCustomCreep(energy,  'long_distance_harvester', 4, home);
	else if(numberOfRemoteRepairers2 < 1) name = TheTerminator.createCustomCreep(energy,  'repairer', 2, home);
	//else if(numberOfClaimers1  < 1) name = TheTerminator.createCustomCreep(energy,  'claimer', 0, home);
	else if(numberOfRemoteBuilders1 < 1) name = TheTerminator.createCustomCreep(energy,  'builder', 1, home);
	else if(numberOfRemoteBuilders2 < 1) name = TheTerminator.createCustomCreep(energy,  'builder', 2, home);
	else if(numberOfRemoteBuilders3 < 1) name = TheTerminator.createCustomCreep(energy,  'builder', 3, home);

	//else if(numberOfAttackers  < 1) { name = TheTerminator.createAttackerCreep(energyLong,  'attacker', 0, 'brute', home); }
	//else if(numberOfAttackers2  < 1) { name = TheTerminator.createAttackerCreep(energyLong,  'attacker', 0, 'brute2', home); }

	//else if(numberOfHealers  < 4) { name = TheTerminator.createAttackerCreep(energyLong,  'attacker', 0, 'healer', home); }
	//else if(numberOfLongRange  < 1) { name = TheTerminator.createAttackerCreep(energyLong,  'attacker', 0, 'long_range', home); }

	/*else if(numberOfWallRepairers < 0) name = TheTerminator.createCustomCreep(energy,  'wall_repairer', 0);
	else if(numberOfUpgraders < 3) name = TheTerminator.createCustomCreep(energy,  'upgrader', 0);
	else if(numberOfRepairers < 2) name = TheTerminator.createCustomCreep(energy,  'repairer', 0);
	else if(numberOfLongUpgraders < 1) name = TheTerminator.createCustomCreep(energy,  'long_upgrader', 0);
	else if(numberOfCloseLongDistance < 2) name = TheTerminator.createCustomCreep(energyLong,  'long_distance_harvester', 2);
	else if(numberOfLongSecond < 3) name = TheTerminator.createCustomCreep(energyLong,  'long_distance_harvester', 1);
	*/

	if(!(name < 0) && name != 'undefined') {
		console.log("Spawned new creep: " + name);
	}

	
	//marketOrder(TheTerminator);
}

function supportBaseEnergy(TheTerminator, home, newBase) {
	for(let name in Memory.creeps) {
		if (Game.creeps[name] == undefined) {
			delete Memory.creeps[name];
		}
	}
	var minimumNumberOfHarvesters = 5;
	var minimumNumberOfUpgraders = 4;
	var minimumNumberOfBuilders = 5;
	var minimumNumberOfRepairers = 2;
	var minimumNumberOfWallRepairers = 2;
	var minimumNumberOfMiners = 2;
	var minimumNumberOfLongDistanceHarvesters = 2;

	var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester' && c.memory.home == home);
	var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader' && c.memory.home == home);
	var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder' && c.memory.home == home);
	var numberOfRemoteBuilders1 = _.sum(Game.creeps, (c) => c.memory.role == 'builder' && c.memory.sId == '1' && c.memory.home == home);
	var numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer' && c.memory.home == home);
	var numberOfClaimers1 = _.sum(Game.creeps, (c) => c.memory.role == 'claimer' && c.memory.home == home);
	var numberOfWallRepairers =  _.sum(Game.creeps, (c) => c.memory.role == 'wall_repairer' && c.memory.home == home);
	var numberOfMiners =  _.sum(Game.creeps, (c) => c.memory.role == 'miner' && c.memory.sId == '1' && c.memory.home == home);
	var numberOfMiners2 =  _.sum(Game.creeps, (c) => c.memory.role == 'miner2' && c.memory.sId == '1' && c.memory.home == home);
	var numberOfLongDistanceHarvesters =  _.sum(Game.creeps, (c) => c.memory.role == 'long_distance_harvester' && c.memory.home == home);
	var numberOfCloseLongDistance =  _.sum(Game.creeps, (c) => c.memory.sId == 2 && c.memory.home == home);
	var numberOfLongUpgraders =  _.sum(Game.creeps, (c) => c.memory.role == 'long_upgrader' && c.memory.home == home);
	var numberOfLongSecond = _.sum(Game.creeps, (c) => c.memory.sId == 1 && c.memory.home == home);
	/*console.log("Safe mode:");
	console.log(Game.rooms[home].controller.activateSafeMode());*/
	/*for(let name in Game.creeps) {
		var creep = Game.creeps[name];
		//roleBuilder.run(creep);
		if (creep.memory.role == 'harvester') {
			roleHarvester.run(creep);
		} else if (creep.memory.role == 'upgrader') {
			roleUpgrader.run(creep);
		} else if (creep.memory.role == 'builder') {
			roleBuilder.run(creep);
		} else if (creep.memory.role == 'repairer') {
			roleRepairer.run(creep);
		} else if (creep.memory.role == 'defender') {
			roleDefender.run(creep);
		} else if (creep.memory.role == 'wall_repairer') {
			roleWallRepairer.run(creep);
		} else if (creep.memory.role == 'miner') {
			roleMiner.run(creep, 5, 16, home);
		} else if (creep.memory.role == 'miner2') {
			roleMiner.run(creep, 28, 25, home);
		} else if (creep.memory.role == 'long_distance_harvester') {
			roleLongDistanceHarvester.run(creep, home);
		} else if (creep.memory.role == 'long_upgrader') {
			roleLongUpgrader.run(creep);
		} else if (creep.memory.role == 'claimer') {
			roleClaimer.run(creep);
		}
	}*/

	var towers = Game.rooms[home].find(FIND_STRUCTURES, {
		filter: (s) => s.structureType == STRUCTURE_TOWER
	});
	if(towers !== undefined) {
		for (let tower of towers) {
			var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
			if (target != undefined) {
				tower.attack(target);
			}
		}
	}
	var name = undefined;
	var energy = TheTerminator.room.energyCapacityAvailable > 800 ? 800 : TheTerminator.room.energyCapacityAvailable; 
	console.log(home);
	console.log(numberOfUpgraders + " Number of upgraders");
	if (!newBase) {
		if(numberOfMiners < 1) name = TheTerminator.createCustomCreep(energy,  'miner', 1, home);
		else if(numberOfMiners2 < 1) name = TheTerminator.createCustomCreep(energy,  'miner2', 1, home);
	}
	if(numberOfHarvesters < 1) { name = TheTerminator.createCustomCreep(energy,  'harvester', 0, home);}
	if(numberOfUpgraders < 4) { name = TheTerminator.createCustomCreep(energy,  'upgrader', 0, home);}
	if(numberOfRepairers < 1) { name = TheTerminator.createCustomCreep(energy,  'repairer', 0, home);}
	/*
	var energyLong = TheTerminator.room.energyCapacityAvailable; 
	if (!newBase) {
		if(numberOfMiners < 1) name = TheTerminator.createCustomCreep(energy,  'miner', 1);
		else if(numberOfMiners2 < 1) name = TheTerminator.createCustomCreep(energy,  'miner2', 1);
	}
	if(numberOfHarvesters < 2) name = TheTerminator.createCustomCreep(energy,  'harvester', 0);
	else if(numberOfBuilders < 2) name = TheTerminator.createCustomCreep(energy,  'builder', 0);
	else if(numberOfRepairers < 2) name = TheTerminator.createCustomCreep(energy,  'repairer', 0);
	else if(numberOfUpgraders < 2) name = TheTerminator.createCustomCreep(energy,  'upgrader', 0);
	else if(numberOfBuilders < 2) name = TheTerminator.createCustomCreep(energy,  'builder', 0);

	if(!(name < 0) && name != 'undefined') {
		console.log("Spawned new creep: " + name);
	}*/
}


function marketOrder(spawn) {
	console.log(spawn.room.terminal + " TERMINAL");
	if (spawn.room.terminal && (Game.time % 10 == 0)) {
		console.log("GAME TERMINAL");
	    if (spawn.room.terminal.store[RESOURCE_ENERGY] >= 2000 && spawn.room.terminal.store[RESOURCE_KEANIUM] >= 2000) {
		var orders = Game.market.getAllOrders(order => order.resourceType == RESOURCE_KEANIUM &&
						      order.type == ORDER_BUY &&
						      Game.market.calcTransactionCost(200, spawn.room.name, order.roomName) < 400);
		console.log('Keanium buy orders found: ' + orders.length);
		orders.sort(function(a,b){return b.price - a.price;});
		console.log('Best price: ' + orders[0].price);
		if (orders[0].price > 0.7) {
		    var result = Game.market.deal(orders[0].id, 200, spawn.room.name);
		    if (result == 0) {
			console.log('Order completed successfully');
		    }
		}
	    }
	}
}
