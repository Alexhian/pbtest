import { getClient } from "../../../database/db.js";

export async function createPropertyCharacteristics(req, res) {
  const { surface, rooms, propertyId } = req.body;
  const client = getClient();
  try {
    await client.connect();
    const result = await client.query(
      "INSERT INTO propertycharacteristics (surface, rooms, property_id) VALUES ($1, $2, $3) RETURNING id",
      [surface, rooms, propertyId]
    );
    await client.end();
    res.json({ id: result.rows[0].id, surface, rooms, propertyId });
  } catch (err) {
    console.error('Error creating property characteristics:', err);
    await client.end();
    res.status(500).json({ error: err.message });
  }
}


