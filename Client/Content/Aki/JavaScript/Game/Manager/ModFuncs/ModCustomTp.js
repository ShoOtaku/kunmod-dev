"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ModCustomTp = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  ModManager_1 = require("../ModManager"),
  TeleportController_1 = require("../../Module/Teleport/TeleportController"),
  ModUtils_1 = require("./ModUtils"),
  InputController_1 = require("../../Input/InputController"),
  InputSettings_1 = require("../../InputSettings/InputSettings"),
  ModTpFile = require("./ModTpFile").ModTpFile;
const ModLanguage_1 = require("./ModLanguage");
const ModTr = ModLanguage_1.ModLanguage.ModTr;

class ModCustomTp {
  static Settings = {
    CurrFile: "None",
    PrevFile: "None",
    NextFile: "None",
    PrevPos: "None",
    CurrPos: "None",
    NextPos: "None",
    TotalNum: 0,
    CurreNum: -1,
    TotalFileNum: 0,
    CurreFileNum: 0,
    AutoMode: false,
    Delay: 15000,
  };
  static ShowCtpState() {
    this.GetTpInfo();
    var state = ModManager_1.ModManager.Settings.CustomTp;
    var title =
      ModTr("CustomTp State [Insert]:") +
      (state ? ModTr("ON") : ModTr("OFF")) +
      ModTr(" Show[Del]") +
      " (" +
      (this.Settings.CurreNum + 1).toString() +
      "/" +
      (this.Settings.TotalNum + 1).toString() +
      ")" +
      this.Settings.CurrPos;

    var readme =
      ModTr("CurrentFile:") +
      this.Settings.CurrFile +
      ModTr("| PreviousFile[PageUp]: ") +
      this.Settings.PrevFile +
      ModTr(" | NextFile[PageDown]: ") +
      this.Settings.NextFile +
      ModTr(" | PreviousPos[Up]: ") +
      this.Settings.PrevPos +
      ModTr(" | NextPos[Down]: ") +
      this.Settings.NextPos +
      ModTr(" | AutoMode[End]: ") +
      (this.Settings.AutoMode ? ModTr("ON") : ModTr("OFF")) +
      ModTr(" | SetDelay[Left]: ") +
      (this.Settings.Delay / 1000).toString() +
      ModTr(" | Select[Right]: ");

    ModManager_1.ModManager.ShowConfirmBox(title, readme, 50);
  }
  static CustomTpEnable() {
    ModManager_1.ModManager.AddKey("PreviousFile", "PageUp");
    ModManager_1.ModManager.AddKey("NextFile", "PageDown");
    ModManager_1.ModManager.AddKey("PreviousPos", "Up");
    ModManager_1.ModManager.AddKey("NextPos", "Down");
    ModManager_1.ModManager.AddKey("ShowTpState", "Delete");
    ModManager_1.ModManager.AddToggle("AutoMode", "End");
    ModManager_1.ModManager.AddKey("SetDelay", "Left");
    ModManager_1.ModManager.AddKey("Select", "Right");
    this.GetTpInfoFirst();
    this.ShowCtpState();
  }
  static CustomTpDisable() {
    ModManager_1.ModManager.RemoveKey("PreviousFile", "PageUp");
    ModManager_1.ModManager.RemoveKey("NextFile", "PageDown");
    ModManager_1.ModManager.RemoveKey("Previous", "Up");
    ModManager_1.ModManager.RemoveKey("Next", "Down");
    ModManager_1.ModManager.RemoveKey("ShowTpState", "Delete");
    ModManager_1.ModManager.RemoveToggle("AutoMode", "End");
    ModManager_1.ModManager.RemoveKey("SetDelay", "Left");
    ModManager_1.ModManager.RemoveKey("Select", "Right");
    this.Settings.CurrFile = "None";
    this.Settings.PrevFile = "None";
    this.Settings.NextFile = "None";
    this.Settings.PrevPos = "None";
    this.Settings.CurrPos = "None";
    this.Settings.NextPos = "None";
    this.Settings.TotalNum = 0;
    this.Settings.CurreNum = -1;
    this.Settings.TotalFileNum = 0;
    this.Settings.CurreFileNum = 0;
    this.Settings.AutoMode = false;
  }

