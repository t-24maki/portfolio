import katex from 'katex';
import styles from '../../styles/MiracleGarden.module.css';

function MathFormula({ tex, inline = false }) {
  const html = katex.renderToString(tex, { displayMode: !inline, output: 'htmlAndMathml', trust: false });
  return inline ? <span dangerouslySetInnerHTML={{ __html: html }} />
    : <div className={styles.growthFormula} dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function Explanation({ config, dialogRef }) {
  return <dialog id="explanation-dialog" ref={dialogRef} className={`${styles.helpDialog} ${styles.explanationDialog}`} aria-labelledby="explanation-title" onClick={event => {
    if (event.target === event.currentTarget) dialogRef.current.close();
  }}>
    <header className={styles.explanationHeader}>
      <h2 id="explanation-title">解説</h2>
      <button onClick={() => dialogRef.current.close()} aria-label="解説を閉じる" autoFocus>×</button>
    </header>
    <div className={styles.explanationBody}>
      <p className={styles.explanationLead}>「{config.title}」は、花を育てながら、データをもとに考える感覚を体験してもらいたいと思い、つくったゲームです。</p>
      <p>統計学の用語や計算を知らなくても、試して、記録して、比べてみる。その中で「この結果だけで判断してよいだろうか」「次は何を確かめようか」と考えるきっかけになればと思っています。</p>

      <section className={styles.learningLessons} aria-labelledby="learning-lessons-title">
        <h3 id="learning-lessons-title">このゲームで伝えたいこと</h3>
        <section>
          <h4>同じ条件でも、結果は少しずつ違う</h4>
          <p>同じ水と肥料でも、花の長さにはばらつきがあります。たまたま長く育った1本だけで、その育て方が一番よいとは限りません。短かった花や育たなかった花も含め、結果全体を見ることが大切です。</p>
        </section>
        <section>
          <h4>データが増えると、傾向を捉えやすくなる</h4>
          <p>少ない記録からの判断は、偶然の結果に左右されやすくなります。比べられる条件で記録を積み重ねると、平均的な育ち方をより確かに見積もれるようになります。ただし、個々の花のばらつきがなくなるわけではありません。</p>
          <p>また、数が多ければ必ず正しいわけでもありません。都合のよい結果だけを残したり、違う条件の記録を混ぜたりすると、判断を誤ることがあります。データの量と、集め方の両方が大切です。</p>
        </section>
        <section>
          <h4>グラフにすると、関係が見えてくる</h4>
          <p>数字の一覧だけでは気づきにくい傾向も、散布図にすると見つけやすくなります。水を増やしたときの変化、同じ条件でのばらつき、肥料ごとの違い。点を並べることで、次に何を試すかの手がかりが得られます。</p>
          <p>肥料の効果は、水との組み合わせによっても変わります。一つの条件だけで「いつでもこちらがよい」と決めつけず、どんな場面でよい結果が出るのかを考えてみてください。</p>
        </section>
        <section>
          <h4>仕事の現場でも、同じ考え方が使える</h4>
          <p>たとえば、製造工程で温度や材料を変えて品質を比べる、作業の手順を変えて所要時間を調べる、Webサイトの案内文を変えて申込み率を比べる。実際の仕事にも、条件を変え、結果を記録し、改善方法を探す場面が数多くあります。</p>
          <p>一度の成功や失敗だけで結論を出さず、複数の結果を確かめること。対象者や時期など、ほかの条件の違いにも目を向けること。この庭での試行錯誤を、身近な判断につなげてもらえたらうれしいです。</p>
        </section>
      </section>
      <section className={styles.educationUse}>
        <h3>学習・教育での利用について</h3>
        <p>個人の学習、学校の授業、企業研修や勉強会などに、自由にお使いください。</p>
        <p>遊んだあとに「なぜその育て方を選んだか」「もう一度試すなら何を変えるか」を話し合う題材としても、ご活用いただければ幸いです。</p>
      </section>
      <section className={styles.growthMechanism} aria-labelledby="growth-mechanism-title">
        <p className={styles.explanationSectionLabel}>ゲームのしくみ</p>
        <h3 id="growth-mechanism-title">花の長さは、どう決まる？</h3>
        <p>水の量と肥料で決まる平均成長量に、1本ごとの個体差を足します。おためしも本番も同じ計算です。計算結果が負なら0cmにし、上限は設けていません。</p>
        <MathFormula tex={String.raw`\ell = \max(0,\,\mu + \varepsilon)`} />
        <p><MathFormula inline tex={String.raw`\ell`} /> は花の長さ、<MathFormula inline tex={String.raw`\mu`} /> は平均成長量、<MathFormula inline tex={String.raw`\varepsilon`} /> は個体差です。0cmになった花も記録と平均に含め、100cmを超えた結果もそのまま残します。</p>

        <h4>水と肥料から、平均成長量を計算する</h4>
        <p>水量を範囲の下端で0、上端で1になる値 <MathFormula inline tex="x" /> に換算します。肥料ごとの適量を <MathFormula inline tex="o" />、育ちやすい幅を <MathFormula inline tex="w" /> とすると、平均成長量は次の式です。</p>
        <MathFormula tex={String.raw`\mu = P + b - ${config.model.falloff}\left(\frac{|x-o|}{w}\right)^{p}`} />
        <ul className={styles.modelParameters}>
          <li><MathFormula inline tex="P" /> は基本のピーク（現在は{config.model.peakRange[0]}cm）。<MathFormula inline tex="b" /> は肥料による補正です。最良の選択肢は補正0、それ以外は{config.model.nonFavoredPenaltyRange.join('〜')}cm低くなります。水だけが最良の場合もあります。</li>
          <li><MathFormula inline tex="o" /> は基本の適量に肥料ごとのずれを足した値、<MathFormula inline tex="w" /> は基本の幅に肥料の倍率を掛けた値です。水が多すぎる側の幅を狭くする場合もあります。</li>
          <li><MathFormula inline tex="p" /> は2または4。4では頂上付近が平らになり、2では丸い山になります。</li>
        </ul>
        <p>新しいゲームごとに、適量・育ちやすい幅・肥料との相性・山の形を抽選します。広い範囲で育つ山、適量の周辺だけよく育つ山、水が多すぎる側で急に育ちにくくなる山があり、ゲームの途中では変わりません。</p>

        <h4>正規分布から、個体差を加える</h4>
        <p>個体差は平均0、標準偏差 <MathFormula inline tex={`\\sigma = ${config.standardDeviation}`} /> cmの正規分布に従います。同じ条件でも長さが違うのはこのためです。</p>
        <MathFormula tex={String.raw`\varepsilon \sim \mathcal{N}(0,\,\sigma^{2})`} />
        <p>実際には、0以上1未満の一様乱数 <MathFormula inline tex="u_1, u_2" /> から、Box–Muller法で標準正規乱数を作り、標準偏差を掛けています。</p>
        <MathFormula tex={String.raw`\begin{aligned} z &= \sqrt{-2\ln(1-u_1)}\,\cos(2\pi u_2) \\ \varepsilon &= \sigma z \end{aligned}`} />
        <p><MathFormula inline tex={String.raw`\mu`} /> は負の値を0cmにする前の平均です。0cm付近ではこの補正により、観測される平均と <MathFormula inline tex={String.raw`\mu`} /> は一致しないことがあります。</p>

        <h4>表示された長さを、得点にする</h4>
        <p>本番は各花の長さを小数第{config.scoreDecimals}位に丸め、その表示値を合計して得点にします。花の見た目や紙吹雪による加点はありません。</p>
        <p className={styles.explanationNote}>花の育ち方は、学びのために単純化したゲーム用のモデルです。実際の栽培方法を示すものではありません。</p>
      </section>
      <button className={styles.primaryButton} onClick={() => dialogRef.current.close()}>ゲームに戻る</button>
    </div>
  </dialog>;
}
