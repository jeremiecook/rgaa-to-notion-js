const { globby } = require("globby");

class RGAA {
  constructor() {
    const rules_path = process.env.RULES_PATH + "/**/*.md";
    const paths = await globby(rules_path);
    console.log(paths);
  }
  categories() {}
  rules() {}
}

export default RGAA;
