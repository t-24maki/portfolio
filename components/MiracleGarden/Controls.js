import { Blossom, DropIcon, SproutIcon } from './Flowers';
import TreatmentIllustration from './TreatmentArt';
import styles from '../../styles/MiracleGarden.module.css';

export function CareInputs({ config, condition, onSelect, disabled = false, id = 'experiment' }) {
  return <>
    <fieldset disabled={disabled}><legend>水の量</legend>
      <div className={styles.waterControl}><span className={styles.waterIcon}><DropIcon size={25} /></span>
        <button aria-label={`${id}の水を1mlへらす`} disabled={condition.water <= config.water.min || disabled} onClick={() => onSelect({ ...condition, water: condition.water - 1 })}>−</button>
        <output htmlFor={`${id}-water`}><strong style={{ '--water-digits': String(Math.max(Math.abs(config.water.min), Math.abs(config.water.max))).length }}>{condition.water}</strong><span className={styles.waterUnit}>{config.water.unit}</span></output>
        <button aria-label={`${id}の水を1mlふやす`} disabled={condition.water >= config.water.max || disabled} onClick={() => onSelect({ ...condition, water: condition.water + 1 })}>＋</button>
      </div>
      <input id={`${id}-water`} type="range" aria-label={`${id}の水の量`} min={config.water.min} max={config.water.max} step="1" value={condition.water} style={{ '--water-fill': `${(condition.water - config.water.min) / (config.water.max - config.water.min || 1) * 100}%` }} onChange={event => onSelect({ ...condition, water: Number(event.target.value) })} />
      <div className={styles.rangeLabels}><span>{config.water.min}ml</span><span>{config.water.max}ml</span></div>
    </fieldset>
    <fieldset disabled={disabled}><legend><ruby>肥料<rt>ひりょう</rt></ruby></legend>
      <div className={styles.fertilizerChoices}>{config.fertilizers.map(f => <button key={f.id} aria-pressed={condition.fertilizerId === f.id} onClick={() => onSelect({ ...condition, fertilizerId: f.id })} style={{ '--treatment-color': f.color }}><TreatmentIllustration treatment={f} /><span className={styles.treatmentName}>{f.short}</span>{condition.fertilizerId === f.id && <span className={styles.treatmentSelected} aria-hidden="true">✓</span>}</button>)}</div>
    </fieldset>
  </>;
}

export default function Controls({ game, condition, onSelect, onGrow, onPlan, busy }) {
  const { config } = game;
  const remaining = config.experimentLimit - game.experiments.length;
  return <section className={styles.controls} aria-label="育て方">
    {config.flowers.length > 1 && <fieldset className={styles.flowerField} disabled={busy}><legend>花の種類</legend><div className={styles.flowerChoices}>{config.flowers.map(f => <button key={f.id} aria-pressed={condition.flowerId === f.id} onClick={() => onSelect({ ...condition, flowerId: f.id })}><Blossom flower={f} size={39} /><span>{f.name}</span></button>)}</div></fieldset>}
    <CareInputs config={config} condition={condition} onSelect={onSelect} disabled={busy} id="おためし" />
    <button className={styles.primaryButton} disabled={busy} onClick={remaining ? onGrow : onPlan}><SproutIcon />{busy ? '育っています…' : remaining ? '育てる' : '本番の準備へ →'}</button>
  </section>;
}
