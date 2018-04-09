import CoreCombatLogParser from 'Parser/Core/CombatLogParser';
import DamageDone from 'Parser/Core/Modules/DamageDone';

import Abilities from './Modules/Abilities';
import AlwaysBeCasting from './Modules/Features/AlwaysBeCasting';
import BattleCry from './Modules/Features/BattleCry';
import CooldownThroughputTracker from './Modules/Features/CooldownThroughputTracker';
import ColossusSmashUptime from './Modules/BuffDebuff/ColossusSmashUptime';
import TacticianProc from './Modules/BuffDebuff/TacticianProc';
import SpellUsable from './Modules/Features/SpellUsable';
import Channeling from './Modules/Features/Channeling';


//import RelicTraits from './Modules/Traits/RelicTraits';

class CombatLogParser extends CoreCombatLogParser {
  static specModules = {
    // WarriorCore
    damageDone: [DamageDone, {showStatistic: true}],
    abilities: Abilities,

    // Features
    alwaysBeCasting: AlwaysBeCasting,
    battleCry: BattleCry,
    cooldownThroughputTracker: CooldownThroughputTracker,
    colossusSmashUptime: ColossusSmashUptime,
    tacticianProc: TacticianProc,
    spellUsable: SpellUsable,
    channeling: Channeling,

    // Talents

    // Traits

    // Items:

  };
}

export default CombatLogParser;