  static GetTpInfo() {
    this.Settings.TotalNum =
      ModTpFile.CustomTpList[this.Settings.CurreFileNum].length - 1;
    this.Settings.TotalFileNum = ModTpFile.CustomTpList.length - 1;
    this.Settings.CurrFile =
      ModTpFile.CustomTpList[this.Settings.CurreFileNum][0].filename;
    try {
      this.Settings.PrevFile =
        ModTpFile.CustomTpList[this.Settings.CurreFileNum - 1][0].filename;
    } catch (error) {
      this.Settings.PrevFile = "None";
    }

    try {
      this.Settings.NextFile =
        ModTpFile.CustomTpList[this.Settings.CurreFileNum + 1][0].filename;
    } catch (error) {
      this.Settings.NextFile = "None";
    }
    try {
      this.Settings.CurrPos = this.GetPosInfo(
        this.Settings.CurreFileNum,
        this.Settings.CurreNum
      );
    } catch {
      this.Settings.CurrPos = "None";
    }

    try {
      this.Settings.PrevPos = this.GetPosInfo(
        this.Settings.CurreFileNum,
        this.Settings.CurreNum - 1
      );
    } catch (error) {
      this.Settings.PrevPos = "None";
    }

    try {
      this.Settings.NextPos = this.GetPosInfo(
        this.Settings.CurreFileNum,
        this.Settings.CurreNum + 1
      );
    } catch (error) {
      this.Settings.NextPos = "None";
    }
  }

  static GetTpInfoFirst() {
    this.Settings.CurrFile = "None";
    this.Settings.PrevFile = "None";
    this.Settings.NextFile = "None";
    this.Settings.PrevPos = "None";
    this.Settings.CurrPos = "None";
    this.Settings.NextPos = "None";
    this.Settings.TotalNum = 0;
    this.Settings.CurreNum = -1;
    this.Settings.TotalFileNum = 0;
    this.Settings.CurreFileNum = 0;
    this.Settings.AutoMode = false;
    this.GetTpInfo();
  }

  static GetPosInfo(num1, num2) {
    var x = ModTpFile.CustomTpList[num1][num2].x;
    var y = ModTpFile.CustomTpList[num1][num2].y;
    var z = ModTpFile.CustomTpList[num1][num2].z;
    var PosInfo =
      "(" +
      Math.floor(x / 100).toString() +
      "," +
      Math.floor(y / 100).toString() +
      "," +
      Math.floor(z / 100).toString() +
      ")";
    return PosInfo;
  }

  static AddFile() {
    if (this.Settings.CurreFileNum < this.Settings.TotalFileNum) {
      this.Settings.CurreFileNum = this.Settings.CurreFileNum + 1;
      this.Settings.CurreNum = 0;
      ModManager_1.ModManager.ShowTip(
        "Switch to" +
          ModTpFile.CustomTpList[this.Settings.CurreFileNum][1].filename
      );
    } else ModManager_1.ModManager.ShowTip(ModTr("is the last file"));

    this.Settings.CurreNum = -1;
    this.GetTpInfo();
  }
  static SubFile() {
    if (this.Settings.CurreFileNum > 0) {
      this.Settings.CurreFileNum = this.Settings.CurreFileNum - 1;
      ModManager_1.ModManager.ShowTip(
        "Switch to" +
          ModTpFile.CustomTpList[this.Settings.CurreFileNum][1].filename
      );
    } else ModManager_1.ModManager.ShowTip(ModTr("is the first file"));

    this.Settings.CurreNum = -1;
    this.GetTpInfo();
  }
  static AddPos() {
    if (this.Settings.CurreNum < this.Settings.TotalNum) {
      this.Settings.CurreNum++;
    } else ModManager_1.ModManager.ShowTip(ModTr("is the last pos"));
    this.GetTpInfo();
  }
  static SubPos() {
    if (this.Settings.CurreNum > 0) {
      this.Settings.CurreNum--;
    } else ModManager_1.ModManager.ShowTip(ModTr("is the first pos"));
    this.GetTpInfo();
  }

