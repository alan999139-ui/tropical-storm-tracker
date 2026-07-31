import rss from '@astrojs/rss';

const siteName = 'StormTracker';
const siteDesc = 'Latest tropical storm updates, alerts, and tracking information.';

export async function GET() {
  return rss({
    title: siteName,
    description: siteDesc,
    site: 'https://tropicalstormtracker.example.com',
    items: [
      {
        title: 'Tropical Storm Bertha — Active in Gulf of Mexico',
        description: 'Tropical Storm Bertha is currently active in the Gulf of Mexico with sustained winds of 45 mph. Tropical Storm Warnings have been issued for coastal areas.',
        pubDate: new Date(),
        link: '/storms/bertha',
      },
      {
        title: '2024 Hurricane Season Update',
        description: 'The 2024 Atlantic hurricane season has produced 10 named storms so far. Here is a recap.',
        pubDate: new Date(Date.now() - 86400000),
        link: '/storms',
      },
      {
        title: 'Preparedness: Do You Have Your Emergency Kit Ready?',
        description: 'Storm season is here. Make sure your emergency kit is stocked and ready.',
        pubDate: new Date(Date.now() - 172800000),
        link: '/preparedness',
      },
    ],
    customData: '<language>en-us</language>',
  });
}
