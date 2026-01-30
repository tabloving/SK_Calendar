import { PreceptLevel } from '@/types'
import { EXPLANATION_MAP, BASE_SUGGESTIONS } from '@/data/precept/precept-config'

/**
 * 获取解释说明
 */
export function getExplanation(reason: string): string {
  for (const [key, value] of Object.entries(EXPLANATION_MAP)) {
    if (reason.includes(key)) return value
  }
  return '传统戒期，应持戒清净，避免不当行为'
}

/**
 * 获取诞辰解释
 */
export function getBirthExplanation(text: string): string {
  if (text.includes('佛')) return '诸佛菩萨诞辰日，功德殊胜，应持戒清净，广修善业'
  if (text.includes('玉帝') || text.includes('玉皇')) return '玉帝诞辰，天神庆祝，应持戒祈福'
  if (text.includes('孔子')) return '至圣先师诞辰，应持戒恭敬，修习智慧'
  return '神明诞辰日，应持戒清净，可诵经礼忏，积德行善'
}

/**
 * 获取降世解释
 */
export function getDescentExplanation(text: string): string {
  if (text.includes('三元')) return '三元之神（天官赐福、地官赦罪、水官解厄）下降，校世人善恶'
  if (text.includes('斗')) return '斗星君下降，监察世人行为，记录善恶功过'
  return '神明降世之日，应虔诚持戒，可诵经祈福'
}

/**
 * 获取修行建议
 */
export function getSuggestion(reason: string, level: PreceptLevel): string {
  // 特殊日期的专门建议
  if (reason.includes('释迦如来成道日')) {
    return '成道日应严格持戒，可礼佛诵经、持诵《金刚经》《心经》等经典，食用腊八粥以纪念佛陀成道，广修善业，发菩提心'
  }

  let suggestion = BASE_SUGGESTIONS[level]

  // 根据具体原因添加建议
  if (reason.includes('四天王')) {
    suggestion += '，可念诵四天王名号或持诵相关经咒'
  }
  if (reason.includes('佛') || reason.includes('菩萨')) {
    suggestion += '，可持诵佛号或菩萨圣号，修行布施等善业'
  }
  if (reason.includes('雷斋')) {
    suggestion += '，宜食素斋，避免杀生，可诵雷尊经咒'
  }

  return suggestion
}

/**
 * 获取节气解释说明
 */
export function getSolarTermExplanation(solarTerm: string): string {
  const explanations: Record<string, string> = {
    '春分': '春分日雷将发声，天地阴阳二气开始激烈交战，此日犯戒会影响后代健康，给父母带来灾祸。宜从惊蛰节禁起，戒过一月',
    '秋分': '秋分日杀气浸盛，阳气逐渐衰退，阴气渐长，此日犯戒会严重损害身体健康。宜从白露节禁起，戒过一月',
    '夏至': '夏至日阴阳相争，是死生分判的关键时刻，此日犯戒会招致急重疾病。宜从芒种节禁起，戒过一月',
    '冬至': '冬至日阴阳相争，是死生分判的关键时刻，此日犯戒会招致急重疾病。冬至半夜子时犯之，并冬至后庚辛日，及第三戌日犯之，皆主在一年内亡。宜从大雪节禁起，戒过一月',
    '立春': '立春是二十四节气之首，春季的开始，天地阳气初生，万物复苏。此日犯戒会严重影响寿命，减寿五年',
    '立夏': '立夏是夏季的开始，天地阳气旺盛，万物生长茂盛。此日犯戒会严重影响寿命，减寿五年',
    '立秋': '立秋是秋季的开始，天地阳气渐收，阴气渐长。此日犯戒会严重影响寿命，减寿五年',
    '立冬': '立冬是冬季的开始，天地阳气潜藏，阴气盛极。此日犯戒会严重影响寿命，减寿五年'
  }
  return explanations[solarTerm] || '节气日是天地阴阳二气交战的关键时刻，应严格持戒'
}

/**
 * 获取节气修行建议
 */
export function getSolarTermSuggestion(solarTerm: string): string {
  const suggestions: Record<string, string> = {
    '春分': '春分前应从惊蛰节开始禁戒，持戒一个月，可诵经礼佛，修身养性，避免雷震之灾',
    '秋分': '秋分前应从白露节开始禁戒，持戒一个月，可诵经礼佛，收敛心神，顺应天时',
    '夏至': '夏至今应从芒种节开始禁戒，持戒一个月，可静坐养心，避免阴阳失调',
    '冬至': '冬至今应从大雪节开始禁戒，持戒一个月，可静坐养心，潜藏阳气',
    '立春': '立春是二十四节气之首，春季的开始，犯之减寿五年，应严格持戒',
    '立夏': '立夏是夏季的开始，犯之减寿五年，应严格持戒',
    '立秋': '立秋是秋季的开始，犯之减寿五年，应严格持戒',
    '立冬': '立冬是冬季的开始，犯之减寿五年，应严格持戒'
  }
  return suggestions[solarTerm] || '应严格持戒，可诵经礼佛，修身养性，顺应天时'
}
