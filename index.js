require("dotenv").config();

const { RGAA } = require("./src/rgaa.js");
const { Notion } = require("./src/notion.js");

async function to_notion() {
  rgaa = new RGAA();
  notion = new Notion();

  rules = rgaa.all_rules();

  // id = await notion.create_rule(rules["9.1"]);
  //   rules["9.1"].tests.forEach((test) => {
  //     notion.create_test(id, test);
  //   });

  for (let key in rules) {
    let rule = rules[key];
    rule_id = await notion.create_rule(rule);

    rule.tests.forEach((test) => {
      notion.create_test(rule_id, test);
    });
  }
}

to_notion();
