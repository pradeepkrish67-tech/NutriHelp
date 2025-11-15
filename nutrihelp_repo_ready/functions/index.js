const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

// Cloud function: on new donation, schedule check for expiry and notify volunteers. If area unreachable, create drone task.
exports.onNewDonation = functions.firestore.document('donations/{donationId}').onCreate(async (snap, context) => {
  const donation = snap.data();
  const id = context.params.donationId;
  const created = donation.createdAt ? donation.createdAt.toDate() : new Date();
  const expiryMinutes = donation.expiry || 120;
  const expiryAt = new Date(created.getTime() + expiryMinutes*60000);

  // store expiry
  await db.collection('donations_meta').doc(id).set({ expiryAt: admin.firestore.Timestamp.fromDate(expiryAt) });

  // If donation.location_unreachable == true, create drone task
  if (donation.location_unreachable) {
    const task = {
      donationId: id,
      status: 'queued',
      requestedAt: admin.firestore.FieldValue.serverTimestamp(),
      pickupLocation: donation.location || null
    };
    await db.collection('drone_tasks').add(task);
  }
  // Also can send FCM notifications here (requires setup)
  return null;
});

// Scheduled function: run every 15 minutes to find donations near expiry and dispatch alerts or drone
exports.checkExpiringDonations = functions.pubsub.schedule('every 15 minutes').onRun(async (context) => {
  const now = admin.firestore.Timestamp.now();
  const q = await db.collection('donations_meta').where('expiryAt','<=', now).get();
  let count = 0;
  const batch = db.batch();
  q.forEach(docSnap => {
    const id = docSnap.id;
    // mark as expired
    batch.update(db.collection('donations').doc(id), {status: 'expired'});
    count++;
  });
  if(count) await batch.commit();
  return null;
});
