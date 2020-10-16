import React from 'react';

import Analyzer, { SELECTED_PLAYER, Options } from 'parser/core/Analyzer';
import SPELLS from 'common/SPELLS';
import BoringSpellValueText from 'interface/statistics/components/BoringSpellValueText';
import ItemHealingDone from 'interface/ItemHealingDone';
import Statistic from 'interface/statistics/Statistic';
import Events, { CastEvent, HealEvent } from 'parser/core/Events';
import { formatPercentage, formatThousands } from 'common/format';
import STATISTIC_CATEGORY from 'interface/others/STATISTIC_CATEGORY';
import STATISTIC_ORDER from 'interface/others/STATISTIC_ORDER';

class CircleOfHealing extends Analyzer {
  circleOfHealingCasts = 0;
  circleOfHealingHealing = 0;
  circleOfHealingOverhealing = 0;
  circleOfHealingTargetsHit = 0;

  get overHealPercent() {
    return this.circleOfHealingOverhealing / this.rawHealing;
  }

  get rawHealing() {
    return this.circleOfHealingHealing + this.circleOfHealingOverhealing;
  }

  get averageTargetsHit() {
    return this.circleOfHealingTargetsHit / this.circleOfHealingCasts;
  }

  constructor(options: Options) {
    super(options);

    this.addEventListener(Events.cast.by(SELECTED_PLAYER).spell(SPELLS.CIRCLE_OF_HEALING_TALENT), this.onCohCast);
    this.addEventListener(Events.heal.by(SELECTED_PLAYER).spell(SPELLS.CIRCLE_OF_HEALING_TALENT), this.onCohHeal);
  }

  onCohCast(event: CastEvent) {
    const spellId = event.ability.guid;
    if (spellId === SPELLS.CIRCLE_OF_HEALING_TALENT.id) {
      this.circleOfHealingCasts += 1;
    }
  }

  onCohHeal(event: HealEvent) {
    const spellId = event.ability.guid;
    if (spellId === SPELLS.CIRCLE_OF_HEALING_TALENT.id) {
      this.circleOfHealingTargetsHit += 1;
      this.circleOfHealingHealing += event.amount || 0;
      this.circleOfHealingOverhealing += event.overheal || 0;
    }
  }

  statistic() {
    return (
      <Statistic
        tooltip={(
          <>
            Coh Casts: {this.circleOfHealingCasts}<br />
            Total Healing: {formatThousands(this.circleOfHealingHealing)} ({formatPercentage(this.overHealPercent)}% OH)<br />
            Average Targets Hit: {this.averageTargetsHit.toFixed(2)}
          </>
        )}
        size="flexible"
        category={STATISTIC_CATEGORY.GENERAL}
        position={STATISTIC_ORDER.OPTIONAL(5)}
      >
        <BoringSpellValueText spell={SPELLS.CIRCLE_OF_HEALING_TALENT}>
          <ItemHealingDone amount={this.circleOfHealingHealing} />
        </BoringSpellValueText>
      </Statistic>
    );
  }
}

export default CircleOfHealing;
