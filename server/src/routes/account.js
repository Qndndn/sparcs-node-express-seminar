const express = require('express');
const AccountModel = require('../model/account.js');
const router = express.Router();

class AccountDB {
    static _inst_;
    static getInst = () => {
        if (!AccountDB._inst_) AccountDB._inst_ = new AccountDB();
        return AccountDB._inst_;
    }

    constructor() { console.log("[Account-DB] DB Init Completed"); }

	register = async (id, password, name, roomnum) => {
		try {
            const user = await AccountModel.findOne({ id }) // 첫번째 요소만 보는 mongo db 검색 명령어
			if (user !== null) return { success: false, code: 400, data: "Already used id" };
            const newUser = new AccountModel({ id, password, name, roomnum });
			await newUser.save();

			return { success: true };
		} catch (e) {
			console.log(`[AccountDB] register call failed: DB Error - ${ e }`);

			return { success: false, code: 500, data: "DB Error" };
		}
	};

	login = async (id, password) => {
		try {
			const user = await AccountModel.findOne({ id });
			if (user === null) return { success: false, code: 400, data: "Nothing found id" };

			const result = bcrypt.compareSync(password, user.password);
			if (!result) return { success: false, code: 400, data: "Incorrect password" };

		} catch (e) {
			console.log(`[AccountDB] login call failed: DB Error - ${ e }`);

			return { success: false, code: 500, data: "DB Error" };
		}
	};
}
// 400: 잘못된 문법으로 서버가 요청을 이해할 수 없다
// 500: 처리할 수 없는 내부 오류 발생

const AccountDBInst = AccountDB.getInst();

router.post('/signup', async (req, res) => {
    try {
        const id = await AccountDBInst.insertUser(req.body);
        if (!id) return res.status(400).json({ error: "Nothing found" })
        else return res.status(200).json({ isOK: true });
    } catch (e) {
        return res.status(500).json({ error: e });
    }
});

router.post("/login", async (req, res) => {
    try {
            console.log(1)
            const id = req.body.id;
            const password = req.body.password;
            if (!id) return res.status(400).json({ error: "Empty id" })
            else if (!password) return res.status(400).json({ error: "Empty password" });
            else return res.status(200).json({ isOK: true })
    } catch (e) {
            return res.status(500).json({ error: e });
    }
});

module.exports = router;