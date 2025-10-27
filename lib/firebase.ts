import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
}

// Check if Firebase config is properly set
const isFirebaseConfigured = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.authDomain &&
  firebaseConfig.appId
)

if (!isFirebaseConfigured) {
  console.warn(
    "[v0] Firebase is not configured. Please add your Firebase credentials to environment variables:\n" +
      "NEXT_PUBLIC_FIREBASE_API_KEY\n" +
      "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN\n" +
      "NEXT_PUBLIC_FIREBASE_PROJECT_ID\n" +
      "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET\n" +
      "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID\n" +
      "NEXT_PUBLIC_FIREBASE_APP_ID",
  )
}

let app: any
let auth: any
let db: any

try {
  if (isFirebaseConfigured) {
    app = initializeApp(firebaseConfig)
    auth = getAuth(app)
    db = getFirestore(app)
  }
} catch (error) {
  console.error("[v0] Firebase initialization error:", error)
}

export { auth, db, app, isFirebaseConfigured }
