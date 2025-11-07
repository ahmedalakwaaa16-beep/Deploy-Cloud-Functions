# 🚀 Firebase Cloud Function Deployment Guide

## 1️⃣ Install Firebase CLI
```bash
npm install -g firebase-tools
```

## 2️⃣ Login to Firebase
```bash
firebase login
```

## 3️⃣ Select your project
```bash
firebase use fazaa-pro2-a3e12
```

## 4️⃣ Deploy the function
```bash
firebase deploy --only functions
```

✅ This function will automatically run when a new document is added to:
`notifications/{notificationId}`

It will read `userId`, `title`, and `body` from the document,
get `users/{userId}.fcmToken`, and send a push notification via FCM.
