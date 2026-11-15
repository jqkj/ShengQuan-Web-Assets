# 圣泉介绍站 V9.1 · 实装源码对照记录

基线：`jqkj/CK3-ShengQuan-Legend@22f201537364fbf2a1182abc43ca00d07b1f93ed`（V3.1.6 main）；审校日期 2026-11-15。只修改介绍站文案与证据链接，未修改游戏脚本。

| 主题 | 对照结果 | 源文件 |
| --- | --- | --- |
| `m2` 泉水血脉 | 浓度变迁默认近亲家庭；与 V3.1.6.1 龙角可见范围默认宗族不同 | `common/game_rules/01_jic_center_game_rules.txt`, `common/scripted_triggers/jic_quanshui_triggers.txt` |
| `m7` 圣泉之约 | 领取七印的间隔为1／5／10年、默认5年，非每年或每七年必完成 | `common/game_rules/01_jic_center_game_rules.txt`, `common/scripted_effects/jic_qiandao_reward_effect.txt` |
| `m5` 刮刮乐 | 普通一轮500金币；可用免费权益替代 | `common/customizable_localization/jic_guaguale_loc.txt` |
| `m12` 龙泉军势 | 五阶家族志向逐次解锁十种定义兵种 | `common/house_aspirations/jic_tgp_celestial_house_powers.txt`, `common/men_at_arms_types/jic_tianchaoyuyong_maa_types.txt` |
| `m15` 圣泉功业 | 暂停清理已有委托、恢复重新张榜，不是暂停冻结 | `common/scripted_guis/jic_oath_board_control_sgui.txt` |

## 龙泉兵种阶段

I：龙泉刀盾手、龙泉长戟兵；II 增加龙泉轻骑兵、龙泉轻弩手；III 增加龙泉斩马刀队、重甲龙泉弩手；IV 增加俑士龙泉禁卫、天庭龙卫神弩卫与盾戟卫；V 增加崇唐。来源：`common/house_aspirations/jic_tgp_celestial_house_powers.txt` 和 `localization/simp_chinese/shengquanchuanshuo_longquan_l_simp_chinese.yml`。这是源码招募许可，非已组建军队，亦非实机平衡验证。

## 未处理的跨仓库风险

- 主模组 `localization/simp_chinese/jic_qiandao_l_simp_chinese.yml` 的 `quanshui_qiandao_tooltip` 仍写「每七年可完成一轮七封印签到」，与现行游戏规则不一致；本轮只改网站，没有擅改主模组。
- 龙角 `release/3.1.6.1` 不与 V3.1.6 `main` 强行视为同一实现；混沌候选、铠甲独立包和规划中的骑士王维持原状态。
- 站点 `site-data` 以外内容未修改，30主题路由、5职业及图片保持；JSON 与 source_ids 已静态校验。未做 CK3 游戏实机、浏览器交互、完整英文翻译或 Muse 发布。
