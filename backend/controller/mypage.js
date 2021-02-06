const {
  SELECT_BASIC_INFO,
  SELECT_BASIC_PICK_INFO,
  SELECT_DETAIL_PICK_INFO,
  SELECT_BASIC_BUY_INFO,
  SELECT_DETAIL_BUY_INFO,
  SELECT_REGISTER_INFO,
} = require("../query");
const { getToday, exportsValue, minusArray } = require("../lib");

exports.mypageAPI = async (req, res) => {
  try {
    const user_id = res.user_id;

    // basic user 정보
    let basic_info = await res.pool.query(SELECT_BASIC_INFO, [user_id]);
    basic_info = basic_info[0][0];

    // user가 뽑은 idea
    let pick = await res.pool.query(SELECT_BASIC_PICK_INFO, [user_id]);
    let pick_idea_id = await exportsValue(pick[0], "idea_id");

    // user가 구입한 idea
    let buy = await res.pool.query(SELECT_BASIC_BUY_INFO, [user_id]);
    let buy_idea_id = await exportsValue(buy[0], "idea_id");

    pick_idea_id = await minusArray(pick_idea_id, buy_idea_id); // 뽑은 것 중 구입한 것은 제외

    let pick_info = [];
    for (let i = 0; i < pick_idea_id.length; i++) {
      let info = await res.pool.query(SELECT_DETAIL_PICK_INFO, [
        pick_idea_id[i],
      ]);
      info = info[0];
      // pick_tmp = {...pick[0][i], ...info[0]}
      pick_tmp = { ...info[0], idea_id: pick_idea_id[i] };
      pick_info.push(pick_tmp);
    }

    // user가 구입한 idea
    let buy_info = [];
    for (let i = 0; i < buy_idea_id.length; i++) {
      let info = await res.pool.query(SELECT_DETAIL_BUY_INFO, [buy_idea_id[i]]);
      info = info[0];
      buy_tmp = { ...buy[0][i], ...info[0] };
      buy_info.push(buy_tmp);
    }

    // user가 등록한 idea
    let register_info = await res.pool.query(SELECT_REGISTER_INFO, [user_id]);
    register_info = register_info[0];

    // 오늘 뽑은 횟수
    const today = await getToday();
    let free = await res.pool.query(
      `SELECT COUNT(*) FROM PickIdeas WHERE user_id = ? AND pick_at = ?;`,
      [user_id, today]
    );
    let free_count = 3 - free[0][0]["COUNT(*)"];
    // console.log('free count : ', free_count)
    console.log(`my page success`);

    res.status(200).json({
      msg: "mypage info",
      basic: basic_info,
      pick: pick_info,
      buy: buy_info,
      register: register_info,
      free: free_count,
    });
  } catch (e) {
    console.log(`mypage e`);
    console.log(e);
    res.status(400).json({ msg: "mypage error" });
  }
};
