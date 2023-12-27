import { XMLParser } from 'fast-xml-parser';

export async function getStats(id: string) {
  const response = await fetch(`https://boardgamegeek.com/xmlapi2/thing?id=${id}&stats=1`);
  const parser = new XMLParser({ ignoreAttributes: false, parseAttributeValue: true, attributeNamePrefix: '_' });
  const xmltext = await response.text();
  const jsonObj = await parser.parse(xmltext);
  const rating = Number.parseFloat(jsonObj.items.item.statistics.ratings.average._value);
  //const paragraphs = formatText(jsonObj.items.item.description);

  return {
    rating: rating.toFixed(1),
    minPlayers: jsonObj.items.item.minplayers._value | 0,
    maxPlayers: jsonObj.items.item.maxplayers._value | 0,
    minPlayTime: jsonObj.items.item.minplaytime._value | 0,
    maxPlayTime: jsonObj.items.item.maxplaytime._value | 0
  };
}

function formatText(text: string) {
  const paragraphsWithEmptyStrings = text.split('&#10;');
  const paragraphs = paragraphsWithEmptyStrings.filter(item => item != '');
  return paragraphs;
}
