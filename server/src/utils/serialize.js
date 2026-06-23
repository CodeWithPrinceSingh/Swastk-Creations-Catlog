// Converts Mongoose documents into the flat JSON shape the frontend already
// expects (id as string, no Mongoose metadata, category as a plain id string).
// This lets us swap the data layer (mock array <-> MongoDB) without touching
// any frontend code, since the API response shape stays identical either way.

export const serializeProduct = (doc) => {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : doc;
  return {
    id: String(obj._id),
    name: obj.name,
    slug: obj.slug,
    category: obj.category ? String(obj.category) : null,
    price: obj.price,
    compareAtPrice: obj.compareAtPrice,
    rating: obj.rating,
    reviewCount: obj.reviewCount,
    isNew: obj.isNew,
    description: obj.description,
    images: obj.images || [],
    sizes: obj.sizes || [],
    colors: obj.colors || [],
    stock: obj.stock,
    tags: obj.tags || [],
  };
};

export const serializeCategory = (doc) => {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : doc;
  return {
    id: String(obj._id),
    name: obj.name,
    slug: obj.slug,
    image: obj.image || '',
  };
};

export const serializeUser = (doc) => {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : doc;
  return {
    id: String(obj._id),
    name: obj.name,
    email: obj.email,
    role: obj.role,
    createdAt: obj.createdAt,
  };
};
