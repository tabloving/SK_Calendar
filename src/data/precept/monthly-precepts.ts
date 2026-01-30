import { PreceptLevel } from '@/types'

/**
 * 月度戒期原始数据
 * 数据结构：月份 -> 日期 -> 戒期原因列表
 */
export interface MonthlyPreceptReason {
  reason: string
  level: PreceptLevel
}

export type MonthlyPreceptData = Record<number, Record<number, MonthlyPreceptReason[]>>

/**
 * 获取所有月度戒期数据
 */
export function getMonthlyPreceptData(): MonthlyPreceptData {
  return {
    // 正月戒期
    1: {
      1: [
        { reason: '玉帝校世人神气禄命，犯者削禄夺纪', level: PreceptLevel.MAJOR },
        { reason: '月朔，犯者夺纪', level: PreceptLevel.MAJOR },
        { reason: '天腊', level: PreceptLevel.MAJOR }
      ],
      3: [
        { reason: '斗降，犯者夺纪', level: PreceptLevel.MAJOR },
        { reason: '万神都会，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      5: [
        { reason: '五虚忌', level: PreceptLevel.MODERATE }
      ],
      6: [
        { reason: '雷斋日，犯者减寿', level: PreceptLevel.MODERATE },
        { reason: '六耗忌', level: PreceptLevel.MODERATE }
      ],
      7: [
        { reason: '上会日，犯者损寿', level: PreceptLevel.MODERATE }
      ],
      8: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE },
        { reason: '五殿阎罗天子诞，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      9: [
        { reason: '玉皇上帝诞，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      13: [
        { reason: '杨公忌', level: PreceptLevel.MAJOR }
      ],
      14: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE },
        { reason: '三元降，犯者减寿', level: PreceptLevel.MODERATE }
      ],
      15: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE },
        { reason: '三元降，犯者损寿', level: PreceptLevel.MODERATE },
        { reason: '上元神会，犯者夺纪', level: PreceptLevel.MAJOR },
        { reason: '月望，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      16: [
        { reason: '三元降，犯者减寿', level: PreceptLevel.MODERATE }
      ],
      19: [
        { reason: '长春真人诞', level: PreceptLevel.MODERATE }
      ],
      23: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE },
        { reason: '三尸神奏事', level: PreceptLevel.MODERATE }
      ],
      25: [
        { reason: '天地仓开日，犯者损寿，子带疾', level: PreceptLevel.MODERATE }
      ],
      27: [
        { reason: '斗降，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      28: [
        { reason: '人神在阴，犯者得病', level: PreceptLevel.MODERATE }
      ],
      29: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ],
      30: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ]
    },

    // 二月戒期
    2: {
      1: [
        { reason: '月朔，犯者夺纪', level: PreceptLevel.MAJOR },
        { reason: '一殿秦广王诞，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      2: [
        { reason: '福德土地正神诞，犯者得祸', level: PreceptLevel.MODERATE },
        { reason: '万神都会，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      3: [
        { reason: '文昌帝君诞，犯者削禄夺纪', level: PreceptLevel.MAJOR },
        { reason: '斗降，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      6: [
        { reason: '雷斋日，犯者减寿', level: PreceptLevel.MODERATE },
        { reason: '东华帝君诞', level: PreceptLevel.MODERATE }
      ],
      8: [
        { reason: '释迦牟尼佛出家，三殿宋帝王诞，犯者夺纪', level: PreceptLevel.MAJOR },
        { reason: '张大帝诞', level: PreceptLevel.MAJOR },
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ],
      11: [
        { reason: '杨公忌', level: PreceptLevel.MAJOR }
      ],
      14: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ],
      15: [
        { reason: '释迦牟尼佛般涅槃，犯者夺纪', level: PreceptLevel.MAJOR },
        { reason: '太上老君诞，犯者削禄夺纪', level: PreceptLevel.MAJOR },
        { reason: '四天王巡行', level: PreceptLevel.MODERATE },
        { reason: '月望', level: PreceptLevel.MAJOR }
      ],
      17: [
        { reason: '东方杜将军诞', level: PreceptLevel.MODERATE }
      ],
      18: [
        { reason: '四殿五官王诞', level: PreceptLevel.MAJOR },
        { reason: '至圣先师孔子讳辰，犯者削禄夺纪', level: PreceptLevel.MAJOR }
      ],
      19: [
        { reason: '观音大士诞，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      21: [
        { reason: '普贤菩萨诞，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      23: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ],
      27: [
        { reason: '斗降，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      28: [
        { reason: '人神在阴，犯者得病', level: PreceptLevel.MODERATE }
      ],
      29: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ],
      30: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ]
    },

    // 三月戒期
    3: {
      1: [
        { reason: '二殿楚江王诞，犯者夺纪', level: PreceptLevel.MAJOR },
        { reason: '月朔，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      3: [
        { reason: '玄天上帝诞，犯者夺纪', level: PreceptLevel.MAJOR },
        { reason: '斗降，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      6: [
        { reason: '雷斋日，犯者减寿', level: PreceptLevel.MODERATE }
      ],
      8: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE },
        { reason: '六殿卞城王诞，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      9: [
        { reason: '牛鬼神出，犯者产恶胎', level: PreceptLevel.MAJOR },
        { reason: '杨公忌', level: PreceptLevel.MAJOR }
      ],
      12: [
        { reason: '中央五道诞', level: PreceptLevel.MODERATE }
      ],
      14: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ],
      15: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE },
        { reason: '月望', level: PreceptLevel.MAJOR },
        { reason: '昊天上帝诞，犯者夺纪', level: PreceptLevel.MAJOR },
        { reason: '玄坛诞，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      16: [
        { reason: '准提菩萨诞，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      18: [
        { reason: '中岳大帝诞', level: PreceptLevel.MODERATE },
        { reason: '后土娘娘诞', level: PreceptLevel.MODERATE },
        { reason: '三茅降', level: PreceptLevel.MODERATE }
      ],
      20: [
        { reason: '天地仓开日，犯者损寿', level: PreceptLevel.MODERATE },
        { reason: '子孙娘娘诞', level: PreceptLevel.MODERATE }
      ],
      23: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ],
      27: [
        { reason: '斗降，犯者夺纪', level: PreceptLevel.MAJOR },
        { reason: '七殿泰山王诞，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      28: [
        { reason: '东岳大帝诞', level: PreceptLevel.MAJOR },
        { reason: '人神在阴，犯者得病', level: PreceptLevel.MODERATE },
        { reason: '苍颉至圣先师诞，犯者削禄夺纪', level: PreceptLevel.MAJOR }
      ],
      29: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ],
      30: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ]
    },

    // 四月戒期
    4: {
      1: [
        { reason: '月朔，犯者夺纪', level: PreceptLevel.MAJOR },
        { reason: '八殿都市王诞，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      3: [
        { reason: '斗降，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      4: [
        { reason: '文殊菩萨诞，犯者夺纪', level: PreceptLevel.MAJOR },
        { reason: '万神善化，犯者失瘏夭胎', level: PreceptLevel.MAJOR }
      ],
      6: [
        { reason: '雷斋日，犯者减寿', level: PreceptLevel.MODERATE }
      ],
      7: [
        { reason: '南斗、北斗、西斗同降，犯者减寿', level: PreceptLevel.MODERATE },
        { reason: '杨公忌', level: PreceptLevel.MAJOR }
      ],
      8: [
        { reason: '释迦牟尼佛诞，犯者夺纪', level: PreceptLevel.MAJOR },
        { reason: '九殿平等王诞', level: PreceptLevel.MAJOR },
        { reason: '四天王巡行', level: PreceptLevel.MODERATE },
        { reason: '万神善化，犯者失瘏夭胎', level: PreceptLevel.MAJOR },
        { reason: '善恶童子降，犯者血死', level: PreceptLevel.MAJOR }
      ],
      14: [
        { reason: '纯阳祖师诞，犯者减寿', level: PreceptLevel.MODERATE },
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ],
      15: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE },
        { reason: '月望，钟离祖师诞，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      16: [
        { reason: '天地仓开日，犯者损寿', level: PreceptLevel.MODERATE }
      ],
      17: [
        { reason: '十殿转轮王诞，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      18: [
        { reason: '紫微大帝诞，犯者减寿', level: PreceptLevel.MODERATE },
        { reason: '天地仓开日，犯者损寿', level: PreceptLevel.MODERATE }
      ],
      20: [
        { reason: '眼光圣母诞', level: PreceptLevel.MODERATE }
      ],
      23: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ],
      27: [
        { reason: '斗降，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      28: [
        { reason: '人神在阴，犯者得病', level: PreceptLevel.MODERATE }
      ],
      29: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ],
      30: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ]
    },

    // 五月戒期（宜全戒）
    5: {
      1: [
        { reason: '月朔，犯者夺纪', level: PreceptLevel.MAJOR },
        { reason: '南极长生大帝诞，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      3: [
        { reason: '斗降，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      5: [
        { reason: '五帝校定生人官爵，犯者削禄夺纪', level: PreceptLevel.MAJOR },
        { reason: '九毒日，犯者夭亡，奇祸不测', level: PreceptLevel.MAJOR },
        { reason: '地腊', level: PreceptLevel.MAJOR },
        { reason: '杨公忌', level: PreceptLevel.MAJOR }
      ],
      6: [
        { reason: '雷斋日', level: PreceptLevel.MODERATE },
        { reason: '九毒日，犯者夭亡奇祸不测', level: PreceptLevel.MAJOR }
      ],
      7: [
        { reason: '九毒日，犯者夭亡，奇祸不测', level: PreceptLevel.MAJOR }
      ],
      8: [
        { reason: '南方五道诞', level: PreceptLevel.MODERATE },
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ],
      11: [
        { reason: '天仓开日，犯者损寿', level: PreceptLevel.MODERATE },
        { reason: '天下都城隍诞', level: PreceptLevel.MODERATE }
      ],
      12: [
        { reason: '炳灵公诞', level: PreceptLevel.MODERATE }
      ],
      13: [
        { reason: '关圣降神，犯者削禄夺纪', level: PreceptLevel.MAJOR }
      ],
      14: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE },
        { reason: '天地交泰，犯者三年内夫妇俱亡', level: PreceptLevel.MAJOR }
      ],
      15: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE },
        { reason: '月望', level: PreceptLevel.MAJOR },
        { reason: '九毒日，犯者夭亡，奇祸不测', level: PreceptLevel.MAJOR }
      ],
      16: [
        { reason: '天地元气造化万物之辰，犯者三年内夫妇俱亡', level: PreceptLevel.MAJOR },
        { reason: '九毒日', level: PreceptLevel.MAJOR }
      ],
      17: [
        { reason: '九毒日，犯者夭亡奇祸不测', level: PreceptLevel.MAJOR }
      ],
      18: [
        { reason: '张天师诞', level: PreceptLevel.MODERATE }
      ],
      22: [
        { reason: '孝娥神诞，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      23: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ],
      25: [
        { reason: '九毒日，犯者夭亡，奇祸不测', level: PreceptLevel.MAJOR }
      ],
      26: [
        { reason: '九毒日，犯者夭亡，奇祸不测', level: PreceptLevel.MAJOR }
      ],
      27: [
        { reason: '斗降，犯者夺纪', level: PreceptLevel.MAJOR },
        { reason: '九毒日，犯者夭亡，奇祸不测', level: PreceptLevel.MAJOR }
      ],
      28: [
        { reason: '人神在阴，犯者得病', level: PreceptLevel.MODERATE }
      ],
      29: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ],
      30: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ]
    },

    // 六月戒期
    6: {
      1: [
        { reason: '月朔，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      3: [
        { reason: '斗降，犯者夺纪', level: PreceptLevel.MAJOR },
        { reason: '杨公忌', level: PreceptLevel.MAJOR }
      ],
      4: [
        { reason: '南赡部洲转大法轮，犯者损寿', level: PreceptLevel.MODERATE }
      ],
      6: [
        { reason: '雷斋日，犯者损寿', level: PreceptLevel.MODERATE },
        { reason: '天仓开日，犯者损寿', level: PreceptLevel.MODERATE }
      ],
      8: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ],
      10: [
        { reason: '金粟如来诞，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      13: [
        { reason: '井泉龙王诞', level: PreceptLevel.MODERATE }
      ],
      14: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ],
      15: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE },
        { reason: '月望，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      19: [
        { reason: '观音大士涅槃，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      23: [
        { reason: '南方火神诞，犯者遭回禄', level: PreceptLevel.MAJOR },
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ],
      24: [
        { reason: '雷祖诞', level: PreceptLevel.MODERATE },
        { reason: '关帝诞，犯者削禄夺纪', level: PreceptLevel.MAJOR }
      ],
      27: [
        { reason: '斗降，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      28: [
        { reason: '人神在阴，犯者得病', level: PreceptLevel.MODERATE }
      ],
      29: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ],
      30: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ]
    },

    // 七月戒期
    7: {
      1: [
        { reason: '月朔，犯者夺纪', level: PreceptLevel.MAJOR },
        { reason: '杨公忌', level: PreceptLevel.MAJOR }
      ],
      3: [
        { reason: '斗降，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      5: [
        { reason: '中会日，犯者损寿', level: PreceptLevel.MODERATE }
      ],
      6: [
        { reason: '雷斋日，犯者减寿', level: PreceptLevel.MODERATE }
      ],
      7: [
        { reason: '五帝校生人善恶', level: PreceptLevel.MODERATE },
        { reason: '道德腊', level: PreceptLevel.MODERATE },
        { reason: '魁星诞，犯者削禄夺纪', level: PreceptLevel.MAJOR }
      ],
      8: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ],
      10: [
        { reason: '阴毒日，大忌', level: PreceptLevel.MAJOR }
      ],
      12: [
        { reason: '长真谭真人诞', level: PreceptLevel.MODERATE }
      ],
      13: [
        { reason: '大势至菩萨诞，犯者减寿', level: PreceptLevel.MAJOR }
      ],
      14: [
        { reason: '三元降，犯者减寿', level: PreceptLevel.MODERATE },
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ],
      15: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE },
        { reason: '三元降', level: PreceptLevel.MODERATE },
        { reason: '地官校籍，犯者夺纪', level: PreceptLevel.MAJOR },
        { reason: '月望', level: PreceptLevel.MAJOR }
      ],
      16: [
        { reason: '三元降，犯者减寿', level: PreceptLevel.MODERATE }
      ],
      18: [
        { reason: '西王母诞，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      19: [
        { reason: '太岁诞，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      22: [
        { reason: '增福财神诞，犯者削禄夺纪', level: PreceptLevel.MAJOR }
      ],
      23: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ],
      27: [
        { reason: '斗降，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      28: [
        { reason: '人神在阴，犯者得病', level: PreceptLevel.MODERATE }
      ],
      29: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE },
        { reason: '杨公忌', level: PreceptLevel.MAJOR }
      ],
      30: [
        { reason: '地藏菩萨诞，犯者夺纪', level: PreceptLevel.MAJOR },
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ]
    },

    // 八月戒期
    8: {
      1: [
        { reason: '月朔，犯者夺纪', level: PreceptLevel.MAJOR },
        { reason: '许真君诞', level: PreceptLevel.MAJOR }
      ],
      3: [
        { reason: '斗降，犯者夺纪', level: PreceptLevel.MAJOR },
        { reason: '北斗诞，犯者削禄夺纪', level: PreceptLevel.MAJOR },
        { reason: '司命灶君诞，犯者遭回禄', level: PreceptLevel.MAJOR }
      ],
      5: [
        { reason: '雷声大帝诞，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      6: [
        { reason: '雷斋日，犯者减寿', level: PreceptLevel.MODERATE }
      ],
      8: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ],
      10: [
        { reason: '北斗大帝诞', level: PreceptLevel.MAJOR }
      ],
      12: [
        { reason: '西方五道诞', level: PreceptLevel.MODERATE }
      ],
      14: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ],
      15: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE },
        { reason: '月望', level: PreceptLevel.MAJOR },
        { reason: '太阴朝元，宜焚香守夜，犯者暴亡', level: PreceptLevel.MAJOR }
      ],
      16: [
        { reason: '天曹掠刷真君降，犯者贫夭', level: PreceptLevel.MAJOR }
      ],
      18: [
        { reason: '天人兴福之辰，宜斋戒，存想吉事', level: PreceptLevel.MODERATE }
      ],
      23: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE },
        { reason: '汉桓侯张显王诞', level: PreceptLevel.MODERATE }
      ],
      24: [
        { reason: '灶君夫人诞', level: PreceptLevel.MODERATE }
      ],
      27: [
        { reason: '斗降，犯者夺纪', level: PreceptLevel.MAJOR },
        { reason: '至圣先师孔子诞，削禄夺纪', level: PreceptLevel.MAJOR },
        { reason: '杨公忌', level: PreceptLevel.MAJOR }
      ],
      28: [
        { reason: '人神在阴，犯者得病', level: PreceptLevel.MODERATE },
        { reason: '四天会事', level: PreceptLevel.MODERATE }
      ],
      29: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ],
      30: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE },
        { reason: '诸神考校夺算', level: PreceptLevel.MAJOR }
      ]
    },

    // 九月戒期
    9: {
      1: [
        { reason: '月朔，犯者夺纪', level: PreceptLevel.MAJOR },
        { reason: '南斗诞，犯者削禄夺纪', level: PreceptLevel.MAJOR },
        { reason: '北斗九星降，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      3: [
        { reason: '五瘟神诞', level: PreceptLevel.MODERATE }
      ],
      6: [
        { reason: '雷斋日，犯者减寿', level: PreceptLevel.MODERATE }
      ],
      8: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ],
      9: [
        { reason: '斗母诞，犯者削禄夺纪', level: PreceptLevel.MAJOR },
        { reason: '酆都大帝诞', level: PreceptLevel.MAJOR },
        { reason: '玄天上帝飞升', level: PreceptLevel.MAJOR }
      ],
      10: [
        { reason: '斗母降，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      11: [
        { reason: '宜戒', level: PreceptLevel.MINOR }
      ],
      13: [
        { reason: '孟婆尊神诞', level: PreceptLevel.MODERATE }
      ],
      14: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ],
      15: [
        { reason: '月望，犯者夺纪', level: PreceptLevel.MAJOR },
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ],
      17: [
        { reason: '金龙四大王诞，犯者水厄', level: PreceptLevel.MAJOR }
      ],
      19: [
        { reason: '观世音菩萨出家日，犯者减寿', level: PreceptLevel.MAJOR },
        { reason: '日宫月宫会合', level: PreceptLevel.MODERATE }
      ],
      23: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ],
      25: [
        { reason: '杨公忌', level: PreceptLevel.MAJOR }
      ],
      27: [
        { reason: '斗降，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      28: [
        { reason: '人神在阴，犯者得病', level: PreceptLevel.MODERATE }
      ],
      29: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ],
      30: [
        { reason: '药师琉璃光佛诞，犯者得危疾', level: PreceptLevel.MAJOR },
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ]
    },

    // 十月戒期
    10: {
      1: [
        { reason: '四天王降，犯者一年内死', level: PreceptLevel.MAJOR },
        { reason: '月朔，犯者夺纪', level: PreceptLevel.MAJOR },
        { reason: '民岁腊，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      3: [
        { reason: '斗降，犯者夺纪', level: PreceptLevel.MAJOR },
        { reason: '三茅诞，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      5: [
        { reason: '达摩祖师诞', level: PreceptLevel.MODERATE },
        { reason: '下会日，犯者损寿', level: PreceptLevel.MODERATE }
      ],
      6: [
        { reason: '雷斋日，犯者减寿', level: PreceptLevel.MODERATE },
        { reason: '天曹考察，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      8: [
        { reason: '佛涅槃日，大忌色欲', level: PreceptLevel.MAJOR },
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ],
      10: [
        { reason: '四天王降，犯者一年内死', level: PreceptLevel.MAJOR }
      ],
      11: [
        { reason: '宜戒', level: PreceptLevel.MINOR }
      ],
      14: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE },
        { reason: '三元降，犯者减寿', level: PreceptLevel.MODERATE }
      ],
      15: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE },
        { reason: '三元降', level: PreceptLevel.MODERATE },
        { reason: '下元水府校籍，犯者夺纪', level: PreceptLevel.MAJOR },
        { reason: '月望', level: PreceptLevel.MAJOR }
      ],
      16: [
        { reason: '三元降，犯者减寿', level: PreceptLevel.MODERATE }
      ],
      23: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE },
        { reason: '杨公忌', level: PreceptLevel.MAJOR }
      ],
      27: [
        { reason: '北极紫薇大帝降', level: PreceptLevel.MAJOR },
        { reason: '斗降，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      28: [
        { reason: '人神在阴，犯者得病', level: PreceptLevel.MODERATE }
      ],
      29: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ],
      30: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ]
    },

    // 十一月戒期
    11: {
      1: [
        { reason: '月朔，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      3: [
        { reason: '斗降，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      4: [
        { reason: '至圣先师孔子诞，犯者削禄夺纪', level: PreceptLevel.MAJOR }
      ],
      6: [
        { reason: '雷斋日，犯者减寿', level: PreceptLevel.MODERATE },
        { reason: '西岳大帝诞', level: PreceptLevel.MODERATE }
      ],
      8: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ],
      11: [
        { reason: '太乙救苦天尊诞，犯者夺纪', level: PreceptLevel.MAJOR },
        { reason: '天仓开日，犯者损寿', level: PreceptLevel.MODERATE }
      ],
      14: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ],
      15: [
        { reason: '月望', level: PreceptLevel.MAJOR },
        { reason: '四天王巡行，上半夜犯男死，下半夜犯女死', level: PreceptLevel.MAJOR }
      ],
      17: [
        { reason: '阿弥陀佛诞，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      19: [
        { reason: '太阳日宫诞，犯者奇祸', level: PreceptLevel.MAJOR }
      ],
      21: [
        { reason: '杨公忌', level: PreceptLevel.MAJOR }
      ],
      23: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE },
        { reason: '张仙诞，犯者绝嗣', level: PreceptLevel.MAJOR }
      ],
      25: [
        { reason: '掠刷大夫降，犯者大凶', level: PreceptLevel.MAJOR }
      ],
      26: [
        { reason: '北方五道诞', level: PreceptLevel.MODERATE }
      ],
      27: [
        { reason: '斗降，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      28: [
        { reason: '人神在阴，犯者得病', level: PreceptLevel.MODERATE }
      ],
      29: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ],
      30: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ]
    },

    // 十二月戒期
    12: {
      1: [
        { reason: '月朔，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      3: [
        { reason: '斗降，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      6: [
        { reason: '雷斋日，犯者减寿', level: PreceptLevel.MODERATE },
        { reason: '天仓开日，犯者损寿', level: PreceptLevel.MODERATE }
      ],
      7: [
        { reason: '掠刷大夫降，犯者得恶疾', level: PreceptLevel.MAJOR }
      ],
      8: [
        { reason: '释迦如来成道日，犯者夺纪', level: PreceptLevel.MAJOR },
        { reason: '四天王巡行', level: PreceptLevel.MODERATE },
        { reason: '王侯腊，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      12: [
        { reason: '太素三元君朝真', level: PreceptLevel.MODERATE }
      ],
      14: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ],
      15: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE },
        { reason: '月望，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      16: [
        { reason: '南岳大帝诞', level: PreceptLevel.MODERATE }
      ],
      19: [
        { reason: '杨公忌', level: PreceptLevel.MAJOR }
      ],
      20: [
        { reason: '天地交道促寿', level: PreceptLevel.MAJOR }
      ],
      21: [
        { reason: '天猷上帝诞', level: PreceptLevel.MODERATE }
      ],
      23: [
        { reason: '四天王巡行', level: PreceptLevel.MODERATE },
        { reason: '五岳神降', level: PreceptLevel.MODERATE }
      ],
      24: [
        { reason: '司命朝天奏人善恶，犯者大祸', level: PreceptLevel.MAJOR }
      ],
      25: [
        { reason: '三清玉帝同降，考察善恶，犯者奇祸', level: PreceptLevel.MAJOR }
      ],
      27: [
        { reason: '斗降，犯者夺纪', level: PreceptLevel.MAJOR }
      ],
      28: [
        { reason: '人神在阴，犯者得病', level: PreceptLevel.MODERATE }
      ],
      29: [
        { reason: '华严菩萨诞，犯者夺纪', level: PreceptLevel.MAJOR },
        { reason: '四天王巡行', level: PreceptLevel.MODERATE }
      ],
      30: [
        { reason: '诸神下降，察访善恶，犯者男女俱亡', level: PreceptLevel.MAJOR }
      ]
    }
  }
}
