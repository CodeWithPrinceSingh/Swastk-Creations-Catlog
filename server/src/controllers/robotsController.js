export const getRobotsTxt = (req, res) => {
  const SITE_URL = (process.env.CLIENT_ORIGIN || 'https://swastik-creations-catlog.vercel.app').replace(/\/$/, '');

  const content = `User-agent: Googlebot
Disallow: /nogooglebot/

User-agent: *
Allow: /  
  Sitemap: ${SITE_URL}/sitemap.xml
`;

  res.set('Content-Type', 'text/plain');
  res.send(content);
};
