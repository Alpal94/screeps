var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep, x, y, home) {
       var pos = new RoomPosition(x, y, home); 
       var source = creep.pos.findClosestByPath(FIND_SOURCES);
       if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
		console.log("Miner target: " + x + " " + y + " Home: " + home);
		console.log(creep.moveTo(pos));
       }
       return home;
    }
};

module.exports = roleMiner;
