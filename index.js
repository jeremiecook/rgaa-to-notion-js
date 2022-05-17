require("dotenv").config();

const { RGAA } = require("./src/rgaa.js");
const { Notion } = require("./src/notion.js");

rgaa = new RGAA();
notion = new Notion();

rules = rgaa.rules();

rules.forEach((rule) => {
  rule_id = notion.create_rule(rule);

  rule.tests.forEach((test) => {
    notion.create_test(rule_id, test);
  });
});
