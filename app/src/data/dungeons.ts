/**
 * 副本地图数据 —— 由 tools/gen-dungeons.mjs 从 data/content-plan.csv 自动生成
 * 请勿手工编辑；要改内容请改 CSV 或生成器后重跑。
 *
 * 生成时间基准：官方 Lodestone 数据快照 2026-09-15（Patch 7.56）
 * 收录范围：第 1–3 章（ARR / Heavensward / Stormblood）的 4 人副本，共 64 条
 * 敌人数值为本项目自研（以平均物品等级门槛为唯一强度旋钮）。
 */
import type { DungeonDef } from '../types';

export const DUNGEONS: DungeonDef[] = [
  {
    "id": "sastasha",
    "name": "Sastasha",
    "chapter": 1,
    "reqLevel": 15,
    "reqItemLevel": 0,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 9800,
        "dps": 105,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 11270,
        "dps": 111,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 12740,
        "dps": 117,
        "boss": false
      },
      {
        "name": "Sastasha · 守关者",
        "hp": 41160,
        "dps": 172,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "the-tam-tara-deepcroft",
    "name": "The Tam-Tara Deepcroft",
    "chapter": 1,
    "reqLevel": 16,
    "reqItemLevel": 0,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 9987,
        "dps": 108,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 11485,
        "dps": 115,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 12983,
        "dps": 121,
        "boss": false
      },
      {
        "name": "The Tam-Tara Deepcroft · 守关者",
        "hp": 41945,
        "dps": 179,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "copperbell-mines",
    "name": "Copperbell Mines",
    "chapter": 1,
    "reqLevel": 17,
    "reqItemLevel": 0,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 10173,
        "dps": 112,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 11699,
        "dps": 119,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 13225,
        "dps": 125,
        "boss": false
      },
      {
        "name": "Copperbell Mines · 守关者",
        "hp": 42727,
        "dps": 185,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "halatali",
    "name": "Halatali",
    "chapter": 1,
    "reqLevel": 20,
    "reqItemLevel": 0,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 10733,
        "dps": 123,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 12343,
        "dps": 130,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 13953,
        "dps": 138,
        "boss": false
      },
      {
        "name": "Halatali · 守关者",
        "hp": 45079,
        "dps": 203,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "the-thousand-maws-of-toto-rak",
    "name": "The Thousand Maws of Toto-Rak",
    "chapter": 1,
    "reqLevel": 24,
    "reqItemLevel": 0,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 11480,
        "dps": 138,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 13202,
        "dps": 146,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 14924,
        "dps": 154,
        "boss": false
      },
      {
        "name": "The Thousand Maws of Toto-Rak · 守关者",
        "hp": 48216,
        "dps": 227,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "haukke-manor",
    "name": "Haukke Manor",
    "chapter": 1,
    "reqLevel": 28,
    "reqItemLevel": 0,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 12227,
        "dps": 153,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 14061,
        "dps": 162,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 15895,
        "dps": 171,
        "boss": false
      },
      {
        "name": "Haukke Manor · 守关者",
        "hp": 51353,
        "dps": 252,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "brayfloxs-longstop",
    "name": "Brayflox's Longstop",
    "chapter": 1,
    "reqLevel": 32,
    "reqItemLevel": 0,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 12973,
        "dps": 168,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 14919,
        "dps": 178,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 16865,
        "dps": 187,
        "boss": false
      },
      {
        "name": "Brayflox's Longstop · 守关者",
        "hp": 54487,
        "dps": 276,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "the-sunken-temple-of-qarn",
    "name": "The Sunken Temple of Qarn",
    "chapter": 1,
    "reqLevel": 35,
    "reqItemLevel": 0,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 13533,
        "dps": 179,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 15563,
        "dps": 189,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 17593,
        "dps": 200,
        "boss": false
      },
      {
        "name": "The Sunken Temple of Qarn · 守关者",
        "hp": 56839,
        "dps": 294,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "cutters-cry",
    "name": "Cutter's Cry",
    "chapter": 1,
    "reqLevel": 38,
    "reqItemLevel": 0,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 14093,
        "dps": 190,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 16207,
        "dps": 201,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 18321,
        "dps": 212,
        "boss": false
      },
      {
        "name": "Cutter's Cry · 守关者",
        "hp": 59191,
        "dps": 313,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "the-stone-vigil",
    "name": "The Stone Vigil",
    "chapter": 1,
    "reqLevel": 41,
    "reqItemLevel": 0,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 14653,
        "dps": 201,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 16851,
        "dps": 213,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 19049,
        "dps": 225,
        "boss": false
      },
      {
        "name": "The Stone Vigil · 守关者",
        "hp": 61543,
        "dps": 331,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "dzemael-darkhold",
    "name": "Dzemael Darkhold",
    "chapter": 1,
    "reqLevel": 44,
    "reqItemLevel": 0,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 15213,
        "dps": 212,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 17495,
        "dps": 225,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 19777,
        "dps": 237,
        "boss": false
      },
      {
        "name": "Dzemael Darkhold · 守关者",
        "hp": 63895,
        "dps": 349,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "the-aurum-vale",
    "name": "The Aurum Vale",
    "chapter": 1,
    "reqLevel": 47,
    "reqItemLevel": 0,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 15773,
        "dps": 223,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 18139,
        "dps": 236,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 20505,
        "dps": 249,
        "boss": false
      },
      {
        "name": "The Aurum Vale · 守关者",
        "hp": 66247,
        "dps": 368,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "castrum-meridianum",
    "name": "Castrum Meridianum",
    "chapter": 1,
    "reqLevel": 50,
    "reqItemLevel": 42,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 13533,
        "dps": 234,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 15563,
        "dps": 248,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 17593,
        "dps": 262,
        "boss": false
      },
      {
        "name": "Castrum Meridianum · 守关者",
        "hp": 56839,
        "dps": 386,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "the-praetorium",
    "name": "The Praetorium",
    "chapter": 1,
    "reqLevel": 50,
    "reqItemLevel": 42,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 13533,
        "dps": 234,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 15563,
        "dps": 248,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 17593,
        "dps": 262,
        "boss": false
      },
      {
        "name": "The Praetorium · 守关者",
        "hp": 56839,
        "dps": 386,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "amdapor-keep",
    "name": "Amdapor Keep",
    "chapter": 1,
    "reqLevel": 50,
    "reqItemLevel": 45,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 14000,
        "dps": 234,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 16100,
        "dps": 248,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 18200,
        "dps": 262,
        "boss": false
      },
      {
        "name": "Amdapor Keep · 守关者",
        "hp": 58800,
        "dps": 386,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "the-wanderers-palace",
    "name": "The Wanderer's Palace",
    "chapter": 1,
    "reqLevel": 50,
    "reqItemLevel": 45,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 14000,
        "dps": 234,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 16100,
        "dps": 248,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 18200,
        "dps": 262,
        "boss": false
      },
      {
        "name": "The Wanderer's Palace · 守关者",
        "hp": 58800,
        "dps": 386,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "copperbell-mines-hard",
    "name": "Copperbell Mines (Hard)",
    "chapter": 1,
    "reqLevel": 50,
    "reqItemLevel": 48,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 14467,
        "dps": 234,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 16637,
        "dps": 248,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 18807,
        "dps": 262,
        "boss": false
      },
      {
        "name": "Copperbell Mines (Hard) · 守关者",
        "hp": 60761,
        "dps": 386,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "haukke-manor-hard",
    "name": "Haukke Manor (Hard)",
    "chapter": 1,
    "reqLevel": 50,
    "reqItemLevel": 48,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 14467,
        "dps": 234,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 16637,
        "dps": 248,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 18807,
        "dps": 262,
        "boss": false
      },
      {
        "name": "Haukke Manor (Hard) · 守关者",
        "hp": 60761,
        "dps": 386,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "pharos-sirius",
    "name": "Pharos Sirius",
    "chapter": 1,
    "reqLevel": 50,
    "reqItemLevel": 48,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 14467,
        "dps": 234,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 16637,
        "dps": 248,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 18807,
        "dps": 262,
        "boss": false
      },
      {
        "name": "Pharos Sirius · 守关者",
        "hp": 60761,
        "dps": 386,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "brayfloxs-longstop-hard",
    "name": "Brayflox's Longstop (Hard)",
    "chapter": 1,
    "reqLevel": 50,
    "reqItemLevel": 55,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 15556,
        "dps": 234,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 17889,
        "dps": 248,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 20223,
        "dps": 262,
        "boss": false
      },
      {
        "name": "Brayflox's Longstop (Hard) · 守关者",
        "hp": 65335,
        "dps": 386,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "halatali-hard",
    "name": "Halatali (Hard)",
    "chapter": 1,
    "reqLevel": 50,
    "reqItemLevel": 55,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 15556,
        "dps": 234,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 17889,
        "dps": 248,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 20223,
        "dps": 262,
        "boss": false
      },
      {
        "name": "Halatali (Hard) · 守关者",
        "hp": 65335,
        "dps": 386,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "the-lost-city-of-amdapor",
    "name": "The Lost City of Amdapor",
    "chapter": 1,
    "reqLevel": 50,
    "reqItemLevel": 55,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 15556,
        "dps": 234,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 17889,
        "dps": 248,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 20223,
        "dps": 262,
        "boss": false
      },
      {
        "name": "The Lost City of Amdapor · 守关者",
        "hp": 65335,
        "dps": 386,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "hullbreaker-isle",
    "name": "Hullbreaker Isle",
    "chapter": 1,
    "reqLevel": 50,
    "reqItemLevel": 70,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 17889,
        "dps": 234,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 20572,
        "dps": 248,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 23256,
        "dps": 262,
        "boss": false
      },
      {
        "name": "Hullbreaker Isle · 守关者",
        "hp": 75134,
        "dps": 386,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "the-stone-vigil-hard",
    "name": "The Stone Vigil (Hard)",
    "chapter": 1,
    "reqLevel": 50,
    "reqItemLevel": 70,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 17889,
        "dps": 234,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 20572,
        "dps": 248,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 23256,
        "dps": 262,
        "boss": false
      },
      {
        "name": "The Stone Vigil (Hard) · 守关者",
        "hp": 75134,
        "dps": 386,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "the-tam-tara-deepcroft-hard",
    "name": "The Tam-Tara Deepcroft (Hard)",
    "chapter": 1,
    "reqLevel": 50,
    "reqItemLevel": 70,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 17889,
        "dps": 234,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 20572,
        "dps": 248,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 23256,
        "dps": 262,
        "boss": false
      },
      {
        "name": "The Tam-Tara Deepcroft (Hard) · 守关者",
        "hp": 75134,
        "dps": 386,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "sastasha-hard",
    "name": "Sastasha (Hard)",
    "chapter": 1,
    "reqLevel": 50,
    "reqItemLevel": 80,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 19444,
        "dps": 234,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 22361,
        "dps": 248,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 25277,
        "dps": 262,
        "boss": false
      },
      {
        "name": "Sastasha (Hard) · 守关者",
        "hp": 81665,
        "dps": 386,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "snowcloak",
    "name": "Snowcloak",
    "chapter": 1,
    "reqLevel": 50,
    "reqItemLevel": 80,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 19444,
        "dps": 234,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 22361,
        "dps": 248,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 25277,
        "dps": 262,
        "boss": false
      },
      {
        "name": "Snowcloak · 守关者",
        "hp": 81665,
        "dps": 386,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "the-sunken-temple-of-qarn-hard",
    "name": "The Sunken Temple of Qarn (Hard)",
    "chapter": 1,
    "reqLevel": 50,
    "reqItemLevel": 80,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 19444,
        "dps": 234,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 22361,
        "dps": 248,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 25277,
        "dps": 262,
        "boss": false
      },
      {
        "name": "The Sunken Temple of Qarn (Hard) · 守关者",
        "hp": 81665,
        "dps": 386,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "amdapor-keep-hard",
    "name": "Amdapor Keep (Hard)",
    "chapter": 1,
    "reqLevel": 50,
    "reqItemLevel": 90,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 21000,
        "dps": 234,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 24150,
        "dps": 248,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 27300,
        "dps": 262,
        "boss": false
      },
      {
        "name": "Amdapor Keep (Hard) · 守关者",
        "hp": 88200,
        "dps": 386,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "the-keeper-of-the-lake",
    "name": "The Keeper of the Lake",
    "chapter": 1,
    "reqLevel": 50,
    "reqItemLevel": 90,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 21000,
        "dps": 234,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 24150,
        "dps": 248,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 27300,
        "dps": 262,
        "boss": false
      },
      {
        "name": "The Keeper of the Lake · 守关者",
        "hp": 88200,
        "dps": 386,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "the-wanderers-palace-hard",
    "name": "The Wanderer's Palace (Hard)",
    "chapter": 1,
    "reqLevel": 50,
    "reqItemLevel": 90,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 21000,
        "dps": 234,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 24150,
        "dps": 248,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 27300,
        "dps": 262,
        "boss": false
      },
      {
        "name": "The Wanderer's Palace (Hard) · 守关者",
        "hp": 88200,
        "dps": 386,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "the-dusk-vigil",
    "name": "The Dusk Vigil",
    "chapter": 2,
    "reqLevel": 51,
    "reqItemLevel": 100,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 22556,
        "dps": 238,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 25939,
        "dps": 252,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 29323,
        "dps": 266,
        "boss": false
      },
      {
        "name": "The Dusk Vigil · 守关者",
        "hp": 94735,
        "dps": 392,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "sohm-al",
    "name": "Sohm Al",
    "chapter": 2,
    "reqLevel": 53,
    "reqItemLevel": 105,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 23333,
        "dps": 245,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 26833,
        "dps": 260,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 30333,
        "dps": 274,
        "boss": false
      },
      {
        "name": "Sohm Al · 守关者",
        "hp": 97999,
        "dps": 404,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "the-aery",
    "name": "The Aery",
    "chapter": 2,
    "reqLevel": 55,
    "reqItemLevel": 110,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 24111,
        "dps": 253,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 27728,
        "dps": 268,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 31344,
        "dps": 283,
        "boss": false
      },
      {
        "name": "The Aery · 守关者",
        "hp": 101266,
        "dps": 416,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "the-vault",
    "name": "The Vault",
    "chapter": 2,
    "reqLevel": 57,
    "reqItemLevel": 115,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 24889,
        "dps": 260,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 28622,
        "dps": 276,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 32356,
        "dps": 291,
        "boss": false
      },
      {
        "name": "The Vault · 守关者",
        "hp": 104534,
        "dps": 429,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "the-great-gubal-library",
    "name": "The Great Gubal Library",
    "chapter": 2,
    "reqLevel": 59,
    "reqItemLevel": 120,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 25667,
        "dps": 268,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 29517,
        "dps": 283,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 33367,
        "dps": 299,
        "boss": false
      },
      {
        "name": "The Great Gubal Library · 守关者",
        "hp": 107801,
        "dps": 441,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "the-aetherochemical-research-facility",
    "name": "The Aetherochemical Research Facility",
    "chapter": 2,
    "reqLevel": 60,
    "reqItemLevel": 142,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 29089,
        "dps": 271,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 33452,
        "dps": 287,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 37816,
        "dps": 303,
        "boss": false
      },
      {
        "name": "The Aetherochemical Research Facility · 守关者",
        "hp": 122174,
        "dps": 447,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "neverreap",
    "name": "Neverreap",
    "chapter": 2,
    "reqLevel": 60,
    "reqItemLevel": 145,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 29556,
        "dps": 271,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 33989,
        "dps": 287,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 38423,
        "dps": 303,
        "boss": false
      },
      {
        "name": "Neverreap · 守关者",
        "hp": 124135,
        "dps": 447,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "the-fractal-continuum",
    "name": "The Fractal Continuum",
    "chapter": 2,
    "reqLevel": 60,
    "reqItemLevel": 145,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 29556,
        "dps": 271,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 33989,
        "dps": 287,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 38423,
        "dps": 303,
        "boss": false
      },
      {
        "name": "The Fractal Continuum · 守关者",
        "hp": 124135,
        "dps": 447,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "pharos-sirius-hard",
    "name": "Pharos Sirius (Hard)",
    "chapter": 2,
    "reqLevel": 60,
    "reqItemLevel": 170,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 33444,
        "dps": 271,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 38461,
        "dps": 287,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 43477,
        "dps": 303,
        "boss": false
      },
      {
        "name": "Pharos Sirius (Hard) · 守关者",
        "hp": 140465,
        "dps": 447,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "saint-mociannes-arboretum",
    "name": "Saint Mocianne's Arboretum",
    "chapter": 2,
    "reqLevel": 60,
    "reqItemLevel": 170,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 33444,
        "dps": 271,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 38461,
        "dps": 287,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 43477,
        "dps": 303,
        "boss": false
      },
      {
        "name": "Saint Mocianne's Arboretum · 守关者",
        "hp": 140465,
        "dps": 447,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "the-antitower",
    "name": "The Antitower",
    "chapter": 2,
    "reqLevel": 60,
    "reqItemLevel": 180,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 35000,
        "dps": 271,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 40250,
        "dps": 287,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 45500,
        "dps": 303,
        "boss": false
      },
      {
        "name": "The Antitower · 守关者",
        "hp": 147000,
        "dps": 447,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "the-lost-city-of-amdapor-hard",
    "name": "The Lost City of Amdapor (Hard)",
    "chapter": 2,
    "reqLevel": 60,
    "reqItemLevel": 180,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 35000,
        "dps": 271,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 40250,
        "dps": 287,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 45500,
        "dps": 303,
        "boss": false
      },
      {
        "name": "The Lost City of Amdapor (Hard) · 守关者",
        "hp": 147000,
        "dps": 447,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "hullbreaker-isle-hard",
    "name": "Hullbreaker Isle (Hard)",
    "chapter": 2,
    "reqLevel": 60,
    "reqItemLevel": 200,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 38111,
        "dps": 271,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 43828,
        "dps": 287,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 49544,
        "dps": 303,
        "boss": false
      },
      {
        "name": "Hullbreaker Isle (Hard) · 守关者",
        "hp": 160066,
        "dps": 447,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "sohr-khai",
    "name": "Sohr Khai",
    "chapter": 2,
    "reqLevel": 60,
    "reqItemLevel": 200,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 38111,
        "dps": 271,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 43828,
        "dps": 287,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 49544,
        "dps": 303,
        "boss": false
      },
      {
        "name": "Sohr Khai · 守关者",
        "hp": 160066,
        "dps": 447,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "the-great-gubal-library-hard",
    "name": "The Great Gubal Library (Hard)",
    "chapter": 2,
    "reqLevel": 60,
    "reqItemLevel": 210,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 39667,
        "dps": 271,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 45617,
        "dps": 287,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 51567,
        "dps": 303,
        "boss": false
      },
      {
        "name": "The Great Gubal Library (Hard) · 守关者",
        "hp": 166601,
        "dps": 447,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "xelphatol",
    "name": "Xelphatol",
    "chapter": 2,
    "reqLevel": 60,
    "reqItemLevel": 210,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 39667,
        "dps": 271,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 45617,
        "dps": 287,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 51567,
        "dps": 303,
        "boss": false
      },
      {
        "name": "Xelphatol · 守关者",
        "hp": 166601,
        "dps": 447,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "baelsars-wall",
    "name": "Baelsar's Wall",
    "chapter": 2,
    "reqLevel": 60,
    "reqItemLevel": 230,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 42778,
        "dps": 271,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 49195,
        "dps": 287,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 55611,
        "dps": 303,
        "boss": false
      },
      {
        "name": "Baelsar's Wall · 守关者",
        "hp": 179668,
        "dps": 447,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "sohm-al-hard",
    "name": "Sohm Al (Hard)",
    "chapter": 2,
    "reqLevel": 60,
    "reqItemLevel": 230,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 42778,
        "dps": 271,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 49195,
        "dps": 287,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 55611,
        "dps": 303,
        "boss": false
      },
      {
        "name": "Sohm Al (Hard) · 守关者",
        "hp": 179668,
        "dps": 447,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "the-sirensong-sea",
    "name": "The Sirensong Sea",
    "chapter": 3,
    "reqLevel": 61,
    "reqItemLevel": 240,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 44333,
        "dps": 275,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 50983,
        "dps": 291,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 57633,
        "dps": 307,
        "boss": false
      },
      {
        "name": "The Sirensong Sea · 守关者",
        "hp": 186199,
        "dps": 453,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "shisui-of-the-violet-tides",
    "name": "Shisui of the Violet Tides",
    "chapter": 3,
    "reqLevel": 63,
    "reqItemLevel": 245,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 45111,
        "dps": 282,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 51878,
        "dps": 299,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 58644,
        "dps": 316,
        "boss": false
      },
      {
        "name": "Shisui of the Violet Tides · 守关者",
        "hp": 189466,
        "dps": 465,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "bardams-mettle",
    "name": "Bardam's Mettle",
    "chapter": 3,
    "reqLevel": 65,
    "reqItemLevel": 250,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 45889,
        "dps": 290,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 52772,
        "dps": 307,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 59656,
        "dps": 324,
        "boss": false
      },
      {
        "name": "Bardam's Mettle · 守关者",
        "hp": 192734,
        "dps": 477,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "doma-castle",
    "name": "Doma Castle",
    "chapter": 3,
    "reqLevel": 67,
    "reqItemLevel": 255,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 46667,
        "dps": 297,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 53667,
        "dps": 315,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 60667,
        "dps": 332,
        "boss": false
      },
      {
        "name": "Doma Castle · 守关者",
        "hp": 196001,
        "dps": 490,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "castrum-abania",
    "name": "Castrum Abania",
    "chapter": 3,
    "reqLevel": 69,
    "reqItemLevel": 260,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 47444,
        "dps": 305,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 54561,
        "dps": 323,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 61677,
        "dps": 340,
        "boss": false
      },
      {
        "name": "Castrum Abania · 守关者",
        "hp": 199265,
        "dps": 502,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "ala-mhigo",
    "name": "Ala Mhigo",
    "chapter": 3,
    "reqLevel": 70,
    "reqItemLevel": 280,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 50556,
        "dps": 308,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 58139,
        "dps": 326,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 65723,
        "dps": 345,
        "boss": false
      },
      {
        "name": "Ala Mhigo · 守关者",
        "hp": 212335,
        "dps": 508,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "kugane-castle",
    "name": "Kugane Castle",
    "chapter": 3,
    "reqLevel": 70,
    "reqItemLevel": 280,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 50556,
        "dps": 308,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 58139,
        "dps": 326,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 65723,
        "dps": 345,
        "boss": false
      },
      {
        "name": "Kugane Castle · 守关者",
        "hp": 212335,
        "dps": 508,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "the-temple-of-the-fist",
    "name": "The Temple of the Fist",
    "chapter": 3,
    "reqLevel": 70,
    "reqItemLevel": 280,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 50556,
        "dps": 308,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 58139,
        "dps": 326,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 65723,
        "dps": 345,
        "boss": false
      },
      {
        "name": "The Temple of the Fist · 守关者",
        "hp": 212335,
        "dps": 508,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "the-drowned-city-of-skalla",
    "name": "The Drowned City of Skalla",
    "chapter": 3,
    "reqLevel": 70,
    "reqItemLevel": 300,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 53667,
        "dps": 308,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 61717,
        "dps": 326,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 69767,
        "dps": 345,
        "boss": false
      },
      {
        "name": "The Drowned City of Skalla · 守关者",
        "hp": 225401,
        "dps": 508,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "hells-lid",
    "name": "Hells' Lid",
    "chapter": 3,
    "reqLevel": 70,
    "reqItemLevel": 310,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 55222,
        "dps": 308,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 63505,
        "dps": 326,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 71789,
        "dps": 345,
        "boss": false
      },
      {
        "name": "Hells' Lid · 守关者",
        "hp": 231932,
        "dps": 508,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "the-fractal-continuum-hard",
    "name": "The Fractal Continuum (Hard)",
    "chapter": 3,
    "reqLevel": 70,
    "reqItemLevel": 310,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 55222,
        "dps": 308,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 63505,
        "dps": 326,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 71789,
        "dps": 345,
        "boss": false
      },
      {
        "name": "The Fractal Continuum (Hard) · 守关者",
        "hp": 231932,
        "dps": 508,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "the-swallows-compass",
    "name": "The Swallow's Compass",
    "chapter": 3,
    "reqLevel": 70,
    "reqItemLevel": 330,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 58333,
        "dps": 308,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 67083,
        "dps": 326,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 75833,
        "dps": 345,
        "boss": false
      },
      {
        "name": "The Swallow's Compass · 守关者",
        "hp": 244999,
        "dps": 508,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "saint-mociannes-arboretum-hard",
    "name": "Saint Mocianne's Arboretum (Hard)",
    "chapter": 3,
    "reqLevel": 70,
    "reqItemLevel": 340,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 59889,
        "dps": 308,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 68872,
        "dps": 326,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 77856,
        "dps": 345,
        "boss": false
      },
      {
        "name": "Saint Mocianne's Arboretum (Hard) · 守关者",
        "hp": 251534,
        "dps": 508,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "the-burn",
    "name": "The Burn",
    "chapter": 3,
    "reqLevel": 70,
    "reqItemLevel": 340,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 59889,
        "dps": 308,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 68872,
        "dps": 326,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 77856,
        "dps": 345,
        "boss": false
      },
      {
        "name": "The Burn · 守关者",
        "hp": 251534,
        "dps": 508,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  },
  {
    "id": "the-ghimlyt-dark",
    "name": "The Ghimlyt Dark",
    "chapter": 3,
    "reqLevel": 70,
    "reqItemLevel": 360,
    "enemies": [
      {
        "name": "巡逻的魔物",
        "hp": 63000,
        "dps": 308,
        "boss": false
      },
      {
        "name": "守卫石像",
        "hp": 72450,
        "dps": 326,
        "boss": false
      },
      {
        "name": "精英爪牙",
        "hp": 81900,
        "dps": 345,
        "boss": false
      },
      {
        "name": "The Ghimlyt Dark · 守关者",
        "hp": 264600,
        "dps": 508,
        "boss": true
      }
    ],
    "maxDurationSec": 240
  }
];

export const DUNGEON_BY_ID: Record<string, DungeonDef> = Object.fromEntries(
  DUNGEONS.map((d) => [d.id, d]),
);

export const DUNGEONS_BY_CHAPTER: Record<number, DungeonDef[]> = DUNGEONS.reduce(
  (acc, d) => {
    (acc[d.chapter] ??= []).push(d);
    return acc;
  },
  {} as Record<number, DungeonDef[]>,
);
