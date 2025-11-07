
// Firebase Cloud Function: Firestore Trigger for Notifications Collection
// Sends push notification automatically when a new notification document is added

const functions = require("firebase-functions/v2");
const admin = require("firebase-admin");
const fetch = require("node-fetch");

admin.initializeApp();

exports.sendNotificationOnCreate = functions.firestore
  .document("notifications/{notificationId}")
  .onCreate(async (snap, context) => {
    const notification = snap.data();
    if (!notification || !notification.userId) {
      console.log("⚠️ Missing userId or notification data.");
      return;
    }

    const userId = notification.userId;
    const title = notification.title || "New Notification";
    const body = notification.body || "";
    console.log(`🔔 New notification for user ${userId}: ${title}`);

    try {
      const userDoc = await admin.firestore().collection("users").doc(userId).get();
      const fcmToken = userDoc.exists ? userDoc.data().fcmToken : null;

      if (!fcmToken) {
        console.log("⚠️ No FCM token found for user:", userId);
        return;
      }

      const message = {
        token: fcmToken,
        notification: {
          title,
          body,
        },
        data: {
          click_action: "FLUTTER_NOTIFICATION_CLICK",
          sound: "default",
        },
      };

      await admin.messaging().send(message);
      console.log("✅ Push notification sent successfully to", userId);
    } catch (error) {
      console.error("❌ Error sending notification:", error);
    }
  });
