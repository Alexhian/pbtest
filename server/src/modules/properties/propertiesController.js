import { getClient } from "../../../database/db.js";

// Fonction pour créer une nouvelle propriété
export async function createProperties(req, res) {
  const { reference, price, address, city, postcode } = req.body;
  const client = getClient();
  try {
    await client.connect();
    const result = await client.query(
      "INSERT INTO properties (reference, price, address, city, postcode) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [reference, price, address, city, postcode]
    );
    await client.end();
    res.json({ id: result.rows[0].id, reference, price, address, city, postcode });
  } catch (err) {
    console.error('Error creating property:', err);
    await client.end();
    res.status(500).json({ error: err.message });
  }
}

// Fonction pour récupérer toutes les propriétés
export async function getProperties(req, res) {
  const client = getClient();
  try {
    await client.connect();
    const result = await client.query(`
       SELECT
        p.*,
        COALESCE(
          (
            SELECT json_agg(purch)
            FROM purchasers purch
            WHERE purch.property_id = p.id
          ), '[]'
        ) as purchasers,
        COALESCE(
          (
            SELECT json_agg(pc)
            FROM propertycharacteristics pc
            WHERE pc.property_id = p.id
          ), '[]'
        ) as characteristics
      FROM properties p
      GROUP BY p.id
`);
    await client.end();
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching properties:', err);
    await client.end();
    res.status(500).json({ error: err.message });
  }
}

