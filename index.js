require("dotenv").config();

const { RGAA } = require("./src/rgaa.js");
const { Notion } = require("./src/notion.js");

rgaa = new RGAA();
notion = new Notion();

rules = rgaa.all_rules();
//console.log(rules);

notion.create_rule(rules["9.1"]);

// rules.forEach((rule) => {
//   rule_id = notion.create_rule(rule);

//   //   rule.tests.forEach((test) => {
//   //     notion.create_test(rule_id, test);
//   //   });
// });
