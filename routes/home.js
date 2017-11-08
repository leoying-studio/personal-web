let express = require('express');
let router = express.Router();
let Banner = require("./../models/banner");
let Intro = require("./../models/intro");
let TimeLine = require("./../models/timeline");
let Footer = require("./../models/footer");

class Home {

	async static getData(req, res) {
		const banner = await Banner.find();
		const intro = await Intro.find();
		const timeline = await TimeLine.find();
		const footer = await Footer.find();
		return {
			banner,
			intro,
			timeline,
			footer
		};
	}

}

router.get("/", Home.getData);

module.exports = router;