#!/usr/bin/env node

const TIMEOUT_MS = 12000;

const urls = process.argv.slice(2);

if (urls.length === 0) {
  console.error("Usage: node .cursor/skills/omswap-reference-registry/scripts/check-iframe-support.mjs <url> [url...]");
  process.exit(1);
}

function normalizeUrl(raw) {
  try {
    return new URL(raw).toString();
  } catch {
    return null;
  }
}

function parseFrameAncestors(csp) {
  if (!csp) return null;
  const directives = csp
    .split(";")
    .map((d) => d.trim())
    .filter(Boolean);
  const directive = directives.find((d) => d.toLowerCase().startsWith("frame-ancestors"));
  if (!directive) return null;
  return directive
    .split(/\s+/)
    .slice(1)
    .map((v) => v.trim())
    .filter(Boolean);
}

function classifyHeaders(headers) {
  const xfo = (headers.get("x-frame-options") || "").toLowerCase();
  if (xfo.includes("deny")) {
    return { iFrame: false, reason: "x-frame-options=DENY", confidence: "high" };
  }
  if (xfo.includes("sameorigin")) {
    return { iFrame: false, reason: "x-frame-options=SAMEORIGIN", confidence: "high" };
  }

  const csp = headers.get("content-security-policy");
  const ancestors = parseFrameAncestors(csp);
  if (ancestors && ancestors.length > 0) {
    const normalized = ancestors.map((a) => a.toLowerCase());
    if (normalized.includes("'none'") || normalized.includes("none")) {
      return { iFrame: false, reason: "csp frame-ancestors 'none'", confidence: "high" };
    }
    if (normalized.includes("*")) {
      return { iFrame: true, reason: "csp frame-ancestors *", confidence: "high" };
    }
    if (normalized.includes("'self'") && normalized.length === 1) {
      return { iFrame: false, reason: "csp frame-ancestors 'self' only", confidence: "high" };
    }
    return { iFrame: true, reason: "csp frame-ancestors present and not explicitly blocking", confidence: "medium" };
  }

  return { iFrame: true, reason: "no iframe-blocking headers detected", confidence: "medium" };
}

async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "omswap-iframe-check/1.0",
        accept: "text/html,*/*;q=0.8"
      }
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function checkUrl(rawUrl) {
  const url = normalizeUrl(rawUrl);
  if (!url) {
    return {
      url: rawUrl,
      iFrame: false,
      confidence: "high",
      reason: "invalid URL",
      status: "error"
    };
  }

  try {
    const response = await fetchWithTimeout(url);
    const classification = classifyHeaders(response.headers);
    return {
      url,
      iFrame: classification.iFrame,
      confidence: classification.confidence,
      reason: classification.reason,
      status: response.ok ? "ok" : `http-${response.status}`
    };
  } catch (error) {
    return {
      url,
      iFrame: false,
      confidence: "high",
      reason: `request failed: ${error instanceof Error ? error.message : "unknown error"}`,
      status: "error"
    };
  }
}

const results = await Promise.all(urls.map((u) => checkUrl(u)));
console.log(JSON.stringify(results, null, 2));
