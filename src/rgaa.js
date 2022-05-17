const glob = require("glob");

class RGAA {
  constructor() {
    const rules_path = process.env.RULES_PATH + "/**/*.md";
    const paths = glob(rules_path);
    console.log(paths);
  }
  categories() { }
  rules() {
    return []
  }
}

module.exports = { RGAA }
