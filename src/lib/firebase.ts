import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyB_MockKeyForREGRISRoverApp2026",
  authDomain: "regris-dashboard.firebaseapp.com",
  projectId: "regris-dashboard",
  databaseURL: "https://regris-dashboard-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase App singleton safely for Next.js SSR
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const db: Database = typeof window !== "undefined" ? getDatabase(app) : ({} as Database);

export const auth: Auth = (() => {
  if (typeof window === "undefined") return {} as Auth;
  try {
    return getAuth(app);
  } catch (err) {
    console.warn("Firebase Auth initialization skipped/mocked:", err);
    return {} as Auth;
  }
})();
