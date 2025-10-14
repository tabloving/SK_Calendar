import type { PreceptInfo, PreceptLevel, PreceptType, PreceptDetail } from '@/types'
import { PreceptCategory } from '@/types'

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
      { reason: '月朔', level: 'major' as PreceptLevel },
      { reason: '一殿秦广王诞，犯者夺纪', level: 'major' as PreceptLevel }
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
      { reason: '月望', level: 'major' as PreceptLevel },
      { reason: '昊天上帝诞，犯者夺纪', level: 'major' as PreceptLevel },
      { reason: '玄坛诞，犯者夺纪', level: 'major' as PreceptLevel }
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
      { reason: '月望', level: 'major' as PreceptLevel },
      { reason: '九毒日，犯者夭亡，奇祸不测', level: 'major' as PreceptLevel }
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
      { reason: '月望', level: 'major' as PreceptLevel },
      { reason: '太阴朝元，宜焚香守夜，犯者暴亡', level: 'major' as PreceptLevel }
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
      { reason: '月朔', level: 'major' as PreceptLevel },
      { reason: '南斗诞，犯者削禄夺纪', level: 'major' as PreceptLevel },
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
      { reason: '月望', level: 'major' as PreceptLevel },
      { reason: '四天王巡行，上半夜犯男死，下半夜犯女死', level: 'major' as PreceptLevel }
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
  private addMonthPrecepts(month: number, day: number, reasons: { reason: string; level?: PreceptLevel }[]): void {
    const dateKey = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
    const preceptInfos: PreceptInfo[] = reasons.map(precept => {
      const detail = this.parsePreceptDetail(precept.reason, precept.level || 'minor' as PreceptLevel)
      // 使用动态判断的等级而不是传入的等级
      const dynamicLevel = this.determinePreceptLevel(detail.punishment)
      return {
        date: dateKey,
        level: dynamicLevel,
        type: 'regular' as PreceptType,
        detail: detail,
        reason: detail.reason,        // 向后兼容
        punishment: detail.punishment, // 向后兼容
        description: this.generateDescription(detail, dynamicLevel)
      }
    })
    this.monthlyPrecepts.set(dateKey, preceptInfos)
  }

  /**
   * 解析戒期原因和惩罚，返回详细的结构化数据
   */
  private parsePreceptDetail(text: string, originalLevel: PreceptLevel): PreceptDetail {
    const result: PreceptDetail = {
      reason: text,
      punishment: '宜戒',
      category: PreceptCategory.CUSTOM,
      source: '《寿康宝鉴》'
    }

    // 处理包含"犯者"的文本 - 最优先处理
    if (text.includes('犯者')) {
      const match = text.match(/(.+)，犯者(.+)/)
      if (match) {
        result.reason = match[1].trim()
        result.punishment = `犯者${match[2].trim()}`
        // 使用新的等级判断逻辑
        const newLevel = this.determinePreceptLevel(result.punishment)
        result.category = this.categorizeByReason(result.reason)
        result.tags = this.extractTags(result.reason)
        result.explanation = this.getExplanation(result.reason)
        result.suggestion = this.getSuggestion(result.reason, newLevel)
        return result
      }
    }

    // 处理包含"削禄夺纪"的文本（可能没有"犯者"前缀）
    if (text.includes('削禄夺纪')) {
      const match = text.match(/(.+)，削禄夺纪/)
      if (match) {
        result.reason = match[1].trim()
        result.punishment = '犯者削禄夺纪'
        // 使用新的等级判断逻辑
        const newLevel = this.determinePreceptLevel(result.punishment)
        result.category = this.categorizeByReason(result.reason)
        result.tags = this.extractTags(result.reason)
        result.explanation = this.getExplanation(result.reason)
        result.suggestion = this.getSuggestion(result.reason, newLevel)
        return result
      }
    }

    // 处理包含"减寿"的文本（可能没有"犯者"前缀）
    if (text.includes('减寿')) {
      const match = text.match(/(.+)，(.+减寿)/)
      if (match) {
        result.reason = match[1].trim()
        result.punishment = match[2].trim().startsWith('犯者') ? match[2].trim() : `犯者${match[2].trim()}`
        // 使用新的等级判断逻辑
        const newLevel = this.determinePreceptLevel(result.punishment)
        result.category = this.categorizeByReason(result.reason)
        result.tags = this.extractTags(result.reason)
        result.explanation = this.getExplanation(result.reason)
        result.suggestion = this.getSuggestion(result.reason, newLevel)
        return result
      }
    }

    // 处理包含"损寿"的文本（可能没有"犯者"前缀）
    if (text.includes('损寿')) {
      const match = text.match(/(.+)，(.+损寿)/)
      if (match) {
        result.reason = match[1].trim()
        result.punishment = match[2].trim().startsWith('犯者') ? match[2].trim() : `犯者${match[2].trim()}`
        // 使用新的等级判断逻辑
        const newLevel = this.determinePreceptLevel(result.punishment)
        result.category = this.categorizeByReason(result.reason)
        result.tags = this.extractTags(result.reason)
        result.explanation = this.getExplanation(result.reason)
        result.suggestion = this.getSuggestion(result.reason, newLevel)
        return result
      }
    }

    // 处理包含"宜戒"的文本
    if (text.includes('宜戒')) {
      const match = text.match(/(.+)，宜戒/)
      if (match) {
        result.reason = match[1].trim()
        result.punishment = '宜戒'
      } else if (text === '宜戒') {
        result.reason = '宜戒之日'
        result.punishment = '宜戒'
      } else if (text.includes('宜斋戒')) {
        result.punishment = '宜戒'
      }
      // 使用新的等级判断逻辑
      const newLevel = this.determinePreceptLevel(result.punishment)
      result.category = this.categorizeByReason(result.reason)
      result.tags = this.extractTags(result.reason)
      result.explanation = this.getExplanation(result.reason)
      result.suggestion = this.getSuggestion(result.reason, newLevel)
      return result
    }

    // 处理月晦日特殊说明
    if (text.includes('月晦')) {
      result.reason = '月晦日'
      result.punishment = text.includes('犯者') ? text : '犯者减寿'
      result.category = PreceptCategory.ASTRONOMICAL
      result.tags = ['月晦', '司命奏事']
      result.explanation = '月晦是农历每月的最后一日，天地交泰、阴阳转换的关键时刻。司命之神在此日向天庭奏报世人善恶。如遇到小月（只有29天），则廿九日即为月晦日。'
      result.suggestion = '月晦日应严格持戒，反省己过，可诵经忏悔，修身养性'
      result.specialNote = '如月小即戒廿九日'
      return result
    }

    // 处理神明诞辰
    if (text.includes('诞')) {
      result.punishment = '犯者夺纪'
      // 使用新的等级判断逻辑
      const newLevel = this.determinePreceptLevel(result.punishment)
      result.category = PreceptCategory.ANNIVERSARY
      result.tags = this.extractTags(text)
      result.explanation = this.getBirthExplanation(text)
      result.suggestion = '神明诞辰日应持戒清净，可诵经礼忏，积德行善'
      return result
    }

    // 处理神明降世事件
    if (text.includes('降')) {
      result.punishment = '犯者夺纪'
      // 使用新的等级判断逻辑
      const newLevel = this.determinePreceptLevel(result.punishment)
      result.category = PreceptCategory.DEITY_INSPECTION
      result.tags = this.extractTags(text)
      result.explanation = this.getDescentExplanation(text)
      result.suggestion = '神明降世之日应虔诚持戒，可诵经祈福'
      return result
    }

    // 处理其他特殊事件
    if (text.includes('暴亡') || text.includes('贫夭') || text.includes('血死') ||
        text.includes('水厄') || text.includes('绝嗣') || text.includes('夭亡')) {
      const parts = text.split('，')
      if (parts.length > 1) {
        result.reason = parts[0].trim()
        result.punishment = parts[1].trim()
      } else {
        result.punishment = text.includes('，') ? text.split('，')[1] : '犯者减寿'
      }
      // 使用新的等级判断逻辑
      const newLevel = this.determinePreceptLevel(result.punishment)
      result.category = PreceptCategory.KARMA
      result.tags = this.extractTags(result.reason)
      result.explanation = this.getSpecialEventExplanation(result.reason)
      result.suggestion = '此日有大凶险，应严格持戒，避免一切不当行为'
      return result
    }

    // 处理包含逗号的文本
    const commaMatch = text.match(/(.+)，(.+)/)
    if (commaMatch) {
      const firstPart = commaMatch[1].trim()
      const secondPart = commaMatch[2].trim()

      if (secondPart.includes('犯者') || secondPart.includes('宜') || secondPart.includes('忌') ||
          secondPart.includes('减寿') || secondPart.includes('损寿') || secondPart.includes('夺纪')) {
        result.reason = firstPart
        result.punishment = secondPart.startsWith('犯者') ? secondPart : `犯者${secondPart}`
      } else {
        result.reason = firstPart
        result.punishment = '宜戒'
      }

      // 使用新的等级判断逻辑
      const newLevel = this.determinePreceptLevel(result.punishment)
      result.category = this.categorizeByReason(result.reason)
      result.tags = this.extractTags(result.reason)
      result.explanation = this.getExplanation(result.reason)
      result.suggestion = this.getSuggestion(result.reason, newLevel)
      return result
    }

    // 默认情况
    result.category = PreceptCategory.CUSTOM
    result.tags = this.extractTags(text)
    result.explanation = '传统戒期，应持戒清净'
    result.suggestion = '宜持戒修行，保持身心清净'
    return result
  }

  /**
   * 根据原因内容分类
   */
  private categorizeByReason(reason: string): PreceptCategory {
    if (reason.includes('四天王')) return PreceptCategory.DEITY_INSPECTION
    if (reason.includes('斗降') || reason.includes('北斗')) return PreceptCategory.DEITY_INSPECTION
    if (reason.includes('雷斋')) return PreceptCategory.FESTIVAL
    if (reason.includes('月望') || reason.includes('月朔') || reason.includes('月晦')) return PreceptCategory.ASTRONOMICAL
    if (reason.includes('三元') || reason.includes('三官')) return PreceptCategory.FESTIVAL
    if (reason.includes('腊')) return PreceptCategory.FESTIVAL
    if (reason.includes('仓开')) return PreceptCategory.DEITY_INSPECTION
    if (reason.includes('杨公忌')) return PreceptCategory.KARMA
    if (reason.includes('人神')) return PreceptCategory.DEITY_INSPECTION
    if (reason.includes('司命')) return PreceptCategory.DEITY_INSPECTION
    if (reason.includes('九毒')) return PreceptCategory.KARMA
    if (reason.includes('五虚')) return PreceptCategory.KARMA
    if (reason.includes('六耗')) return PreceptCategory.KARMA
    if (reason.includes('天地交泰')) return PreceptCategory.ASTRONOMICAL
    if (reason.includes('阴毒')) return PreceptCategory.KARMA
    return PreceptCategory.CUSTOM
  }

  /**
   * 提取标签
   */
  private extractTags(text: string): string[] {
    const tags: string[] = []

    // 神明相关标签
    if (text.includes('四天王')) tags.push('四天王')
    if (text.includes('玉帝') || text.includes('玉皇')) tags.push('玉帝')
    if (text.includes('斗') || text.includes('北斗')) tags.push('斗星')
    if (text.includes('雷')) tags.push('雷神')

    // 事件类型标签
    if (text.includes('巡行')) tags.push('巡行')
    if (text.includes('诞')) tags.push('诞辰')
    if (text.includes('降')) tags.push('降世')
    if (text.includes('奏事')) tags.push('奏事')

    // 时间标签
    if (text.includes('月望')) tags.push('月望')
    if (text.includes('月朔')) tags.push('月朔')
    if (text.includes('月晦')) tags.push('月晦')

    // 特殊标签
    if (text.includes('杨公忌')) tags.push('杨公忌')
    if (text.includes('九毒')) tags.push('九毒日')

    return tags
  }

  /**
   * 获取解释说明
   */
  private getExplanation(reason: string): string {
    const explanations: Record<string, string> = {
      '四天王巡行': '四天王（东方持国天王、南方增长天王、西方广目天王、北方多闻天王）巡视人间，记录世人善恶',
      '斗降': '斗星君下降之日，监察世人行为',
      '雷斋日': '雷神斋戒之日，持戒可避雷劫之灾',
      '月望': '月圆之日，阴阳交泰，宜清净持戒',
      '月朔': '新月之日，月神诞辰，宜持戒祈福',
      '三元降': '三元（天、地、水）之神下降，校世人善恶',
      '天地仓开日': '天地开仓之日，犯戒损寿并影响子孙',
      '人神在阴': '先祖神灵在阴间之日，犯戒易得疾病，宜先一日即戒',
      '司命奏事': '司命之神向天庭奏报世人善恶',
      '杨公忌': '唐代风水宗师杨筠松所订定的忌日，诸事不宜',
      '五虚忌': '五虚指脉细、皮寒、气少、泄利前后、饮食不入等五种虚弱状态，此日犯戒易损伤身体',
      '六耗忌': '六耗指阴、阳、晦、明、风、雨所导致的六种疾病，此日犯戒易致病',
      '九毒日': '九毒日天地之气不正，湿热毒气盛行，犯戒易遭奇祸不测',
      '天地交泰': '天地阴阳交合之日，犯戒可能导致严重后果',
      '阴毒日': '阴毒大忌之日，邪气最盛，犯戒有大凶险'
    }

    for (const [key, value] of Object.entries(explanations)) {
      if (reason.includes(key)) return value
    }

    return '传统戒期，应持戒清净，避免不当行为'
  }

  /**
   * 获取诞辰解释
   */
  private getBirthExplanation(text: string): string {
    if (text.includes('佛')) return '诸佛菩萨诞辰日，功德殊胜，应持戒清净，广修善业'
    if (text.includes('玉帝') || text.includes('玉皇')) return '玉帝诞辰，天神庆祝，应持戒祈福'
    if (text.includes('孔子')) return '至圣先师诞辰，应持戒恭敬，修习智慧'
    return '神明诞辰日，应持戒清净，可诵经礼忏，积德行善'
  }

  /**
   * 获取降世解释
   */
  private getDescentExplanation(text: string): string {
    if (text.includes('三元')) return '三元之神（天官赐福、地官赦罪、水官解厄）下降，校世人善恶'
    if (text.includes('斗')) return '斗星君下降，监察世人行为，记录善恶功过'
    return '神明降世之日，应虔诚持戒，可诵经祈福'
  }

  /**
   * 获取特殊事件解释
   */
  private getSpecialEventExplanation(reason: string): string {
    if (reason.includes('天地交泰')) return '天地阴阳交泰之日，犯戒可能导致严重后果'
    if (reason.includes('九毒')) return '九毒日天地之气不正，犯戒易遭奇祸不测'
    return '此日特殊，应严格持戒，避免一切不当行为'
  }

  /**
   * 获取修行建议
   */
  private getSuggestion(reason: string, level: PreceptLevel): string {
    const baseSuggestions = {
      major: '大戒之日，应严格持戒，可诵经礼忏，广修善业，以求消灾祈福',
      moderate: '中戒之日，应谨慎持戒，避免不当行为，可修善积德',
      minor: '宜戒之日，应基本持戒，保持身心清净',
      safe: '平安之日，可正常修行，保持正念'
    }

    let suggestion = baseSuggestions[level]

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
   * 初始化特殊戒期（佛菩萨圣诞等）
   * 注意：根据要求，移除所有特殊戒期，只保留十斋日
   */
  private initSpecialPrecepts(): void {
    // 特殊戒期已移除，只保留十斋日
    // 十斋日已包含在 getDayPreceptInfos 方法中
  }


  /**
   * 生成戒期描述
   */
  private generateDescription(detail: PreceptDetail, level: PreceptLevel): string {
    const levelText = {
      major: '大戒',
      moderate: '中戒',
      minor: '宜戒',
      safe: '安全'
    }

    let description = ``

    if (detail.explanation) {
      description += `\n说明：${detail.explanation}`
    }

    if (detail.suggestion) {
      description += `\n建议：${detail.suggestion}`
    }

    if (detail.category) {
      description += `\n分类：${detail.category}`
    }

    return description
  }

  /**
   * 根据惩罚内容判断戒期等级
   */
  private determinePreceptLevel(punishment: string): PreceptLevel {
    // 大戒：死、亡、夺纪、夺禄
    if (punishment.includes('死') || punishment.includes('亡') ||
        punishment.includes('夺纪') || punishment.includes('夺禄') ||
        punishment.includes('暴亡') || punishment.includes('血死') ||
        punishment.includes('贫夭') || punishment.includes('夭亡') ||
        punishment.includes('绝嗣') || punishment.includes('水厄') ||
        punishment.includes('奇祸') || punishment.includes('大凶') ||
        punishment.includes('男女俱亡')) {
      return 'major' as PreceptLevel
    }

    // 中戒：重疾、大病、损寿、减寿、生病
    if (punishment.includes('重疾') || punishment.includes('大病') ||
        punishment.includes('损寿') || punishment.includes('减寿') ||
        punishment.includes('生病') || punishment.includes('得病') ||
        punishment.includes('遭回禄') || punishment.includes('产恶胎') ||
        punishment.includes('失瘏夭胎') || punishment.includes('得危疾') ||
        punishment.includes('恶疾') || punishment.includes('带疾') ||
        punishment.includes('子带疾')) {
      return 'moderate' as PreceptLevel
    }

    // 宜戒：明确指出宜戒的或较轻的惩罚
    if (punishment.includes('宜戒') || punishment.includes('大忌') ||
        punishment.includes('忌') || punishment.includes('斋') ||
        punishment.includes('得祸') || punishment.includes('削禄') ||
        punishment === '宜戒' || punishment.includes('宜斋戒')) {
      return 'minor' as PreceptLevel
    }

    // 默认为小戒
    return 'minor' as PreceptLevel
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

  /**
   * 测试戒期等级判断（用于开发调试）
   */
  public testPreceptLevel(punishment: string): PreceptLevel {
    return this.determinePreceptLevel(punishment)
  }
}