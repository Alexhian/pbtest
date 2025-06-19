import { getClient } from "../../../database/db.js";

export async function createPurchaser(req, res) {
  const { firstname, lastname, searchcriteria, propertyId } = req.body;
  const client = getClient();
  try {
    await client.connect();
    const result = await client.query(
      "INSERT INTO purchasers (firstname, lastname, searchcriteria, property_id) VALUES ($1, $2, $3, $4) RETURNING id",
      [firstname, lastname, searchcriteria, propertyId]
    );
    await client.end();
    res.json({ id: result.rows[0].id, firstname, lastname, searchcriteria, propertyId });
  } catch (err) {
    console.error('Error creating purchaser:', err);
    await client.end();
    res.status(500).json({ error: err.message });
  }
}
