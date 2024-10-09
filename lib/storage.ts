import { getDB } from './mongodb';

interface ReferralData {
  referrals: { [userId: string]: string[] };
  referredBy: { [userId: string]: string };
}

const collectionName = 'referrals';

async function saveReferral(userId: string, referrerId: string) {
  const db = await getDB();
  const collection = db.collection(collectionName);
  await collection.updateOne(
    { _id: referrerId },
    { $push: { referrals: userId } },
    { upsert: true }
  );
  await collection.updateOne(
    { _id: userId },
    { $set: { referredBy: referrerId } },
    { upsert: true }
  );
}

async function getReferrals(userId: string): Promise<string[]> {
  const db = await getDB();
  const collection = db.collection(collectionName);
  const result = await collection.findOne({ _id: userId });
  return result?.referrals || [];
}

async function getReferrer(userId: string): Promise<string | null> {
  const db = await getDB();
  const collection = db.collection(collectionName);
  const result = await collection.findOne({ _id: userId });
  return result?.referredBy || null;
}

export { saveReferral, getReferrals, getReferrer };
