const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const { markdownToBlocks, markdownToRichText } = require("@tryfabric/martian");
const options = { allowUnsupportedObjectType: false, strictImageUrls: true };

class Notion {
  async create_rule(rule) {
    //console.log(rule);
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
        //   text: { content: rule.id },
        // },
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

    //console.log(body);

    const response = await notion.pages.create(body);
    return response.id;
  }

  async create_test(rule_id, test) {
    //console.log(test.body);
    // Supprimer les meta associées au fichier markdown
    test.body = test.body.replace(/(^---[.\r\n\s\S]*---)/is, "");
    //console.log(test.body);
    const blocks = markdownToBlocks(test.body);

    let body = {
      parent: { database_id: process.env.NOTION_DATABASE_TESTS },
      properties: {
        title: {
          title: [
            {
              text: { content: test.title },
            },
          ],
        },
        Critère: {
          relation: [
            {
              id: rule_id,
            },
          ],
        },
      },
      children: blocks,
    };

    //console.log(body.children[0].numbered_list_item);
    const response = await notion.pages.create(body);
    return response.id;
  }
}

module.exports = { Notion };
