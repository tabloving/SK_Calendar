import type { PreceptInfo, PreceptLevel, PreceptType } from '@/types'

/**
 * 戒期数据管理类
 */
export class PreceptDataManager {
  private static instance: PreceptDataManager
  private monthlyPrecepts: Map<string, PreceptInfo[]> = new Map()
  private specialPrecepts: Map<string, PreceptInfo[]> = new Map()

  private constructor() {
    this.initializePreceptData()
  }

  public static getInstance(): PreceptDataManager {
    if (!PreceptDataManager.instance) {
      PreceptDataManager.instance = new PreceptDataManager()
    }
    return PreceptDataManager.instance
  }

  /**
   * 初始化戒期数据
   */
  private initializePreceptData(): void {
    this.initMonthlyPrecepts()
    this.initSpecialPrecepts()
  }

  /**
   * 初始化每月固定戒期
   */
  private initMonthlyPrecepts(): void {
    // 正月戒期
    this.addMonthPrecepts(1, 1, [
      { reason: '玉帝校世人神气禄命，犯者削禄夺纪', level: 'major' as PreceptLevel },
      { reason: '月朔，犯者夺纪', level: 'major' as PreceptLevel },
      { reason: '天腊', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(1, 3, [
      { reason: '斗降，犯者夺纪', level: 'major' as PreceptLevel },
      { reason: '万神都会，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(1, 5, [
      { reason: '五虚忌', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(1, 6, [
      { reason: '雷斋日，犯者减寿', level: 'moderate' as PreceptLevel },
      { reason: '六耗忌', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(1, 7, [
      { reason: '上会日，犯者损寿', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(1, 8, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel },
      { reason: '五殿阎罗天子诞，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(1, 9, [
      { reason: '玉皇上帝诞，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(1, 13, [
      { reason: '杨公忌', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(1, 14, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel },
      { reason: '三元降，犯者减寿', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(1, 15, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel },
      { reason: '三元降，犯者损寿', level: 'moderate' as PreceptLevel },
      { reason: '上元神会，犯者夺纪', level: 'major' as PreceptLevel },
      { reason: '月望，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(1, 16, [
      { reason: '三元降，犯者减寿', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(1, 19, [
      { reason: '长春真人诞', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(1, 23, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel },
      { reason: '三尸神奏事', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(1, 25, [
      { reason: '天地仓开日，犯者损寿，子带疾', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(1, 27, [
      { reason: '斗降，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(1, 28, [
      { reason: '人神在阴，犯者得病', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(1, 29, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(1, 30, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel },
      { reason: '司命奏事，犯者减寿', level: 'moderate' as PreceptLevel },
      { reason: '月晦日，犯者减寿', level: 'moderate' as PreceptLevel }
    ])

    // 二月戒期
    this.addMonthPrecepts(2, 1, [
      { reason: '月朔，一殿秦广王诞，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(2, 2, [
      { reason: '福德土地正神诞，犯者得祸', level: 'moderate' as PreceptLevel },
      { reason: '万神都会，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(2, 3, [
      { reason: '文昌帝君诞，犯者削禄夺纪', level: 'major' as PreceptLevel },
      { reason: '斗降', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(2, 6, [
      { reason: '雷斋日，犯者减寿', level: 'moderate' as PreceptLevel },
      { reason: '东华帝君诞', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(2, 8, [
      { reason: '释迦牟尼佛出家，三殿宋帝王诞，犯者夺纪', level: 'major' as PreceptLevel },
      { reason: '张大帝诞', level: 'major' as PreceptLevel },
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(2, 11, [
      { reason: '杨公忌', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(2, 14, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(2, 15, [
      { reason: '释迦牟尼佛般涅槃', level: 'major' as PreceptLevel },
      { reason: '太上老君诞，犯者削禄夺纪', level: 'major' as PreceptLevel },
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel },
      { reason: '月望', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(2, 17, [
      { reason: '东方杜将军诞', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(2, 18, [
      { reason: '四殿五官王诞', level: 'major' as PreceptLevel },
      { reason: '至圣先师孔子讳辰，犯者削禄夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(2, 19, [
      { reason: '观音大士诞，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(2, 21, [
      { reason: '普贤菩萨诞', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(2, 23, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(2, 27, [
      { reason: '斗降，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(2, 28, [
      { reason: '人神在阴，犯者得病', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(2, 29, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(2, 30, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel },
      { reason: '司命奏事，犯者减寿', level: 'moderate' as PreceptLevel },
      { reason: '月晦日，犯者减寿', level: 'moderate' as PreceptLevel }
    ])

    // 三月戒期
    this.addMonthPrecepts(3, 1, [
      { reason: '二殿楚江王诞，犯者夺纪', level: 'major' as PreceptLevel },
      { reason: '月朔', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(3, 3, [
      { reason: '玄天上帝诞，犯者夺纪', level: 'major' as PreceptLevel },
      { reason: '斗降', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(3, 6, [
      { reason: '雷斋日，犯者减寿', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(3, 8, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel },
      { reason: '六殿卞城王诞，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(3, 9, [
      { reason: '牛鬼神出，犯者产恶胎', level: 'major' as PreceptLevel },
      { reason: '杨公忌', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(3, 12, [
      { reason: '中央五道诞', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(3, 14, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(3, 15, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel },
      { reason: '月望，昊天上帝诞，玄坛诞，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(3, 16, [
      { reason: '准提菩萨诞，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(3, 18, [
      { reason: '中岳大帝诞', level: 'moderate' as PreceptLevel },
      { reason: '后土娘娘诞', level: 'moderate' as PreceptLevel },
      { reason: '三茅降', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(3, 20, [
      { reason: '天地仓开日，犯者损寿', level: 'moderate' as PreceptLevel },
      { reason: '子孙娘娘诞', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(3, 23, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(3, 27, [
      { reason: '斗降', level: 'major' as PreceptLevel },
      { reason: '七殿泰山王诞，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(3, 28, [
      { reason: '东岳大帝诞', level: 'major' as PreceptLevel },
      { reason: '人神在阴，犯者得病', level: 'moderate' as PreceptLevel },
      { reason: '苍颉至圣先师诞，犯者削禄夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(3, 29, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(3, 30, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel },
      { reason: '司命奏事，犯者减寿', level: 'moderate' as PreceptLevel },
      { reason: '月晦日，犯者减寿', level: 'moderate' as PreceptLevel }
    ])

    // 四月戒期
    this.addMonthPrecepts(4, 1, [
      { reason: '月朔', level: 'major' as PreceptLevel },
      { reason: '八殿都市王诞，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(4, 3, [
      { reason: '斗降，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(4, 4, [
      { reason: '文殊菩萨诞', level: 'moderate' as PreceptLevel },
      { reason: '万神善化，犯者失瘏夭胎', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(4, 6, [
      { reason: '雷斋日，犯者减寿', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(4, 7, [
      { reason: '南斗、北斗、西斗同降，犯者减寿', level: 'moderate' as PreceptLevel },
      { reason: '杨公忌', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(4, 8, [
      { reason: '释迦牟尼佛诞，犯者夺纪', level: 'major' as PreceptLevel },
      { reason: '九殿平等王诞', level: 'major' as PreceptLevel },
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel },
      { reason: '万神善化，犯者失瘏夭胎', level: 'major' as PreceptLevel },
      { reason: '善恶童子降，犯者血死', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(4, 14, [
      { reason: '纯阳祖师诞，犯者减寿', level: 'moderate' as PreceptLevel },
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(4, 15, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel },
      { reason: '月望，钟离祖师诞，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(4, 16, [
      { reason: '天地仓开日，犯者损寿', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(4, 17, [
      { reason: '十殿转轮王诞，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(4, 18, [
      { reason: '紫微大帝诞，犯者减寿', level: 'moderate' as PreceptLevel },
      { reason: '天地仓开日', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(4, 20, [
      { reason: '眼光圣母诞', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(4, 23, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(4, 27, [
      { reason: '斗降，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(4, 28, [
      { reason: '人神在阴，犯者得病', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(4, 29, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(4, 30, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel },
      { reason: '司命奏事，犯者减寿', level: 'moderate' as PreceptLevel },
      { reason: '月晦日，犯者减寿', level: 'moderate' as PreceptLevel }
    ])

    // 五月戒期（宜全戒）
    this.addMonthPrecepts(5, 1, [
      { reason: '月朔，南极长生大帝诞，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(5, 3, [
      { reason: '斗降，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(5, 5, [
      { reason: '五帝校定生人官爵，犯者削禄夺纪', level: 'major' as PreceptLevel },
      { reason: '九毒日，犯者夭亡，奇祸不测', level: 'major' as PreceptLevel },
      { reason: '地腊', level: 'major' as PreceptLevel },
      { reason: '杨公忌', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(5, 6, [
      { reason: '雷斋日', level: 'moderate' as PreceptLevel },
      { reason: '九毒日，犯者夭亡奇祸不测', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(5, 7, [
      { reason: '九毒日，犯者夭亡，奇祸不测', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(5, 8, [
      { reason: '南方五道诞', level: 'moderate' as PreceptLevel },
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(5, 11, [
      { reason: '天仓开日，犯者损寿', level: 'moderate' as PreceptLevel },
      { reason: '天下都城隍诞', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(5, 12, [
      { reason: '炳灵公诞', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(5, 13, [
      { reason: '关圣降神，犯者削禄夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(5, 14, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel },
      { reason: '天地交泰，犯者三年内夫妇俱亡', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(5, 15, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel },
      { reason: '月望，九毒日，犯者夭亡，奇祸不测', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(5, 16, [
      { reason: '天地元气造化万物之辰，犯者三年内夫妇俱亡', level: 'major' as PreceptLevel },
      { reason: '九毒日', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(5, 17, [
      { reason: '九毒日，犯者夭亡奇祸不测', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(5, 18, [
      { reason: '张天师诞', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(5, 22, [
      { reason: '孝娥神诞，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(5, 23, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(5, 25, [
      { reason: '九毒日，犯者夭亡，奇祸不测', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(5, 26, [
      { reason: '九毒日，犯者夭亡，奇祸不测', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(5, 27, [
      { reason: '斗降', level: 'major' as PreceptLevel },
      { reason: '九毒日，犯者夭亡，奇祸不测', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(5, 28, [
      { reason: '人神在阴，犯者得病', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(5, 29, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(5, 30, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel },
      { reason: '司命奏事，犯者减寿', level: 'moderate' as PreceptLevel },
      { reason: '月晦日，犯者减寿', level: 'moderate' as PreceptLevel }
    ])

    // 六月戒期
    this.addMonthPrecepts(6, 1, [
      { reason: '月朔，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(6, 3, [
      { reason: '斗降，犯者夺纪', level: 'major' as PreceptLevel },
      { reason: '杨公忌', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(6, 4, [
      { reason: '南赡部洲转大法轮，犯者损寿', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(6, 6, [
      { reason: '雷斋日，犯者损寿', level: 'moderate' as PreceptLevel },
      { reason: '天仓开日', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(6, 8, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(6, 10, [
      { reason: '金粟如来诞', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(6, 13, [
      { reason: '井泉龙王诞', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(6, 14, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(6, 15, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel },
      { reason: '月望，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(6, 19, [
      { reason: '观音大士涅槃，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(6, 23, [
      { reason: '南方火神诞，犯者遭回禄', level: 'major' as PreceptLevel },
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(6, 24, [
      { reason: '雷祖诞', level: 'moderate' as PreceptLevel },
      { reason: '关帝诞，犯者削禄夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(6, 27, [
      { reason: '斗降，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(6, 28, [
      { reason: '人神在阴，犯者得病', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(6, 29, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(6, 30, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel },
      { reason: '司命奏事，犯者减寿', level: 'moderate' as PreceptLevel },
      { reason: '月晦日，犯者减寿', level: 'moderate' as PreceptLevel }
    ])

    // 七月戒期
    this.addMonthPrecepts(7, 1, [
      { reason: '月朔，犯者夺纪', level: 'major' as PreceptLevel },
      { reason: '杨公忌', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(7, 3, [
      { reason: '斗降，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(7, 5, [
      { reason: '中会日，犯者损寿', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(7, 6, [
      { reason: '雷斋日，犯者减寿', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(7, 7, [
      { reason: '五帝校生人善恶', level: 'moderate' as PreceptLevel },
      { reason: '道德腊', level: 'moderate' as PreceptLevel },
      { reason: '魁星诞，犯者削禄夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(7, 8, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(7, 10, [
      { reason: '阴毒日，大忌', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(7, 12, [
      { reason: '长真谭真人诞', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(7, 13, [
      { reason: '大势至菩萨诞，犯者减寿', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(7, 14, [
      { reason: '三元降，犯者减寿', level: 'moderate' as PreceptLevel },
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(7, 15, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel },
      { reason: '三元降', level: 'moderate' as PreceptLevel },
      { reason: '地官校籍，犯者夺纪', level: 'major' as PreceptLevel },
      { reason: '月望', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(7, 16, [
      { reason: '三元降，犯者减寿', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(7, 18, [
      { reason: '西王母诞，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(7, 19, [
      { reason: '太岁诞，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(7, 22, [
      { reason: '增福财神诞，犯者削禄夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(7, 23, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(7, 27, [
      { reason: '斗降，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(7, 28, [
      { reason: '人神在阴，犯者得病', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(7, 29, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel },
      { reason: '杨公忌', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(7, 30, [
      { reason: '地藏菩萨诞，犯者夺纪', level: 'major' as PreceptLevel },
      { reason: '司命奏事，犯者减寿', level: 'moderate' as PreceptLevel },
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel },
      { reason: '月晦日，犯者减寿', level: 'moderate' as PreceptLevel }
    ])

    // 八月戒期
    this.addMonthPrecepts(8, 1, [
      { reason: '月朔，犯者夺纪', level: 'major' as PreceptLevel },
      { reason: '许真君诞', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(8, 3, [
      { reason: '斗降', level: 'major' as PreceptLevel },
      { reason: '北斗诞，犯者削禄夺纪', level: 'major' as PreceptLevel },
      { reason: '司命灶君诞，犯者遭回禄', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(8, 5, [
      { reason: '雷声大帝诞，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(8, 6, [
      { reason: '雷斋，犯者减寿', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(8, 8, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(8, 10, [
      { reason: '北斗大帝诞', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(8, 12, [
      { reason: '西方五道诞', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(8, 14, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(8, 15, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel },
      { reason: '月望，太阴朝元，宜焚香守夜，犯者暴亡', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(8, 16, [
      { reason: '天曹掠刷真君降，犯者贫夭', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(8, 18, [
      { reason: '天人兴福之辰，宜斋戒，存想吉事', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(8, 23, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel },
      { reason: '汉桓侯张显王诞', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(8, 24, [
      { reason: '灶君夫人诞', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(8, 27, [
      { reason: '斗降', level: 'major' as PreceptLevel },
      { reason: '至圣先师孔子诞，削禄夺纪', level: 'major' as PreceptLevel },
      { reason: '杨公忌', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(8, 28, [
      { reason: '人神在阴，犯者得病', level: 'moderate' as PreceptLevel },
      { reason: '四天会事', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(8, 29, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(8, 30, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel },
      { reason: '司命奏事，犯者减寿', level: 'moderate' as PreceptLevel },
      { reason: '月晦日，犯者减寿', level: 'moderate' as PreceptLevel },
      { reason: '诸神考校夺算', level: 'major' as PreceptLevel }
    ])

    // 九月戒期
    this.addMonthPrecepts(9, 1, [
      { reason: '月朔，南斗诞，犯者削禄夺纪', level: 'major' as PreceptLevel },
      { reason: '北斗九星降，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(9, 3, [
      { reason: '五瘟神诞', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(9, 8, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(9, 9, [
      { reason: '斗母诞，犯者削禄夺纪', level: 'major' as PreceptLevel },
      { reason: '酆都大帝诞', level: 'major' as PreceptLevel },
      { reason: '玄天上帝飞升', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(9, 10, [
      { reason: '斗母降，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(9, 11, [
      { reason: '宜戒', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(9, 13, [
      { reason: '孟婆尊神诞', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(9, 14, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(9, 15, [
      { reason: '月望，犯者夺纪', level: 'major' as PreceptLevel },
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(9, 17, [
      { reason: '金龙四大王诞，犯者水厄', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(9, 19, [
      { reason: '观世音菩萨出家日，犯者减寿', level: 'moderate' as PreceptLevel },
      { reason: '日宫月宫会合', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(9, 23, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(9, 25, [
      { reason: '杨公忌', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(9, 27, [
      { reason: '斗降，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(9, 28, [
      { reason: '人神在阴，犯者得病', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(9, 29, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(9, 30, [
      { reason: '药师琉璃光佛诞，犯者得危疾', level: 'major' as PreceptLevel },
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel },
      { reason: '司命奏事，犯者减寿', level: 'moderate' as PreceptLevel },
      { reason: '月晦日，犯者减寿', level: 'moderate' as PreceptLevel }
    ])

    // 十月戒期
    this.addMonthPrecepts(10, 1, [
      { reason: '四天王降，犯者一年内死', level: 'major' as PreceptLevel },
      { reason: '月朔，民岁腊，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(10, 3, [
      { reason: '斗降', level: 'major' as PreceptLevel },
      { reason: '三茅诞，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(10, 5, [
      { reason: '达摩祖师诞', level: 'moderate' as PreceptLevel },
      { reason: '下会日，犯者损寿', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(10, 6, [
      { reason: '天曹考察，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(10, 8, [
      { reason: '佛涅槃日，大忌色欲', level: 'major' as PreceptLevel },
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(10, 10, [
      { reason: '四天王降，犯者一年内死', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(10, 11, [
      { reason: '宜戒', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(10, 14, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel },
      { reason: '三元降，犯者减寿', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(10, 15, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel },
      { reason: '三元降', level: 'moderate' as PreceptLevel },
      { reason: '下元水府校籍，犯者夺纪', level: 'major' as PreceptLevel },
      { reason: '月望', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(10, 16, [
      { reason: '三元降，犯者减寿', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(10, 23, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel },
      { reason: '杨公忌', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(10, 27, [
      { reason: '北极紫薇大帝降', level: 'major' as PreceptLevel },
      { reason: '斗降，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(10, 28, [
      { reason: '人神在阴，犯者得病', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(10, 29, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(10, 30, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel },
      { reason: '司命奏事，犯者减寿', level: 'moderate' as PreceptLevel },
      { reason: '月晦日，犯者减寿', level: 'moderate' as PreceptLevel }
    ])

    // 十一月戒期
    this.addMonthPrecepts(11, 1, [
      { reason: '月朔，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(11, 3, [
      { reason: '斗降，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(11, 4, [
      { reason: '至圣先师孔子诞，犯者削禄夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(11, 6, [
      { reason: '西岳大帝诞', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(11, 8, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(11, 11, [
      { reason: '太乙救苦天尊诞，犯者夺纪', level: 'major' as PreceptLevel },
      { reason: '天仓开日', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(11, 14, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(11, 15, [
      { reason: '月望，四天王巡行，上半夜犯男死，下半夜犯女死', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(11, 17, [
      { reason: '阿弥陀佛诞', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(11, 19, [
      { reason: '太阳日宫诞，犯者奇祸', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(11, 21, [
      { reason: '杨公忌', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(11, 23, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel },
      { reason: '张仙诞，犯者绝嗣', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(11, 25, [
      { reason: '掠刷大夫降，犯者大凶', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(11, 26, [
      { reason: '北方五道诞', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(11, 27, [
      { reason: '斗降，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(11, 28, [
      { reason: '人神在阴，犯者得病', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(11, 29, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(11, 30, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel },
      { reason: '司命奏事，犯者减寿', level: 'moderate' as PreceptLevel },
      { reason: '月晦日，犯者减寿', level: 'moderate' as PreceptLevel }
    ])

    // 十二月戒期
    this.addMonthPrecepts(12, 1, [
      { reason: '月朔，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(12, 3, [
      { reason: '斗降，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(12, 6, [
      { reason: '雷斋日，犯者减寿', level: 'moderate' as PreceptLevel },
      { reason: '天仓开日', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(12, 7, [
      { reason: '掠刷大夫降，犯者得恶疾', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(12, 8, [
      { reason: '释迦如来成道日', level: 'major' as PreceptLevel },
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel },
      { reason: '王侯腊，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(12, 12, [
      { reason: '太素三元君朝真', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(12, 14, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(12, 15, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel },
      { reason: '月望，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(12, 16, [
      { reason: '南岳大帝诞', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(12, 19, [
      { reason: '杨公忌', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(12, 20, [
      { reason: '天地交道促寿', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(12, 21, [
      { reason: '天猷上帝诞', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(12, 23, [
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel },
      { reason: '五岳神降', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(12, 24, [
      { reason: '司命朝天奏人善恶，犯者大祸', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(12, 25, [
      { reason: '三清玉帝同降，考察善恶，犯者奇祸', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(12, 27, [
      { reason: '斗降，犯者夺纪', level: 'major' as PreceptLevel }
    ])
    this.addMonthPrecepts(12, 28, [
      { reason: '人神在阴，犯者得病', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(12, 29, [
      { reason: '华严菩萨诞', level: 'moderate' as PreceptLevel },
      { reason: '四天王巡行', level: 'moderate' as PreceptLevel }
    ])
    this.addMonthPrecepts(12, 30, [
      { reason: '诸神下降，察访善恶，犯者男女俱亡', level: 'major' as PreceptLevel }
    ])
  }

  /**
   * 辅助方法：为指定月份和日期添加戒期
   */
  private addMonthPrecepts(month: number, day: number, reasons: { reason: string; level: PreceptLevel }[]): void {
    const dateKey = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
    const preceptInfos: PreceptInfo[] = reasons.map(precept => {
      const { reason, punishment } = this.parseReasonAndPunishment(precept.reason)
      return {
        date: dateKey,
        reason: reason,
        punishment: punishment,
        level: precept.level,
        type: 'regular' as PreceptType,
        description: this.getPreceptDescription(reason, punishment, precept.level)
      }
    })
    this.monthlyPrecepts.set(dateKey, preceptInfos)
  }

  /**
   * 解析戒期原因和惩罚
   */
  private parseReasonAndPunishment(text: string): { reason: string; punishment: string } {
    // 处理包含"犯者"的文本
    if (text.includes('犯者')) {
      const match = text.match(/(.+)，犯者(.+)/)
      if (match) {
        return {
          reason: match[1].trim(),
          punishment: `犯者${match[2].trim()}`
        }
      }
    }

    // 处理包含"削禄夺纪"的文本
    if (text.includes('削禄夺纪')) {
      const match = text.match(/(.+)，削禄夺纪/)
      if (match) {
        return {
          reason: match[1].trim(),
          punishment: '犯者削禄夺纪'
        }
      }
    }

    // 处理包含"宜戒"的文本
    if (text.includes('宜戒')) {
      const match = text.match(/(.+)，宜戒/)
      if (match) {
        return {
          reason: match[1].trim(),
          punishment: '宜戒'
        }
      }
      // 如果整个文本就是"宜戒"
      if (text === '宜戒') {
        return {
          reason: '宜戒之日',
          punishment: '宜戒'
        }
      }
      // 如果文本中包含"宜斋戒，存想吉事"等
      if (text.includes('宜斋戒')) {
        return {
          reason: text,
          punishment: '宜戒'
        }
      }
    }

    // 处理包含"忌"的文本
    if (text.includes('忌')) {
      return {
        reason: text,
        punishment: '宜戒'
      }
    }

    // 处理神明诞辰（包含"诞"但没有明确惩罚）
    if (text.includes('诞')) {
      return {
        reason: text,
        punishment: '犯者夺纪'
      }
    }

    // 处理降神事件（包含"降"但没有明确惩罚）
    if (text.includes('降')) {
      return {
        reason: text,
        punishment: '犯者夺纪'
      }
    }

    // 处理其他特殊事件
    if (text.includes('暴亡') || text.includes('贫夭') || text.includes('血死') || text.includes('水厄') || text.includes('绝嗣')) {
      return {
        reason: text,
        punishment: text.includes('，') ? text.split('，')[1] : '犯者减寿'
      }
    }

    // 处理包含逗号的文本，尝试分割
    const commaMatch = text.match(/(.+)，(.+)/)
    if (commaMatch) {
      const firstPart = commaMatch[1].trim()
      const secondPart = commaMatch[2].trim()

      // 判断第二部分是否是惩罚
      if (secondPart.includes('犯者') || secondPart.includes('宜') || secondPart.includes('忌') ||
          secondPart.includes('减寿') || secondPart.includes('损寿') || secondPart.includes('夺纪')) {
        return {
          reason: firstPart,
          punishment: secondPart.startsWith('犯者') ? secondPart : `犯者${secondPart}`
        }
      }

      // 如果第二部分不是惩罚，则第一部分为原因，第二部分为补充说明
      return {
        reason: firstPart,
        punishment: '宜戒'
      }
    }

    // 默认情况，整个文本作为原因，惩罚为轻度的
    return {
      reason: text,
      punishment: '宜戒'
    }
  }

  /**
   * 初始化特殊戒期（佛菩萨圣诞等）
   * 注意：根据要求，移除所有特殊戒期，只保留十斋日
   */
  private initSpecialPrecepts(): void {
    // 特殊戒期已移除，只保留十斋日
    // 十斋日已包含在 getDayPreceptInfos 方法中
  }


  /**
   * 获取戒期描述
   */
  private getPreceptDescription(reason: string, punishment: string, level: PreceptLevel): string {
    const levelText = {
      major: '大罪',
      moderate: '中罪',
      minor: '小罪',
      safe: '安全'
    }

    return `${reason} - ${punishment} - ${levelText[level]}`
  }

  /**
   * 根据农历日期获取戒期信息
   */
  public getPreceptByLunarDate(month: number, day: number): PreceptInfo[] {
    const dateKey = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
    return this.monthlyPrecepts.get(dateKey) || []
  }

  /**
   * 根据农历日期获取特殊戒期信息
   */
  public getSpecialPreceptByLunarDate(month: number, day: number): PreceptInfo[] {
    const dateKey = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
    return this.specialPrecepts.get(dateKey) || []
  }


  /**
   * 获取十斋日
   */
  public getTenPreceptDays(): number[] {
    return [1, 8, 14, 15, 18, 23, 24, 28, 29, 30]
  }

  /**
   * 检查是否为十斋日
   */
  public isTenPreceptDay(day: number): boolean {
    return this.getTenPreceptDays().includes(day)
  }
}