  static GoTp() {
    var x =
      ModTpFile.CustomTpList[this.Settings.CurreFileNum][this.Settings.CurreNum]
        .x;
    var y =
      ModTpFile.CustomTpList[this.Settings.CurreFileNum][this.Settings.CurreNum]
        .y;
    var z =
      ModTpFile.CustomTpList[this.Settings.CurreFileNum][this.Settings.CurreNum]
        .z;
    var tips = this.GetPosInfo(
      this.Settings.CurreFileNum,
      this.Settings.CurreNum
    );
    ModManager_1.ModManager.ShowTip(
      "go to" +
        ModTpFile.CustomTpList[this.Settings.CurreFileNum][
          this.Settings.CurreNum
        ].name +
        tips
    );
    TeleportController_1.TeleportController.TeleportToPositionNoLoading(
      new UE.Vector(x, y, z),
      new UE.Rotator(0, 0, 0),
      "comment/message"
    );
  }

  static setDelay() {
    ModUtils_1.ModUtils.KuroSingleInputBox({
      title: ModTr("CustomTp:AutoMode:Set Delay"),
      customFunc: async (string) => {
        var s = ModUtils_1.ModUtils.StringToInt(string);
        if (s !== "error") this.Settings.Delay = s * 1000;
      },
      inputText: (this.Settings.Delay / 1000).toString(),
      defaultText: ModTr("Please enter Delay(s)"),
      isCheckNone: true,
      needFunctionButton: false,
    });
  }

  static async timer() {
    this.isTimerRunning = true;
    while (this.Settings.AutoMode) {
      while (ModUtils_1.ModUtils.IsTping()) {
        await ModUtils_1.ModUtils.Sleep(1000); // 等待1秒后再次检查
      }
      this.isCountdownActive = true;
      for (
        let i = this.Settings.Delay / 1000;
        i > 0 && this.isCountdownActive;
        i--
      ) {
        ModManager_1.ModManager.ShowTip(
          i === 1 ? ModTr("Go") : `${ModTr("Remaining time")}: ${i} ${ModTr("seconds")}`
        );
        await ModUtils_1.ModUtils.Sleep(1000);
      }
      if (!ModUtils_1.ModUtils.IsTping()) {
        this.isCountdownActive = false;
        this.AddPos();
        this.GoTp();
        if (this.Settings.TotalNum == this.Settings.CurreNum) {
          this.Settings.AutoMode = false;
        }
      }
    }
    this.isTimerRunning = false;
}


  static listenAuto() {
    if (InputController_1.InputController.IsMyKeyUp("End")) {
      this.Settings.AutoMode = !this.Settings.AutoMode;
      var info = "Unknown";
      var string = ModTr("AutoMode");
      if (this.Settings.AutoMode) {
        info = string + " | " + ModTr("ON");
        ModManager_1.ModManager.ShowTip(info);
      } else {
        info = string + " | " + ModTr("OFF");
        ModManager_1.ModManager.ShowTip(info);
      }

      if (!this.isTimerRunning) {
        this.timer();
      }
    }
  }

  static listenDelay() {
    if (ModManager_1.ModManager.listenKey("SetDelay", "Left")) {
      this.setDelay();
    }
  }
  static listenSelect() {
    if (ModManager_1.ModManager.listenKey("Select", "Right")) {
      this.Select();
    }
  }
  static Select() {
    ModUtils_1.ModUtils.KuroSingleInputBox({
      title: ModTr("CustomTp:CurrPos:Select"),
      customFunc: async (string) => {
        var s = ModUtils_1.ModUtils.StringToInt(string);
        if (s !== "error") this.Settings.CurreNum = s - 1;
      },
      inputText: (this.Settings.CurreNum + 1).toString(),
      defaultText: ("Please enter CurreNum"),
      isCheckNone: true,
      needFunctionButton: false,
    });
  }
}

exports.ModCustomTp = ModCustomTp;