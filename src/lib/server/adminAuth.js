import crypto from "crypto";

export const adminSessionCookieName = "portfolio_admin_session";

const sessionDurationMs = 1000 * 60 * 60 * 12;

const getSecret = () =>
  process.env.ADMIN_SESSION_SECRET || "change-this-secret-before-production";

export const getAdminCredentials = () => ({
  username: process.env.ADMIN_USERNAME || "Ashish",
  password: process.env.ADMIN_PASSWORD || "Ashish@123",
});

export function createSessionToken(username) {
  const expiresAt = Date.now() + sessionDurationMs;
  const payload = `${username}.${expiresAt}`;
  const signature = crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("hex");

  return `${payload}.${signature}`;
}

export function verifySessionToken(token) {
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [username, expiresAt, signature] = parts;
  const payload = `${username}.${expiresAt}`;
  const expectedSignature = crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("hex");

  if (signature !== expectedSignature) return false;
  if (Number.isNaN(Number(expiresAt))) return false;
  if (Date.now() > Number(expiresAt)) return false;

  return username === getAdminCredentials().username;
}
