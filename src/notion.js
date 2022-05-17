const { Client } = require("@notionhq/client");
//import { markdownToBlocks, markdownToRichText } from "@instantish/martian";
//const options = { allowUnsupportedObjectType: false, strictImageUrls: true };
//const blocks: Block[] = markdownToBlocks("");
const notion = new Client({ auth: process.env.NOTION_API_KEY });

class Notion {
  async create_rule(rule) {
    console.log(rule);
    let body = {
      parent: { database_id: process.env.NOTION_DATABASE_RULES },
      properties: {
        title: {
          title: [
            {
              text: { content: rule.title },
            },
          ],
        },
        // Identifiant: {
        //   number: rule.id,
        // },
        // 'Thème': {
        //   select: {
        //     name: rule.category,
        //   },
        // },
        // Statut: {
        //   select: {
        //     name: "À auditer",
        //   },
        // },
      },
    };

    console.log(body);

    const response = await notion.pages.create(body);
    return response;
  }
}

module.exports = { Notion };
