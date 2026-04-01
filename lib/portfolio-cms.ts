import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { getFirebaseDb, isFirebaseConfigured } from "@/lib/firebase-client";
import {
  defaultPortfolioContent,
  getStoredPortfolioContent,
  savePortfolioContent,
  type PortfolioContent,
} from "@/lib/portfolio-content";

const CONTENT_PATH = ["portfolio", "content"] as const;

export async function fetchPortfolioContent(): Promise<PortfolioContent> {
  // Fast fallback for first render / misconfig
  const local = getStoredPortfolioContent();
  if (!isFirebaseConfigured()) return local ?? defaultPortfolioContent;

  const db = getFirebaseDb();
  if (!db) return local ?? defaultPortfolioContent;

  try {
    const ref = doc(db, ...CONTENT_PATH);
    const snap = await getDoc(ref);
    if (!snap.exists()) return local ?? defaultPortfolioContent;

    const data = snap.data()?.data as PortfolioContent | undefined;
    const merged: PortfolioContent = {
      ...defaultPortfolioContent,
      ...(data ?? {}),
      socials: data?.socials ?? defaultPortfolioContent.socials,
      experience: data?.experience ?? defaultPortfolioContent.experience,
      projects: data?.projects ?? defaultPortfolioContent.projects,
      interests: data?.interests ?? defaultPortfolioContent.interests,
    };

    // Cache locally for faster subsequent loads
    savePortfolioContent(merged);
    return merged;
  } catch {
    return local ?? defaultPortfolioContent;
  }
}

export async function publishPortfolioContent(content: PortfolioContent) {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_* env vars.");
  }

  const db = getFirebaseDb();
  if (!db) throw new Error("Firebase init failed.");

  const ref = doc(db, ...CONTENT_PATH);
  await setDoc(
    ref,
    {
      data: content,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

  savePortfolioContent(content);
}

