import StaticPage from '../components/common/StaticPage.jsx';

export function FAQPage() {
  const faqs = [
    ['Can I buy directly from this website?', 'No — this site is a catalog to help you browse our collection. All purchases are made in person at our Jaipur store.'],
    ['Can you hold an item for me?', 'Yes, call or WhatsApp us with the product name and we can keep it aside for a limited time ahead of your visit.'],
    ['Can I try things on before buying?', 'Absolutely — trying on lehengas, sarees, and jewellery in person is the best way to find your perfect fit, and our team is there to help.'],
    ['Do you offer customization?', 'Many of our pieces can be customized in fit, color, or embellishment. This is best discussed in-store with our design team.'],
    ['Are the prices on this site final?', 'Prices shown are indicative. Final pricing, available sizes, and stock are confirmed in-store.'],
  ];
  return (
    <StaticPage title="Frequently Asked Questions">
      {faqs.map(([q, a]) => (
        <div key={q}>
          <p className="font-medium text-ink">{q}</p>
          <p>{a}</p>
        </div>
      ))}
    </StaticPage>
  );
}

export function ShippingPage() {
  return (
    <StaticPage title="Visiting Our Store">
      <p>Bride Store is a showroom experience — every piece is meant to be seen, touched, and tried on in person, so we don't offer online ordering or home delivery.</p>
      <p>You're welcome to walk in any time during store hours (Mon - Sat, 10AM - 8PM), or message us on WhatsApp beforehand to check availability and have something ready for you when you arrive.</p>
      <p>Use the "Visit Store" button anywhere on this site for our address, map directions, and contact details.</p>
    </StaticPage>
  );
}

export function ReturnsPage() {
  return (
    <StaticPage title="In-Store Exchange Policy">
      <p>Since every purchase is made and inspected in person at our store, our exchange policy is handled directly at the time of sale — our team will walk you through it during checkout in-store.</p>
      <p>As a general guideline, unworn items with tags attached are eligible for exchange within 7 days, except for customized or made-to-order pieces.</p>
      <p>For any questions about a piece you've purchased, please contact the store directly or stop by in person.</p>
    </StaticPage>
  );
}

export function PrivacyPage() {
  return (
    <StaticPage title="Privacy Policy">
      <p>This website is a catalog for browsing our collection — we do not process payments or store delivery addresses here.</p>
      <p>If you create an account or contact us through the site, we only collect the information needed to respond to you (such as your name and contact details). We never sell your personal data to third parties.</p>
    </StaticPage>
  );
}

export function TermsPage() {
  return (
    <StaticPage title="Terms & Conditions">
      <p>This website is provided as a catalog to help you browse Bride Store's collection ahead of an in-person visit. It is not an online store, and no purchases or payments are made through this site.</p>
      <p>All product images are for representation; slight variations in color or embellishment may occur due to the handcrafted nature of our products. Final pricing and availability are confirmed in-store.</p>
      <p>Prices shown are indicative and listed in Indian Rupees (₹), subject to change without notice.</p>
    </StaticPage>
  );
}
