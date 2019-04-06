var roleUpgrader = require('role.upgrader');

module.exports = {
	run: function (creep, home) {
		var targetRoom = 'E47S7';
		if(creep.memory.sId == 1) targetRoom = 'E47S7';
		if(creep.memory.sId == 3) targetRoom = 'E47S7';

		var homeRoom = home;

		if(creep.memory.working == true && creep.carry.energy == 0) {
		       creep.memory.working = false;
		}
		else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
			creep.memory.working = true;
		}	
		var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		if (target != undefined) {
			console.log("kill");
			console.log(creep.attack(target));
		} else {
		}

		if(creep.memory.working == true ) {
			console.log("long working");
		    if(creep.room.name == homeRoom) {
			var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
				filter: (s) => s.energy < s.energyCapacity && s.structureType != STRUCTURE_TOWER
			});
			var test;
			if (structure != undefined) {
				console.log("HERE");
				if(test = creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					console.log("danger");
					creep.moveTo(structure);
				}
				else { console.log("FILLING UP LONG"); }
			} else {
				roleUpgrader.run(creep);
			}
		    } else  {
			var pos = new RoomPosition(5, 8, homeRoom); 
			if(creep.memory.sId == 1 || creep.memory.sId == 3) {
				console.log(creep.moveTo(pos));
			} else {
			    var exit = creep.room.findExitTo(homeRoom);
			    creep.moveTo(creep.pos.findClosestByRange(exit));
			}
		    }

		}
		else {
			console.log("WHAT");
			if(creep.room.name == targetRoom ) {
				//if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
				//	creep.moveTo(creep.room.controller);
				//}
				var source = creep.pos.findClosestByPath(FIND_SOURCES);
				if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
					creep.moveTo(source);
				} else {
					console.log("HARVEST");
					console.log(creep.harvest(source));
				}
			} else {
				       var pos = new RoomPosition(13, 35, targetRoom); 
				    var exit; 
				    if(creep.memory.sId == 1 || creep.memory.sId == 3) { console.log("WHATS WRONG"); console.log(creep.moveTo(pos)); } 
				    else {
					    if(creep.memory.sId == 2) exit = creep.room.findExitTo(targetRoom);
					    creep.moveTo(creep.pos.findClosestByRange(exit));
				    }
			}



			/*var dropenergy = creep.room.find(FIND_DROPPED_ENERGY, {
				filter: (d) => d.amount >= 50
			});
			if (dropenergy.length) {
				var pickupDropped = creep.pickup(dropenergy[0]);
				console.log(pickupDropped);
			} else 
			if (dropenergy.length > 0 && (pickupDropped == ERR_NOT_IN_RANGE) ) {
				creep.moveTo(dropenergy[0]);
			}*/
		}
	}

}
