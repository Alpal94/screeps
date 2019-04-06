var roleUpgrader = require('role.upgrader');

module.exports = {
	run: function (creep) {
		console.log("LONG UPGRADER ARRIVED");
		var targetRoom = 'W33N48';
		var pos = new RoomPosition(3, 30, targetRoom); 
		if(creep.room.name != targetRoom ) {
			creep.moveTo(pos);
		} else {
		if(creep.memory.working == true && creep.carry.energy == 0) {
		       creep.memory.working = false;
		}
		else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
			creep.memory.working = true;
		}	

		if(creep.memory.working == true) {
			if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
				creep.moveTo(creep.room.controller);
			}
		}
		else {
			var sourcePos = new RoomPosition(4, 29, targetRoom); 
			var source = creep.pos.findClosestByPath(FIND_SOURCES);
			if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sourcePos);
			}
		}
		}
	}

}
