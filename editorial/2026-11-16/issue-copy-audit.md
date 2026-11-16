# 2026-11-16｜35 条专题文案 Issues 合入后的源码复核与勘误

> **状态：源代码和文案对照审计；不是 CK3 游戏内验收报告。**
> 范围：`ShengQuan-Web-Assets` 的 Issues #3–#37、Muse 唯一入口 `index.html` 中 `site-data` 的 30 个主题路由和 5 个职业条目、对应 `topics/*.html` 资料页。
> 基准：圣泉模组仓库 `main`（descriptor 为 V3.1.6）及 `release/3.1.6.1`（龙角等更新），混沌独立仓库 `CK3Chaos/main`；**没有**将 GitHub 分支名称当作 Steam 工坊已发布凭证。

## 结论与合入方式

- 35 条专题文案 Issue 已在本轮开始前全部关闭且标记为完成；其正文已由多次提交写入 GitHub `main`，不是等待初次导入的 35 份补丁。
- 本轮**只改错误和证据过度延伸的表述**：主站统一 `story` 与 `narrative`，对应独立专题页定点纠正。没有覆盖完整最新 `index.html`，没有删除 35 篇长文或历史版本公告，也没有加入额外的 Muse 依赖。
- 2026-11-15 的 `editorial/all_articles.md` 是历史连续稿，其过时内容应以本勘误和最新网站版本为准；保留原稿供前后对照。

## 关键问题、证据与改动

| 对应 Issue / 条目 | 审验依据与语义修复 |
| --- | --- |
| #8 `m7` 圣泉之约 | `common/game_rules/01_jic_center_game_rules.txt` 默认 5 年，选项还含 1/10 年；`events/jic_qiandao_events.txt` 有继承转移入口，但不能推断所有单抽、十连和刮刮乐的个人免单 flag 均无条件传承。删除“35 年固定”和“全部免单权益无缝继承”的保证。 |
| #3 `m8` 学院 | `common/story_cycles/shengquanxueyuan_story_cycles.txt` 蒙养学段结算可授予强牵制；`common/character_interactions/jic_shengquan_xueyuan_interaction.txt` 在符合条件的 300 金币特招时也有强牵制。不能说“每名学生最终毕业才颁发”或“特招必然保证毕业”。 |
| #4 `m9` 骑士团 | `common/character_interactions/jic_shengquanqishituan_interaction.txt` 有“召集加入战争”主动交互（含 `auto_accept`）；**交互自动接受**不是**每场战争自动参战**。 |
| #26 `m11` 药剂师 | `common/scripted_triggers/jic_apothecary_implant_triggers.txt` 与 `common/script_values/jic_apothecary_implant_values.txt` 显示植入医师需个人 80 储备、主持方需 500 虔诚；退款按步骤计算，不能笼统保证“未用部分全部退回”。 |
| #15 `m16` 精钢军械 | `common/scripted_effects/jic_artifact_set_effects.txt` 有 **14 个直接创建种类**，另有旧胸甲的第 15 种识别/重铸处理；历史版本中“15 类”与当前“14 种可新造”是不同统计口径。 |
| #28–#31 `c2–c5` 混沌 | `CK3Chaos/README.md` 明确是**待游戏验收的开发测试候选**；血潮结果在 `mod/common/scripted_effects/sq_chaos_bloodtide_war_effects.txt` 按宣战时记录及胜利时所有权判断，不凭占领城堡数量自动全域征服。污染强度与清理有多种路径，地图红雾/漩涡未做完整游戏画面验收。 |
| #27 `c1` 信仰 | `mod/localization/simp_chinese/sq_chaos_worship_l_simp_chinese.yml` 支持秘密/公开区分；移除把秘密一被侦破就必然发生某一刑罚的过度推断。 |
| #33 `armour` 外观 | 主模组默认关闭扩展触发接口，不等于所有军团/职业/男女铠甲模型已经制作、上架或完美兼容。 |
| #35 `migration`、#32 `m14` | 旧 on_action 空存根表示旧机制退役/保留入口，不代表升级无红字、旧档绝对兼容或混沌运行已验收。 |
| #36 `status`、#34 `m21` | `CK3-ShengQuan-Legend/main` descriptor 为 V3.1.6；另有 `release/3.1.6.1` 分支和网站 V3.1.6.1 公告，三者不能自行证明 Steam 工坊当前已同步更新。 |
| #37 `unknown` FAQ | `common/scripted_triggers/jic_ascension_ui_triggers.txt` 和 `jic_apothecary_implant_triggers.txt` 要求合格患者 16–24 岁、在廷、健康/状态等门槛；**没有必须未婚的检查**。删除该虚构门槛，也不再声称“解决 99% 的疑难”。 |

## 源码定位（需根据后续版本重新核验）

**圣泉：**
- [学院入学交互](https://github.com/jqkj/CK3-ShengQuan-Legend/blob/release/3.1.6.1/common/character_interactions/jic_shengquan_xueyuan_interaction.txt)
- [学院学段结算](https://github.com/jqkj/CK3-ShengQuan-Legend/blob/release/3.1.6.1/common/story_cycles/shengquanxueyuan_story_cycles.txt)
- [骑士团交互](https://github.com/jqkj/CK3-ShengQuan-Legend/blob/release/3.1.6.1/common/character_interactions/jic_shengquanqishituan_interaction.txt)
- [植入患者与医师资格](https://github.com/jqkj/CK3-ShengQuan-Legend/blob/release/3.1.6.1/common/scripted_triggers/jic_apothecary_implant_triggers.txt)
- [植入报价与退款值](https://github.com/jqkj/CK3-ShengQuan-Legend/blob/release/3.1.6.1/common/script_values/jic_apothecary_implant_values.txt)
- [精钢种类与重铸](https://github.com/jqkj/CK3-ShengQuan-Legend/blob/release/3.1.6.1/common/scripted_effects/jic_artifact_set_effects.txt)
- [圣泉之约冷却规则](https://github.com/jqkj/CK3-ShengQuan-Legend/blob/release/3.1.6.1/common/game_rules/01_jic_center_game_rules.txt)

**混沌：**
- [候选状态与未通过的验收](https://github.com/jqkj/CK3Chaos/blob/main/README.md)
- [污染处理](https://github.com/jqkj/CK3Chaos/blob/main/mod/common/scripted_effects/sq_chaos_pollution_effects.txt)
- [血潮战争结算](https://github.com/jqkj/CK3Chaos/blob/main/mod/common/scripted_effects/sq_chaos_bloodtide_war_effects.txt)

## 验收边界

1. **可确认**：文案与已读源码不矛盾、主站 30 个主题与 5 个职业保持完整、专题页有对应文件、版本档案独立保留、Muse 入口没有新增外部必需 JS/CSS。
2. **不可冒称**：完整 CK3 游戏内行为通过；老档、军队交接、粒子特效/多天气和模型兼容均通过；Steam 工坊已经发布 GitHub 分支内容；GitHub 更新自动同步 Muse。
3. 旧文稿中未逐项核实的技能数值与宣传口径，仍应在后续版本变更时按对应代码与实机重新复核。不要以“已关闭 Issue”取代验收。
