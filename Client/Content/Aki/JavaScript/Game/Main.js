"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0,
});
const puerts_1 = require("puerts"),
  UE = require("ue"),
  InputSeeting_1 = require("../Game/InputSettings/InputSettings"),
  ResourceSystem_1 = require("../Core/Resource/ResourceSystem"),
  GlobalData_1 = require("../Game/GlobalData"),
  GameProcedure_1 = require("./GameProcedure"),
  ModManager_1 = require("./Manager/ModManager"),
  ModLanguage_1 = require("./Manager/ModFuncs/ModLanguage"),
  UiManager_1 = require("./Ui/UiManager");

const ModManager = ModManager_1.ModManager,
  ModLanguage = ModLanguage_1.ModLanguage;

let keyState = false,
  Menu = null,
  isMenuLoaded = false,
  isMenuShow = false,
  currentLang = "en",
  loadMenuInterval = null;

function main() {
  var e = puerts_1.argv.getByName("GameInstance");
  GameProcedure_1.GameProcedure.Start(e);
}

function IsKey(str) {
  var IsInputKeyDown_1 = InputSeeting_1.InputSettings.IsInputKeyDown(str);
  var IsInputKeyDown_LeftControl =
    InputSeeting_1.InputSettings.IsInputKeyDown("LeftAlt");
  if (IsInputKeyDown_LeftControl && IsInputKeyDown_1 && !keyState) {
    IsInputKeyDown_1 = false;
    IsInputKeyDown_LeftControl = false;
    keyState = true;
    return true;
  }
  if (IsInputKeyDown_1 === false) {
    keyState = false;
    return false;
  }
  return false;
}

function listenKey() {
  ModManager_1.ModManager.listenModsToggle();
  InputSeeting_1.InputSettings.AddActionMapping("", "LeftAlt");
  InputSeeting_1.InputSettings.AddActionMapping("", "X");

  if (IsKey("X") === true) {
    isMenuShow ? Menu.SetVisibility(2) : Menu.SetVisibility(0);
    isMenuShow = !isMenuShow;
  }
}


function KunLog(string){
  var info = string.toString();
  puerts_1.logger.info("[KUNMOD:]"+info);
}

