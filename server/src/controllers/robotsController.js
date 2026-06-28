export const getRobotsTxt = (req, res) => {
  const SITE_URL = (process.env.CLIENT_ORIGIN || 'https://swastik-creations-catlog.vercel.app').replace(/\/$/, '');

  const content = `User-agent: Googlebot
Disallow: 
User-agent: googlebot-image
Disallow: 
User-agent: googlebot-mobile
Disallow: 
User-agent: MSNBot
Disallow: 
User-agent: Slurp
Disallow: 
User-agent: Gigabot
Disallow: 
User-agent: Robozilla
Disallow: 
User-agent: Nutch
Disallow: 
User-agent: ia_archiver
Disallow: 
User-agent: baiduspider
Disallow: 
User-agent: naverbot
Disallow: 
User-agent: yeti
Disallow: 
User-agent: yahoo-mmcrawler
Disallow: 
User-agent: psbot
Disallow: 
User-agent: yahoo-blogs/v3.9
Disallow: 
User-agent: *
Disallow:
  
  Sitemap: ${SITE_URL}/sitemap.xml
`;

  res.set('Content-Type', 'text/plain');
  res.send(content);
};
