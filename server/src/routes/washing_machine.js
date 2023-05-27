// 세탁기 선택 (층, 방향, 위치)
// 선택한 세탁기에 예약 하기 (이름, 방호수, 시간, 할말)
// 알림 보내기 (세탁 시간 되면 알람, 끝나면 알람 )

const express = require('express');
const Washing_MachineModel = require('../model/washing_machine.js');

const router = express.Router();

class Washing_MachineDB {
    static _inst_;
    static getInst = () => {
        if (!Washing_MachineDB._inst_) Washing_Machine._inst_ = new Washing_MachineDB();
        return Washing_MachineDB._inst_;
    }
    constructor() { console.log("[Washing_Machine-DB] DB Init Completed"); }

	select = async (item) => {
        const { floor, direction, location } = item;
        try {
            const newItem = new Washing_MachineModel({floor, direction, location});
            const res = await newItem.save();
			return { success: true };
		} catch (e) {
			console.log(`[Washing_Machine-DB] Select Error: ${ e }`);
			return false;
		}
	};

	reservation = async (item) => {
        const { name, start_time, finish_time, feedback } = item;
		try {
            const newItem = new Washing_MachineModel({ name, start_time, finish_time, feedback } );
            const res = await newItem.save();
			return { success: true };
		} catch (e) {
			console.log(`[Washing_Machine-DB] reservation Error: ${ e }`);
			return false;
		}
	};

}

router.post("/select", async (req, res) => {
    try {
        const { floor, direction, location } = req.body;
            const selectResult = await Washing_MachineDB._inst_. insertItem({ floor, direction, location })
            if (!selectResult) return res.status(500).json({ error: "No selections" })
            else return res.status(200).json({ isOK: true })
    } catch (e) {
            return res.status(500).json({ error: e });
    }
});

router.post("/reservation", async (req, res) => {
    try {
        const { name, start_time, finish_time, feedback } = req.body;
            const reservationResult = await Washing_MachineDB._inst_. insertItem({ name, start_time, finish_time, feedback })
            if (!reservationResult) return res.status(500).json({ error: "No reservations" })
            else return res.status(200).json({ isOK: true })
    } catch (e) {
            return res.status(500).json({ error: e });
    }
});

module.exports = router;