function OnTick() {
      
  if (!isMenuLoaded) {
    currentLang = ModLanguage.GetCurrLang();
    const MenuUI = ResourceSystem_1.ResourceSystem.Load(
      "/Game/Aki/ModMenu.ModMenu_C",
      UE.Class
    );
    const Yinlin = ResourceSystem_1.ResourceSystem.Load(
      "/Game/Aki/Yinlin.Yinlin",
      UE.Texture
    );
    const Gradient = ResourceSystem_1.ResourceSystem.Load(
      "/Game/Aki/Gradient.Gradient",
      UE.Texture
    );

    Menu = UE.UMGManager.CreateWidget(GlobalData_1.GlobalData.World, MenuUI);

    if (Menu) {
      const YinlinImage = Menu.Yinlin,
        TitleBarImage = Menu.TitleBar;

      YinlinImage.SetBrushFromTexture(Yinlin);
      TitleBarImage.SetBrushFromTexture(Gradient);

      // CHECKBOX, INPUTBOX, SLIDER, BUTTON, ETC
      let GodMode = Menu.GodModeCheck,
        NoCD = Menu.NoCDCheck,
        AutoPickTreasure = Menu.AutoPickTreasureCheck,
        AutoAbsorb = Menu.AutoAbsorbEchoCheck,
        HitMultiplier = Menu.HitMultiplierCheck,
        HitMultiplierCount = Menu.HitMultiplierCount,
        KillAura = Menu.KillAuraCheck,
        KillAuraValue = Menu.KillAuraValue,
        AntiDither = Menu.AntiDitherCheck,
        InfiniteStamina = Menu.InfiniteStaminaCheck,
        AutoLoot = Menu.AutoLootCheck,
        PerceptionRange = Menu.PerceptionRangeCheck,
        PlayerSpeed = Menu.PlayerSpeedCheck,
        PlayerSpeedValue = Menu.PlayerSpeedValue,
        CustomUidValue = Menu.CustomUidValue,
        CustomUidSubmit = Menu.CustomUidSubmit,
        HideHUD = Menu.HideHUDCheck,
        HideDmg = Menu.HideDmgCheck;

      // TEXT
      let GodModeText = Menu.GodModeText,
        NoCDText = Menu.NoCDText,
        AutoPickTreasureText = Menu.AutoPickTreasureText,
        AutoAbsorbText = Menu.AutoAbsorbEchoText,
        HitMultiplierText = Menu.HitMultiplierText,
        KillAuraText = Menu.KillAuraText,
        AntiDitherText = Menu.AntiDitherText,
        InfiniteStaminaText = Menu.InfiniteStaminaText,
        AutoLootText = Menu.AutoLootText,
        PerceptionRangeText = Menu.PerceptionRangeText,
        PlayerSpeedText = Menu.PlayerSpeedText,
        CustomUidText = Menu.CustomUidText,
        HideHUDText = Menu.HideHUDText,
        HideDmgText = Menu.HideDmgText

      // HEADING
      let HeadingPlayer = Menu.HeadingPlayer,
        HeadingWorld = Menu.HeadingWorld,
        HeadingUI = Menu.HeadingUI;

      // default value
      GodMode.SetIsChecked(ModManager.Settings.GodMode);
      AutoPickTreasure.SetIsChecked(ModManager.Settings.AutoPickTreasure);
      AutoAbsorb.SetIsChecked(ModManager.Settings.AutoAbsorb);
      HitMultiplier.SetIsChecked(ModManager.Settings.HitMultiplier);
      HitMultiplierCount.SetText(ModManager.Settings.Hitcount);
      KillAura.SetIsChecked(ModManager.Settings.killAura);
      AntiDither.SetIsChecked(ModManager.Settings.AntiDither);
      InfiniteStamina.SetIsChecked(ModManager.Settings.InfiniteStamina);
      AutoLoot.SetIsChecked(ModManager.Settings.AutoLoot);
      PerceptionRange.SetIsChecked(ModManager.Settings.PerceptionRange);
      PlayerSpeed.SetIsChecked(ModManager.Settings.PlayerSpeed);
      PlayerSpeedValue.SetText(ModManager.Settings.playerSpeedValue);
      CustomUidValue.SetText("000000001");
      HideHUD.SetIsChecked(ModManager.Settings.HideHUD)
      HideDmg.SetIsChecked(ModManager.Settings.HideDmgUi)


      // translate
      HeadingPlayer.SetText("Player");
      HeadingWorld.SetText("World");
      HeadingUI.SetText("UI");
      GodModeText.SetText(ModText(15));
      NoCDText.SetText(ModText(21));
      AutoPickTreasureText.SetText(ModText(17));
      AutoAbsorbText.SetText(ModText(18));
      HitMultiplierText.SetText(ModText(16));
      KillAuraText.SetText(ModText(19));
      AntiDitherText.SetText(ModText(33));
      InfiniteStaminaText.SetText(ModLanguage.ModTr("Infinite Stamina"));
      AutoLootText.SetText(ModText(24));
      PerceptionRangeText.SetText(ModText(20));
      PlayerSpeedText.SetText(ModText(22));
      CustomUidText.SetText(ModLanguage.ModTr("Custom UID"));
      HideHUDText.SetText("Hide HUD");
      HideDmgText.SetText("Hide Damage Text");

      GodMode.OnCheckStateChanged.Add((isChecked) => {
        ModManager.Settings.GodMode = isChecked;
        KunLog("God Mode: " + isChecked);
      });

      NoCD.OnCheckStateChanged.Add((isChecked) => {
        ModManager.Settings.NoCD = isChecked;
        KunLog("No Cooldown: " + isChecked);
      });

      AutoPickTreasure.OnCheckStateChanged.Add((isChecked) => {
        ModManager.Settings.AutoPickTreasure = isChecked;
        KunLog("Auto Pick Treasure: " + isChecked);
      });

      AutoAbsorb.OnCheckStateChanged.Add((isChecked) => {
        ModManager.Settings.AutoAbsorb = isChecked;
        KunLog("Auto Absorb: " + isChecked);
      });

      HitMultiplier.OnCheckStateChanged.Add((isChecked) => {
        ModManager.Settings.HitMultiplier = isChecked;
        KunLog("Hit Multiplier: " + isChecked);
      });

      HitMultiplierCount.OnTextChanged.Add((value) => {
        value = Number(value);
        if (typeof value === "number") {
          ModManager.Settings.Hitcount = value;
          KunLog("Hit Multiplier Count: " + value);
        } else {
          ModManager.Settings.Hitcount = 1;
        }
      });

      KillAura.OnCheckStateChanged.Add((isChecked) => {
        ModManager.Settings.killAura = isChecked;
        KunLog("Kill Aura: " + isChecked);
      });

      const killAuraOption = {
        "Only Hatred": { value: 0 },
        Inifnity: { value: 1 },
      };

      for (const option in killAuraOption) {
        KillAuraValue.AddOption(option);
      }

      KillAuraValue.SetSelectedOption("Only Hatred");

      KillAuraValue.OnSelectionChanged.Add((selectedItem) => {
        const value = killAuraOption[selectedItem];
        if (selectedItem) {
          CheatState.Settings.KillAuraValue = value.value;
          KunLog("Kill Aura Value: " + selectedItem);
        }
      });

      AntiDither.OnCheckStateChanged.Add((isChecked) => {
        ModManager.Settings.AntiDither = isChecked;
        KunLog("Anti Dither: " + isChecked);
      });

      InfiniteStamina.OnCheckStateChanged.Add((isChecked) => {
        ModManager.Settings.InfiniteStamina = isChecked;
        KunLog("Inifnite Stamina: " + isChecked);
      });

      AutoLoot.OnCheckStateChanged.Add((isChecked) => {
        ModManager.Settings.AutoLoot = isChecked;
        KunLog("Auto Loot: " + isChecked);
      });

      PerceptionRange.OnCheckStateChanged.Add((isChecked) => {
        ModManager.Settings.PerceptionRange = isChecked;
        KunLog("Perception Range: " + isChecked);
      });

      PlayerSpeed.OnCheckStateChanged.Add((isChecked) => {
        ModManager.Settings.PlayerSpeed = isChecked;
        KunLog("Player Speed: " + isChecked);
        updatePlayerSpeed();
      });

      PlayerSpeedValue.OnTextChanged.Add((value) => {
        value = Number(value);
        if (typeof value === "number") {
          ModManager.Settings.playerSpeedValue = value;
          KunLog("Player Speed Value: " + value);
        } else {
          ModManager.Settings.playerSpeedValue = 1;
          KunLog("Player Speed Value: 1");
        }
        updatePlayerSpeed();
      });

      CustomUidSubmit.OnClicked.Add(() => {
        ModManager.ChangeUid(CustomUidValue.GetText());
      });

      HideHUD.OnCheckStateChanged.Add((isChecked) => {
        if (isChecked) {
          UiManager_1.UiManager.CloseView("BattleView");
          UiManager_1.UiManager.CloseView("UidView");
        } else {
          UiManager_1.UiManager.OpenView("BattleView");
          UiManager_1.UiManager.OpenView("UidView");
        }
      });

      HideDmg.OnCheckStateChanged.Add((isChecked) => {
        ModManager.Settings.HideDmgUi = isChecked
      });

      // HIDE TEXT DAMAGE =>

      Menu.AddToViewport();
      Menu.SetVisibility(2);
      isMenuLoaded = true;
      KunLog("KUN-MOD Menu Loaded!");
      clearInterval(loadMenuInterval);
    }
  }
}

function updatePlayerSpeed() {
  if (ModManager.Settings.PlayerSpeed) {
    ModManager.SetPlayerSpeed(ModManager.Settings.playerSpeedValue);
  } else {
    ModManager.SetPlayerSpeed(1);
  }
}

function ModText(id) {
  var text = ModLanguage.ModTr(ModLanguage.translate[id].en);
  
  return text;
}

function killAuraLang(lang) {
  switch (lang) {
    case "en":
      return {
        onlyHatred: "Only Hatred",
        infinity: "Infinity",
      };
      break;
    case "zh-CN":
      return {
        onlyHatred: "仅仇恨",
        infinity: "无限",
      };
      break;
    case "ja":
      return {
        onlyHatred: "Only Hatred",
        infinity: "Infinity",
      };
      break;
    default:
      return {
        onlyHatred: "Only Hatred",
        infinity: "Infinity",
      };
  }
}

loadMenuInterval = setInterval(OnTick, 3000);
setInterval(listenKey, 1);

main();
//# sourceMappingURL=Main.js.map
