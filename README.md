# Minimal Portfolio + AI Assistant

## Live CMS (Firebase Firestore)

This project supports a CMS-style setup where portfolio content is stored in **Firestore** and edited via `/admin`, so updates are live everywhere.

### 1) Create Firebase project

- Create a Firebase project in the Firebase Console.
- Enable **Firestore Database**.
- Enable **Authentication → Sign-in method → Google**.

### 2) Add environment variables

Copy `.env.example` to `.env.local` and fill in values from your Firebase Web App config:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` (optional)
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` (optional)
- `NEXT_PUBLIC_FIREBASE_APP_ID`

Set this to your email to restrict publishing:

- `NEXT_PUBLIC_ADMIN_EMAIL=your.email@example.com`

### 3) Firestore document

The portfolio content is stored at:

- Collection: `portfolio`
- Document: `content`

The app writes data in the shape:

```json
{
  "data": { "...portfolio content..." },
  "updatedAt": "server timestamp"
}
```

### 4) Security rules (recommended)

Use rules like this (adjust `your.email@example.com`):

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /portfolio/content {
      allow read: if true;
      allow write: if request.auth != null
        && request.auth.token.email == 'your.email@example.com';
    }
  }
}
```

### 5) Edit content

- Start dev server
- Go to `/admin`
- Sign in with Google
- Edit JSON and click **Publish Live**

The homepage loads content from Firestore and caches it locally for faster loads.

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/98a7f5bf-597e-4afd-934b-cb5175622d64

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
