"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NoClip = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  ModManager_1 = require("../ModManager"),
  ModUtils_1 = require("./ModUtils"),
  EntityManager_1 = require("./EntityManager"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  UiManager_1 = require("../../../Ui/UiManager");

const EntityManager = EntityManager_1.EntityManager;
const ModUtils = ModUtils_1.ModUtils;

class NoClip extends EntityManager {
  static NoClip(bool) {
    let playerentity = this.GetPlayerEntity();
    let ActorComp = playerentity.GetComponent(3);
    let Actor = ActorComp.Actor;
    Actor.SetActorEnableCollision(!bool); //碰撞开关
    let Movement = ActorComp.ActorInternal.CharacterMovement;
    if (bool) Movement.MovementMode = 5;
    else Movement.MovementMode = 1;
  }
  //移动模式
}
//puerts.logger.info(debug)
exports.NoClip = NoClip;
