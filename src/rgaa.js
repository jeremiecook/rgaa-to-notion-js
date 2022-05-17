const { Remarkable } = require("remarkable");
const meta = require("remarkable-meta");
const glob = require("glob");
const fs = require("fs");

class RGAA {
  rules = [];
  categories = [];

  constructor() {
    this.markdown = new Remarkable();
    this.markdown.use(meta);

    this.load_categories();
    this.load_rules();
  }

  load_categories() {}

  load_rules() {
    const rules_path = process.env.RULES_PATH + "**/*.md";
    let files = glob.sync(rules_path);
    let rules = [];

    files.forEach((file) => {
      let filename = file.split("/").pop().split(".")[0];
      let directory = file.split("/").at(-2);

      if ("index" == filename) {
        let rule_id = directory;
        let content = this.load_markdown(file);
        this.rules[rule_id] = {
          id: rule_id,
          path: file,
          tests: [],
          ...content,
        };
      }

      if ("tests" == directory) {
        let rule_id = file.split("/").at(-3);
        let content = this.load_markdown(file);
        this.rules[rule_id].tests.push({
          id: 1,
          path: file,
          ...content,
        });
      }
    });
  }

  load_markdown(path) {
    let content = {};
    let data = fs.readFileSync(path, { encoding: "utf8", flag: "r" });
    data = this.markdown.render(data);
    content = this.markdown.meta;
    content.content = data;
    content["title"] = this.toTxt(content["title"]);

    //console.log(this.markdown.meta);
    //console.log(content);
    return content;
  }

  toTxt(markdown) {
    return new Remarkable()
      .render(markdown)
      .replace(/(<([^>]+)>)/gi, "")
      .replace(/\n/g, "");
  }

  all_categories() {
    return this.categories;
  }

  get_category(id) {
    return this.categories[id];
  }

  all_rules() {
    return this.rules;
  }
}

module.exports = { RGAA };
