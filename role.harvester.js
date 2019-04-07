var roleUpgrader = require('role.upgrader');
module.exports = {
	run: function (creep) {
		if(creep.memory.working == true && creep.carry.energy == 0) {
		       creep.memory.working = false;
		}
		else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
			creep.memory.working = true;
		}	

		if(creep.memory.working == true) {
		    //console.log("WORKING");
			var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
				filter: (s) => s.energy < s.energyCapacity
			});
			if (structure != undefined) {
				if(creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(structure);
				}
				else { /*console.log("FILLING UP");*/ }
			} else {
				var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
					filter: (s) => s.energy < s.energyCapacity && s.structureType === STRUCTURE_CONTAINER
				});
				if (structure != undefined) {
					if(creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						creep.moveTo(structure);
					}
					else { /*console.log("FILLING UP");*/ }
				}
				//console.log("DOING NOTHING");
				//roleUpgrader.run(creep);
			}
		}
		else {

		     	var containers = creep.room.find(FIND_STRUCTURES, {
		        filter: (structure) =>
			        (structure.structureType == STRUCTURE_CONTAINER)  && (structure.store[RESOURCE_ENERGY] > 0)
			});
			var source = creep.pos.findClosestByPath(containers);
			if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(source);
			} else {
			}
			if (source === null || source === undefined) {
				var source = creep.pos.findClosestByPath(FIND_SOURCES);
				if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
					creep.moveTo(source);
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
