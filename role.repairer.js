var roleRepairer = {
    //修理者
    /** @param {Creep} creep **/
    run: function(creep) {
    // if(creep.store.getFreeCapacity() > 0) {
    if(creep.store == 0) {
        var sources = creep.room.find(FIND_SOURCES);
        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        }
        creep.say('🔄 采集中');
    }
    else {
        creep.memory.repaireing = true;
        creep.say('🛠 修理中')
    }
    
    const targets = creep.room.find(FIND_STRUCTURES, {
        filter: object => object.hits < object.hitsMax
    });

    targets.sort((a,b) => a.hits - b.hits);
    
    if(creep.memory.repaireing) {
        if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
    else {
        var targetsSource = creep.room.find(FIND_STRUCTURES, {
            filter: (i) => i.structureType == STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] > 0
        });
        if(targetsSource.length > 0) {
            if(creep.withdraw(targetsSource[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targetsSource[1], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
	}
};
module.exports = roleRepairer;