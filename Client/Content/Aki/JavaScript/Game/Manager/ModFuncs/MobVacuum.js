"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MobVacuum = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  ModManager_1 = require("../ModManager"),
  ModUtils_1 = require("./ModUtils"),
  NetDefine_1 = require("../../../Core/Define/Net/NetDefine"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EntityManager_1 = require("./EntityManager"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  AutoInteract_1 = require("./AutoInteract"),
  UiManager_1 = require("../../../Ui/UiManager");

const EntityManager = EntityManager_1.EntityManager;
const ModUtils = ModUtils_1.ModUtils;

class MobVacuum extends EntityManager {
  static isNeed(entity) {
    let need = this.isMonster(entity);

    return need;
  }

  static MobVacuum(entity) {
    if (!ModManager_1.ModManager.Settings.MobVacuum) return;
    if (this.isMonster(entity) /*|| this.isAnimal(entity)*/) {
      let playerpos = EntityManager.GetPlayerPos();
      let ActorComp = entity.Entity.GetComponent(3); 
      let actor = ActorComp.Actor;
      this.SyncMonster(entity, playerpos)
      actor.K2_SetActorLocation(playerpos, 0, void 0, 1);
    }
    
  }



  static VacuumCollect(entity) {
    if (!ModManager_1.ModManager.Settings.VacuumCollect) return;
    if (!AutoInteract_1.AutoInteract.isNeedLoot(entity)) return;
    //if (!this.isCollection(entity)) return;
    let playerpos = EntityManager.GetPlayerPos();
    let ActorComp = entity.Entity.GetComponent(1);
    ActorComp.SetActorLocation(playerpos);
   // puerts_1.logger.info("VacuumCollectEnd");
  }

  static SyncMonster(entity, pos) {
    var t = entity.Entity.GetComponent(56);
    var i = t.GetCurrentMoveSample();
    i.Location = pos;

    t.PendingMoveInfos.push(i);
    var s = Protocol_1.Aki.Protocol.MovePackagePush.create();
    s.MovingEntities.push(t.CollectPendingMoveInfos());
    Net_1.Net.Send(NetDefine_1.EPushMessageId.MovePackagePush, s);
  }
}
//puerts.logger.info(debug)
exports.MobVacuum = MobVacuum;