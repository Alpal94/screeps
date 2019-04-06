module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        // if in target room
    	var targetRoom = 'E31N39';
	console.log("CLAIMER");
        if (creep.room.name != targetRoom) {
            // find exit to target room
            var exit = creep.room.findExitTo(targetRoom);
            // move to exit
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
        else {
            // try to claim controller
            if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                // move towards the controller
                creep.moveTo(creep.room.controller);
            }
	    creep.signController(creep.room.controller, "All enemies of the Empire, die !!!");
        }
    }
};
