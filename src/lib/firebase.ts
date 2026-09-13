import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
  databaseURL: "https://regris-dashboard-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase App singleton safely for Next.js SSR
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const db: Database = typeof window !== "undefined" ? getDatabase(app) : ({} as Database);
export const auth: Auth = typeof window !== "undefined" ? getAuth(app) : ({} as Auth);
