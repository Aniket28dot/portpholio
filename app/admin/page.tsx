"use client";

import * as React from "react";
import Link from "next/link";
import {
  defaultPortfolioContent,
  savePortfolioContent,
  type PortfolioContent,
} from "@/lib/portfolio-content";
import { publishPortfolioContent, fetchPortfolioContent } from "@/lib/portfolio-cms";
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase-client";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, type User } from "firebase/auth";

export default function AdminPage() {
  const [jsonText, setJsonText] = React.useState("");
  const [status, setStatus] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<User | null>(null);
  const [isReady, setIsReady] = React.useState(false);

  const [notionUrl, setNotionUrl] = React.useState("");
  const [notionCategory, setNotionCategory] = React.useState("");
  const [notionTitle, setNotionTitle] = React.useState("");
  const [notionExcerpt, setNotionExcerpt] = React.useState("");

  const handleAddNotionBlog = () => {
    if (!notionUrl || !notionTitle) {
      setError("Title and Notion URL are required.");
      return;
    }
    
    try {
      const parsed = JSON.parse(jsonText) as PortfolioContent;
      
      const categoriesArray = notionCategory
        ? notionCategory.split(',').map(c => c.trim()).filter(Boolean)
        : ["Uncategorized"];

      const newWriting = {
        title: notionTitle,
        excerpt: notionExcerpt || "Embedded Notion Blog",
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        url: "#",
        notionUrl: notionUrl,
        categories: categoriesArray
      };

      parsed.writings = [newWriting, ...(parsed.writings || [])];
      
      setJsonText(JSON.stringify(parsed, null, 2));
      setNotionUrl("");
      setNotionTitle("");
      setNotionCategory("");
      setNotionExcerpt("");
      setStatus("Notion blog added to the JSON below. Click 'Save Content' or 'Publish Live' to apply.");
      setError(null);
    } catch {
      setError("Failed to parse JSON. Please fix any errors before adding a blog.");
    }
  };

  React.useEffect(() => {
    let unsub: (() => void) | null = null;
    const auth = getFirebaseAuth();
    if (auth) {
      unsub = onAuthStateChanged(auth, (u) => setUser(u));
    }

    fetchPortfolioContent()
      .then((content) => setJsonText(JSON.stringify(content, null, 2)))
      .finally(() => setIsReady(true));

    return () => {
      unsub?.();
    };
  }, []);

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.trim().toLowerCase();
  const isAdmin = !!adminEmail && (user?.email?.toLowerCase() === adminEmail);

  const handleSignIn = async () => {
    setStatus(null);
    setError(null);

    const auth = getFirebaseAuth();
    if (!auth) {
      setError("Firebase Auth is not configured. Add NEXT_PUBLIC_FIREBASE_* env vars.");
      return;
    }

    await signInWithPopup(auth, new GoogleAuthProvider());
  };

  const handleSignOut = async () => {
    const auth = getFirebaseAuth();
    if (!auth) return;
    await signOut(auth);
  };

  const handleSave = () => {
    setStatus(null);
    setError(null);

    try {
      const parsed = JSON.parse(jsonText) as PortfolioContent;
      if (!Array.isArray(parsed.projects) || !Array.isArray(parsed.experience)) {
        setError("`projects` and `experience` must be arrays.");
        return;
      }

      if (!isFirebaseConfigured()) {
        // Still allow local caching for preview
        savePortfolioContent(parsed);
        setStatus("Saved locally. Configure Firebase to publish live updates.");
        return;
      }

      if (!isAdmin) {
        setError(
          adminEmail
            ? "You are signed in, but this account is not allowed to publish."
            : "Set NEXT_PUBLIC_ADMIN_EMAIL to restrict publishing."
        );
        return;
      }

      publishPortfolioContent(parsed)
        .then(() => setStatus("Published. Your live site will update everywhere."))
        .catch((e: unknown) => {
          const msg = e instanceof Error ? e.message : "Failed to publish.";
          setError(msg);
        });
    } catch {
      setError("Invalid JSON. Please fix the format and try again.");
    }
  };

  const handleReset = () => {
    setJsonText(JSON.stringify(defaultPortfolioContent, null, 2));
    setStatus("Reset to default content from codebase.");
    setError(null);
  };

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Portfolio Content Editor</h1>
            <p className="text-zinc-600 dark:text-zinc-400 mt-2">
              Sign in to publish live updates (Firestore). Without Firebase, edits are only stored locally.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Back to Portfolio
          </Link>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              {isFirebaseConfigured() ? (
                <span>
                  CMS: <span className="font-medium text-zinc-900 dark:text-zinc-100">Firebase</span>{" "}
                  {user ? (
                    <span className="text-zinc-500">(signed in)</span>
                  ) : (
                    <span className="text-zinc-500">(not signed in)</span>
                  )}
                </span>
              ) : (
                <span>
                  CMS: <span className="font-medium text-zinc-900 dark:text-zinc-100">Not configured</span>
                </span>
              )}
              {adminEmail ? <span className="block text-xs text-zinc-500 mt-1">Publishing is restricted to the configured admin account.</span> : null}
            </div>

            <div className="flex items-center gap-2">
              {isFirebaseConfigured() ? (
                user ? (
                  <button
                    onClick={handleSignOut}
                    className="px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                  >
                    Sign out
                  </button>
                ) : (
                  <button
                    onClick={handleSignIn}
                    className="px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                  >
                    Sign in with Google
                  </button>
                )
              ) : null}
            </div>
          </div>

          {/* Quick Add Notion Blog Form */}
          <div className="mb-8 p-4 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-3">Quick Add Notion Blog</h3>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Blog Title"
                  value={notionTitle}
                  onChange={(e) => setNotionTitle(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 outline-none focus:border-blue-500 bg-white dark:bg-zinc-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Notion URL"
                  value={notionUrl}
                  onChange={(e) => setNotionUrl(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 outline-none focus:border-blue-500 bg-white dark:bg-zinc-900 dark:text-white"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Excerpt (Optional)"
                  value={notionExcerpt}
                  onChange={(e) => setNotionExcerpt(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 outline-none focus:border-blue-500 bg-white dark:bg-zinc-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Categories (comma-separated)"
                  value={notionCategory}
                  onChange={(e) => setNotionCategory(e.target.value)}
                  className="flex-1 md:flex-none md:w-64 px-3 py-2 text-sm rounded-lg border border-zinc-300 dark:border-zinc-700 outline-none focus:border-blue-500 bg-white dark:bg-zinc-900 dark:text-white"
                />
                <button
                  onClick={handleAddNotionBlog}
                  className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-medium rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors whitespace-nowrap"
                >
                  Add to JSON
                </button>
              </div>
            </div>
          </div>

          <label className="block text-sm font-mono uppercase tracking-widest text-zinc-500 mb-3">
            Content JSON
          </label>
          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            className="w-full h-[60vh] rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 p-4 font-mono text-sm text-zinc-800 dark:text-zinc-200 outline-none focus:ring-2 focus:ring-blue-600"
            spellCheck={false}
            disabled={!isReady}
          />

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              {isFirebaseConfigured() ? "Publish Live" : "Save Content"}
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-lg border border-zinc-300 text-sm font-medium hover:bg-zinc-100 transition-colors"
            >
              Reset to Default
            </button>
          </div>

          {status ? <p className="mt-3 text-sm text-green-700">{status}</p> : null}
          {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
        </div>
      </div>
    </main>
  );
}
