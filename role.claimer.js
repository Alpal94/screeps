module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if in target room
    	var targetRoom = 'E47S7';
        if (creep.room.name != targetRoom) {
		if(creep.pos.x > 1) {
		       	var pos = new RoomPosition(1, 34, 'E48S7'); 
		       	var source = creep.pos.findClosestByPath(FIND_SOURCES);
			creep.moveTo(pos);
		       	return;
		}
            // find exit to target room
            var exit = creep.room.findExitTo(targetRoom);
            // move to exit
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
        else {
            // try to claim controller
            if (creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                // move towards the controller
                creep.moveTo(creep.room.controller);
            }
	    creep.signController(creep.room.controller, "All enemies of the Empire, die !!!");
        }
    }
};
