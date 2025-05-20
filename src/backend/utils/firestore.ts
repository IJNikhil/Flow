// src/utils/firestore.ts
export function convertTimestamps(obj: any): any {
  if (obj && typeof obj === 'object') {
    // Firestore Timestamp check
    if (typeof obj.toDate === 'function') {
      // Convert to ISO string
      return obj.toDate().toISOString();
    }
    if (Array.isArray(obj)) {
      return obj.map(convertTimestamps);
    }
    const out: any = {};
    for (const key in obj) {
      out[key] = convertTimestamps(obj[key]);
    }
    return out;
  }
  return obj;
}
