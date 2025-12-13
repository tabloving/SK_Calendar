import type { PreceptInfo, PreceptDetail } from '@/types'
import { PreceptCategory, PreceptLevel, PreceptType } from '@/types'
import * as lunarLib from 'lunar-javascript'

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
   * 初始化特殊戒期（包括节气戒期）
   */
  private initSpecialPrecepts(): void {
    // 初始化节气戒期
    this.initSolarTermPrecepts()
  }

  /**
   * 初始化节气戒期
   */
  private initSolarTermPrecepts(): void {
    // 注意：节气日戒期不是固定日期，而是根据每年节气变化
    // 这里不进行静态初始化，而是在查询时动态计算
    // 保持特殊戒期结构以便于管理
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
   * 获取指定日期的特殊戒期信息（包括节气等动态戒期）
   */
  public getSpecialPreceptsByDate(date: Date, dayInfo: any): PreceptInfo[] {
    const specialPrecepts: PreceptInfo[] = []

    // 1. 获取农历日期相关的固定特殊戒期
    let lunarMonth = 1
    let lunarDay = 1
    try {
      const solar = lunarLib.Solar.fromDate(date)
      const lunarDate = solar.getLunar()
      lunarMonth = lunarDate.getMonth()
      lunarDay = lunarDate.getDay()
    } catch (error) {
      console.warn('获取农历日期失败，使用默认值', error)
    }

    const lunarSpecialPrecepts = this.getSpecialPreceptByLunarDate(lunarMonth, lunarDay)
    specialPrecepts.push(...lunarSpecialPrecepts)

    // 2. 获取节气特殊戒期（动态计算）
    const solarTermPrecepts = this.getSolarTermPrecepts(date, dayInfo)
    specialPrecepts.push(...solarTermPrecepts)

    // 3. 获取三元日戒期
    const sanYuanRiPrecept = this.getSanYuanRiPrecept(lunarMonth, lunarDay, date)
    if (sanYuanRiPrecept) {
      specialPrecepts.push(sanYuanRiPrecept)
    }

    return specialPrecepts
  }

  /**
   * 获取三元日戒期
   * 三元日：农历正月十五（上元）、七月十五（中元）、十月十五（下元）
   * 犯之减寿五年
   */
  private getSanYuanRiPrecept(lunarMonth: number, lunarDay: number, date: Date): PreceptInfo | null {
    // 检查是否为三元日：正月、七月、十月的十五日
    if ((lunarMonth === 1 || lunarMonth === 7 || lunarMonth === 10) && lunarDay === 15) {
      const yuanNames: Record<number, string> = {
        1: '上元',
        7: '中元',
        10: '下元'
      }

      const yuanName = yuanNames[lunarMonth]
      const detail = {
        reason: '三元日',
        punishment: '犯之减寿五年',
        explanation: `${yuanName}（农历${lunarMonth}月15日），三元日之一。三元日是天官、地官、水官巡行世间，校定善恶的重要日子，犯戒会严重损害寿命`,
        suggestion: '三元日应严格持戒，可礼拜三官大帝，诵经礼忏，广修善业，以求消灾祈福',
        category: PreceptCategory.FESTIVAL,
        tags: ['三元日', yuanName, '天官大帝', '三官大帝'],
        source: '《寿康宝鉴》'
      }

      const dateStr = `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`

      return {
        date: dateStr,
        level: PreceptLevel.MAJOR,
        type: PreceptType.SPECIAL,
        detail: detail,
        reason: detail.reason,
        punishment: detail.punishment,
        description: `三元日${yuanName} - 犯之减寿五年 - 大戒\n说明：${detail.explanation}\n建议：${detail.suggestion}\n分类：节日戒期`
      }
    }

    return null
  }

  /**
   * 获取指定日期的节气特殊戒期
   */
  private getSolarTermPrecepts(date: Date, dayInfo: any): PreceptInfo[] {
    const solarTermPrecepts: PreceptInfo[] = []

    // 检查当日是否为节气日
    const currentSolarTerm = dayInfo.solarTerm
    if (currentSolarTerm) {
      const preceptInfo = this.createSolarTermPrecept(currentSolarTerm, date, dayInfo)
      if (preceptInfo) {
        solarTermPrecepts.push(preceptInfo)
      }
    }

    // 检查是否为节气日前后的戒期（前三后三共七日）
    const nearbySolarTerm = this.getNearbySolarTermPrecept(date, dayInfo)
    if (nearbySolarTerm) {
      solarTermPrecepts.push(nearbySolarTerm)
    }

    // 检查是否为四绝日（四立日的前一日）
    const siJueRi = this.getSiJueRiPrecept(date, dayInfo)
    if (siJueRi) {
      solarTermPrecepts.push(siJueRi)
    }

    // 检查是否为四离日（二分二至的前一日）
    const siLiRi = this.getSiLiRiPrecept(date, dayInfo)
    if (siLiRi) {
      solarTermPrecepts.push(siLiRi)
    }

    // 检查是否为毁败日（大月十八日，小月十七日）
    const huiBaiRi = this.getHuiBaiRiPrecept(date, dayInfo)
    if (huiBaiRi) {
      solarTermPrecepts.push(huiBaiRi)
    }

    return solarTermPrecepts
  }

  /**
   * 创建节气日本身的戒期
   */
  private createSolarTermPrecept(solarTerm: string, date: Date, dayInfo: any): PreceptInfo | null {
    const solarTermConfig: Record<string, { reason: string; punishment: string; level: PreceptLevel }> = {
      '春分': {
        reason: '二分日',
        punishment: '犯者生子五官四肢不全，父母有灾',
        level: PreceptLevel.MAJOR
      },
      '秋分': {
        reason: '二分日',
        punishment: '犯者必得危疾',
        level: PreceptLevel.MAJOR
      },
      '夏至': {
        reason: '二至日',
        punishment: '犯者必得急疾',
        level: PreceptLevel.MAJOR
      },
      '冬至': {
        reason: '二至日',
        punishment: '犯者必得急疾',
        level: PreceptLevel.MAJOR
      },
      '立春': {
        reason: '四立日',
        punishment: '犯之减寿五年',
        level: PreceptLevel.MAJOR
      },
      '立夏': {
        reason: '四立日',
        punishment: '犯之减寿五年',
        level: PreceptLevel.MAJOR
      },
      '立秋': {
        reason: '四立日',
        punishment: '犯之减寿五年',
        level: PreceptLevel.MAJOR
      },
      '立冬': {
        reason: '四立日',
        punishment: '犯之减寿五年',
        level: PreceptLevel.MAJOR
      }
    }

    const config = solarTermConfig[solarTerm]
    if (!config) return null

    const detail = {
      reason: config.reason,
      punishment: config.punishment,
      explanation: this.getSolarTermExplanation(solarTerm),
      suggestion: this.getSolarTermSuggestion(solarTerm),
      category: PreceptCategory.SOLAR_TERM,
      tags: this.getSolarTermTags(solarTerm),
      source: '《寿康宝鉴》'
    }

    const dateStr = `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`

    return {
      date: dateStr,
      level: config.level,
      type: PreceptType.SPECIAL,
      detail: detail,
      reason: detail.reason,
      punishment: detail.punishment,
      description: `${config.reason} - ${config.punishment} - 大戒\n说明：${detail.explanation}\n建议：${detail.suggestion}\n分类：节气戒期`
    }
  }

  /**
   * 获取节气日前后的戒期（前三后三共七日）
   */
  private getNearbySolarTermPrecept(date: Date, dayInfo: any): PreceptInfo | null {
    const year = date.getFullYear()
    const currentSolarTerms = this.getSolarTerms(year)

    // 查找节气日
    const erFenErZhiTerms = currentSolarTerms.filter(term =>
      ['春分', '秋分', '夏至', '冬至'].includes(term.name)
    )

    for (const term of erFenErZhiTerms) {
      const daysDiff = Math.floor((date.getTime() - term.date.getTime()) / (1000 * 60 * 60 * 24))

      // 检查是否在前3后3的范围内（不包括当天）
      if (daysDiff >= -3 && daysDiff <= 3 && daysDiff !== 0) {
        const direction = daysDiff < 0 ? '前' : '后'
        const daysAbs = Math.abs(daysDiff)

        let reason: string
        let punishment: string

        if (['春分', '秋分'].includes(term.name)) {
          reason = `${term.name}${direction}${daysAbs}日`
          punishment = '犯者必得危疾，尤宜切戒'
        } else {
          reason = `${term.name}${direction}${daysAbs}日`
          punishment = '犯者必得急疾，尤宜切戒'
        }

        const detail = {
          reason: reason,
          punishment: punishment,
          explanation: `此节气之前三后三共七日，${term.name}时节阴阳二气相交变化剧烈，犯戒易得疾病`,
          suggestion: '应在节气前后严格持戒，可诵经祈福，修身养性，避免阴阳失调',
          category: PreceptCategory.SOLAR_TERM,
          tags: [term.name, (term.name === "春分" || term.name === "秋分") ? "二分日" : "二至日", "前后戒期"],
          source: '《寿康宝鉴》'
        }

        const dateStr = `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`

        return {
          date: dateStr,
          level: PreceptLevel.MAJOR,
          type: PreceptType.SPECIAL,
          detail: detail,
          reason: detail.reason,
          punishment: detail.punishment,
          description: `${reason} - ${punishment} - 大戒\n说明：${detail.explanation}\n建议：${detail.suggestion}\n分类：节气戒期`
        }
      }
    }

    return null
  }

  /**
   * 获取四绝日戒期（四立日的前一日）
   */
  private getSiJueRiPrecept(date: Date, dayInfo: any): PreceptInfo | null {
    const year = date.getFullYear()
    const currentSolarTerms = this.getSolarTerms(year)

    // 查找四立日（立春、立夏、立秋、立冬）
    const siLiTerms = currentSolarTerms.filter(term =>
      ['立春', '立夏', '立秋', '立冬'].includes(term.name)
    )

    for (const term of siLiTerms) {
      const daysDiff = Math.floor((date.getTime() - term.date.getTime()) / (1000 * 60 * 60 * 24))

      // 检查是否为前一日（daysDiff === -1）
      if (daysDiff === -1) {
        const detail = {
          reason: '四绝日',
          punishment: '犯之减寿五年',
          explanation: `此日为${term.name}的前一日，属四绝日之一。四绝日是季节交替的关键时刻，天地阴阳二气交替，万物更新，犯戒会严重影响寿命`,
          suggestion: '四绝日应严格持戒，可诵经礼佛，修身养性，避免一切不当行为',
          category: PreceptCategory.SOLAR_TERM,
          tags: [`四绝日`, `${term.name}`],
          source: '《寿康宝鉴》'
        }

        const dateStr = `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`

        return {
          date: dateStr,
          level: PreceptLevel.MAJOR,
          type: PreceptType.SPECIAL,
          detail: detail,
          reason: detail.reason,
          punishment: detail.punishment,
          description: `四绝日 - 犯之减寿五年 - 大戒\n说明：${detail.explanation}\n建议：${detail.suggestion}\n分类：节气戒期`
        }
      }
    }

    return null
  }

  /**
   * 获取四离日戒期（二分二至的前一日）
   */
  private getSiLiRiPrecept(date: Date, dayInfo: any): PreceptInfo | null {
    const year = date.getFullYear()
    const currentSolarTerms = this.getSolarTerms(year)

    // 查找二分二至日（春分、秋分、夏至、冬至）
    const erFenErZhiTerms = currentSolarTerms.filter(term =>
      ['春分', '秋分', '夏至', '冬至'].includes(term.name)
    )

    for (const term of erFenErZhiTerms) {
      const daysDiff = Math.floor((date.getTime() - term.date.getTime()) / (1000 * 60 * 60 * 24))

      // 检查是否为前一日（daysDiff === -1）
      if (daysDiff === -1) {
        const detail = {
          reason: '四离日',
          punishment: '犯之减寿五年',
          explanation: `此日为${term.name}的前一日，属四离日之一。四离日是季节交替的关键时刻，天地阴阳二气分离，万物转换，犯戒会严重影响寿命`,
          suggestion: '四离日应严格持戒，可诵经礼佛，修身养性，避免一切不当行为',
          category: PreceptCategory.SOLAR_TERM,
          tags: [`四离日`, `${term.name}`],
          source: '《寿康宝鉴》'
        }

        const dateStr = `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`

        return {
          date: dateStr,
          level: PreceptLevel.MAJOR,
          type: PreceptType.SPECIAL,
          detail: detail,
          reason: detail.reason,
          punishment: detail.punishment,
          description: `四离日 - 犯之减寿五年 - 大戒\n说明：${detail.explanation}\n建议：${detail.suggestion}\n分类：节气戒期`
        }
      }
    }

    return null
  }

  /**
   * 获取毁败日戒期（大月十八日，小月十七日）
   */
  private getHuiBaiRiPrecept(date: Date, dayInfo: any): PreceptInfo | null {
    try {
      const solar = lunarLib.Solar.fromDate(date)
      const lunarDate = solar.getLunar()
      const lunarYear = lunarDate.getYear()
      const lunarMonth = lunarDate.getMonth()
      const lunarDay = lunarDate.getDay()

      // 获取当前农历月的天数
      const lunarMonthObj = lunarLib.LunarMonth.fromYm(lunarYear, lunarMonth)
      if (!lunarMonthObj) {
        console.error('获取农历月份对象失败', { lunarYear, lunarMonth })
        return null
      }
      const monthDays = lunarMonthObj.getDayCount()

      // 判断是否为毁败日
      // 大月（30天）：十八日
      // 小月（29天）：十七日
      const isHuiBaiRi = (monthDays === 30 && lunarDay === 18) || (monthDays === 29 && lunarDay === 17)

      if (isHuiBaiRi) {
        const monthType = monthDays === 30 ? '大月' : '小月'
        const lunarMonthChinese = lunarDate.getMonthInChinese()
        const detail = {
          reason: '毁败日',
          punishment: '犯之得病',
          explanation: `此日为农历${lunarMonthChinese}月${monthType}的毁败日（${monthType === '大月' ? '十八日' : '十七日'}）。毁败日是天地气机不顺的日子，犯戒容易导致疾病`,
          suggestion: '毁败日应注意身体健康，持戒清净，可诵经祈福，避免不当行为',
          category: PreceptCategory.ASTRONOMICAL,
          tags: ['毁败日', monthType],
          source: '《寿康宝鉴》'
        }

        const dateStr = `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`

        return {
          date: dateStr,
          level: PreceptLevel.MINOR,
          type: PreceptType.SPECIAL,
          detail: detail,
          reason: detail.reason,
          punishment: detail.punishment,
          description: `毁败日 - 犯之得病 - 宜戒\n说明：${detail.explanation}\n建议：${detail.suggestion}\n分类：天文戒期`
        }
      }
    } catch (error) {
      console.error('获取毁败日信息失败', error)
    }

    return null
  }

  /**
   * 获取指定年份的所有节气
   */
  private getSolarTerms(year: number): Array<{ name: string; date: Date }> {
    try {
      const terms: Array<{ name: string; date: Date }> = []

      // 遍历全年每一天，检查是否有节气
      for (let month = 1; month <= 12; month++) {
        const daysInMonth = new Date(year, month, 0).getDate()

        for (let day = 1; day <= daysInMonth; day++) {
          try {
            const solar = lunarLib.Solar.fromYmd(year, month, day)
            const lunarDate = solar.getLunar()
            const jieQi = lunarDate.getJieQi()

            if (jieQi) {
              terms.push({
                name: jieQi,
                date: new Date(year, month - 1, day)
              })
            }
          } catch (e) {
            // 忽略错误，继续处理下一天
          }
        }
      }

      return terms.sort((a, b) => a.date.getTime() - b.date.getTime())
    } catch (error) {
      console.error('获取节气信息失败', error)
      return []
    }
  }

  /**
   * 获取节气解释说明
   */
  private getSolarTermExplanation(solarTerm: string): string {
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
  private getSolarTermSuggestion(solarTerm: string): string {
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

  /**
   * 获取节气标签
   */
  private getSolarTermTags(solarTerm: string): string[] {
    if (solarTerm === '春分' || solarTerm === '秋分') {
      return [solarTerm, '二分日']
    }
    if (solarTerm === '夏至' || solarTerm === '冬至') {
      return [solarTerm, '二至日']
    }
    if (solarTerm === '立春' || solarTerm === '立夏' || solarTerm === '立秋' || solarTerm === '立冬') {
      return [solarTerm, '四立日']
    }
    return [solarTerm]
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