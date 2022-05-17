const { Client } = require("@notionhq/client");
//import { markdownToBlocks, markdownToRichText } from "@instantish/martian";
//const options = { allowUnsupportedObjectType: false, strictImageUrls: true };
//const blocks: Block[] = markdownToBlocks("");

class Notion {
  constructor() {
    const notion = new Client({ auth: process.env.NOTION_API_KEY });
  }
  create_rule(rule) {
    url = "https://api.notion.com/v1/pages";

    data = {
      parent: { database_id: process.env.NOTION_DATABASE_RULES },
      properties: {
        title: {
          title: [
            {
              text: { content: rule.title },
            },
          ],
        },
        Identifiant: {
          number: float(rule.id),
        },
        Thème: {
          select: {
            name: rule.category,
          },
        },
        Statut: {
          select: {
            name: "À auditer",
          },
        },
      },
    };
  }

  create_test(rule_id, test) { }
}

module.exports = { Notion }
