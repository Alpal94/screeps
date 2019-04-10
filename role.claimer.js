module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if in target room
	console.log("CLAIMER ALIVE");
    	var targetRoom = 'E47S7';
	var homeRoom = 'E48S7';
        if (creep.room.name != targetRoom) {
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
					var pos = new RoomPosition(3, 15, targetRoom); 
					creep.moveTo(pos);
				}        }
        else {
            // try to claim controller
            if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                // move towards the controller
                creep.moveTo(creep.room.controller);
            }
	    //creep.signController(creep.room.controller, "All enemies of the Empire, die !!!");
        }
    }
};
