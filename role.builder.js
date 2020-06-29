var roleBuilder = {
// Builders必须升级为二级控制器后才能建造储能的空间
// 选择顶部最右侧一栏添加物品
    /** @param {Creep} creep **/
    run: function(creep) {

     if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('采集中');
     }
     if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
         creep.memory.building = true;
         creep.say('建造中');
     }

     if(creep.memory.building) {
         var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
     }
     else {
         var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.say('返回啦');
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
     }
 }
};

module.exports = roleBuilder;