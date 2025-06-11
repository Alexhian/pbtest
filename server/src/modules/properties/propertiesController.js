import { getClient } from "../../../database/db.js";

export async function createProperties(req, res) {
  const { reference, price, address, city, postalcode } = req.body;
  const client = getClient();
  try {
    await client.connect();
    const result = await client.query(
      "INSERT INTO properties (reference, price, address, city, postalcode) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [reference, price, address, city, postalcode]
    );
    await client.end();
    res.json({ id: result.rows[0].id, reference, price, address, city, postalcode });
  } catch (err) {
    await client.end();
    res.status(500).json({ error: err.message });
  }
}
