"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../admin.css";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      setError(err.message || "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-page d-flex align-items-center">
      <div className="container admin-auth-shell">
        <div className="admin-auth-card">
          <p className="admin-kicker">Secure Admin Access</p>
          <h1>Portfolio Admin Login</h1>
          <p>Sign in to manage projects, skills, text content, and profile links.</p>

          {error ? <div className="alert alert-danger rounded-4">{error}</div> : null}

          <form onSubmit={handleSubmit} className="admin-field">
            <div className="admin-field">
              <label htmlFor="username">Username</label>
              <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="admin-field">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="admin-auth-actions mt-3">
              <button className="btn btn-warning fw-semibold" type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Login to Dashboard"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
