module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
	var homeRoom = 'E48S7';
	var targetRoom = 'E46S7';

	console.log(creep.pos + "ATTACKER");
	const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
	if(target) {
		console.log("KILL KILL KILL");
		if(creep.attack(target) == ERR_NOT_IN_RANGE) {
			creep.moveTo(target);
		}
	} else {
		// if in target room
		if (creep.room.name != targetRoom) {
			if(creep.pos.x > 1 && creep.room.name == homeRoom) {
				var pos = new RoomPosition(1, 34, homeRoom); 
				creep.moveTo(pos);
				return;
			}
		    // find exit to target room
		    var exit = creep.room.findExitTo(targetRoom);
		    // move to exit
		    creep.moveTo(creep.pos.findClosestByRange(exit));
		}
		else {
			var pos = new RoomPosition(3, 37, 'E48S7'); 
			creep.moveTo(pos);
		}
	}
    }
};
