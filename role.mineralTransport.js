var roleUpgrader = require('role.upgrader');
module.exports = {
	run: function (creep) {
		var containers = creep.room.find(FIND_STRUCTURES, {
			filter: (structure) =>
			        (structure.structureType === STRUCTURE_CONTAINER)  && (structure.store[RESOURCE_KEANIUM] > 0) 
			});
		var source = creep.pos.findClosestByPath(containers);
		if((!source || creep.carry.energy > 0) && !(creep.carry.energy === 0 && _.sum(creep.carry) > 0)){
			roleUpgrader.run(creep);
			return;
		}

		let exploitStorage = false;
		if(creep.memory.working == true && _.sum(creep.carry) == 0) {
		       creep.memory.working = false;
		}
		else if (creep.memory.working == false && _.sum(creep.carry) == creep.carryCapacity) {
			creep.memory.working = true;
		}	

		if(creep.memory.working == true) {
		    //console.log("WORKING");
			var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
				filter: (s) => s.structureType === STRUCTURE_TERMINAL
			});
			if (structure != undefined) {
				if(creep.transfer(structure, RESOURCE_KEANIUM) === ERR_NOT_IN_RANGE) {
					creep.moveTo(structure);
				}
			} else {
				var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
					filter: (s) => s.structureType === STRUCTURE_STORAGE
				});
				console.log(structure);
				if (structure != undefined) {
					if(creep.transfer(structure, RESOURCE_KEANIUM) == ERR_NOT_IN_RANGE) {
						creep.moveTo(structure);
					}
				}
			}
		}
		else {

		     	var containers = creep.room.find(FIND_STRUCTURES, {
		        filter: (structure) =>
			        (structure.structureType === STRUCTURE_CONTAINER)  && (structure.store[RESOURCE_KEANIUM] > 0) 
			});
			var source = creep.pos.findClosestByPath(containers);
			if(creep.withdraw(source, RESOURCE_KEANIUM) == ERR_NOT_IN_RANGE) {
				creep.moveTo(source);
			}
			if(!source){
			    roleUpgrader.run(creep);
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
