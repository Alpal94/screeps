module.exports = function() {
	StructureSpawn.prototype.createCustomCreep = 
		function(energy, roleName, id) {
			switch(roleName) {
				case 'miner':
				case 'miner2':
					var numberOfParts = Math.floor( energy / 200 );
					var body = [];
					for (let i = 0; i < 3; i++) {
						body.push(WORK);
					}
					for (let i = 0; i < 1; i++) {
						body.push(MOVE);
					}
					break;
				break;
				case 'claimer':
					var body = [];
					body.push(MOVE);
					body.push(MOVE);
					body.push(MOVE);
					body.push(MOVE);
					body.push(CLAIM);
					break;
				break;
				case 'harvester':

					console.log('number of parts');
					console.log(numberOfParts);
					var numberOfParts = Math.floor( energy / 200 );
					var body = [];
					for (let i = 0; i < numberOfParts; i++) {
						body.push(WORK);
					}
					for (let i = 0; i < numberOfParts; i++) {
						body.push(CARRY);
					}
					for (let i = 0; i < numberOfParts; i++) {
						body.push(MOVE);
					}
					break;
				break;
				case 'long_distance_harvester':
					var numberOfParts = Math.floor( energy / 200 );
					var body = [];
					if(id == 2) {
						for (let i = 0; i < Math.floor(numberOfParts); i++) {
							body.push(WORK);
						}

						for (let i = 0; i < Math.floor(numberOfParts); i++) {
							body.push(CARRY);
						}
						for (let i = 0; i < Math.floor(numberOfParts); i++) {
							body.push(MOVE);
						} 
					} else {
						for (let i = 0; i < Math.floor(numberOfParts); i++) {
							body.push(WORK);
						}
						for (let i = 0; i < Math.floor(numberOfParts); i++) {
							body.push(CARRY);
						}
						for (let i = 0; i < Math.floor(numberOfParts); i++) {
							body.push(MOVE);
						} 

					}
					break;
				break;
				default:
					var numberOfParts = Math.floor( energy / 200 );
					var body = [];
					for (let i = 0; i < numberOfParts; i++) {
						body.push(WORK);
					}
					for (let i = 0; i < numberOfParts; i++) {
						body.push(CARRY);
					}
					for (let i = 0; i < numberOfParts; i++) {
						body.push(MOVE);
					}
					break;
			}

			return this.createCreep(body, undefined, { role: roleName, working: false , sId: id });
		};
};
