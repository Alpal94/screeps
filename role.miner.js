var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep, x, y, home) {
	if (creep.memory.role === 'miner_resources') {
		console.log("Resource miner target: " + x + " " + y + " Home: " + home);
		console.log(creep.pos);
	}
       var pos = new RoomPosition(x, y, home); 
       var source = creep.pos.findClosestByPath(FIND_SOURCES);
	if (creep.memory.role === 'miner_resources') source = creep.pos.findClosestByPath(FIND_MINERALS);
       console.log(source);
       console.log("MINER SOURCE: ");
       if(creep.harvest(source) == ERR_NOT_IN_RANGE || source === null) {
		console.log("Miner target: " + x + " " + y + " Home: " + home);
		console.log(creep.moveTo(pos));
       }
       if (pos !== creep.pos) creep.moveTo(pos);
       return home;
    }
};

module.exports = roleMiner;
