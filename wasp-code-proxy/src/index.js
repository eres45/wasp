/**
 * Wasp Code Proxy - Cloudflare Worker
 *
 * This worker acts as a proxy between the Wasp Code VS Code extension
 * and the Frenix API, hiding your API key from users.
 *
 * Features:
 * - CORS support for browser requests
 * - Rate limiting (100 requests per hour per user)
 * - Usage tracking
 * - Error handling
 * - Support for all 20 models
 */

// Rate limiting: Store user request counts
const rateLimits = new Map();
const RATE_LIMIT = 100; // requests per hour
const RATE_WINDOW = 3600000; // 1 hour in milliseconds

// Usage tracking
const usageStats = new Map();

/**
 * Main request handler
 */
export default {
  async fetch(request, env, ctx) {
    // CORS headers for all responses
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-User-ID",
    };

    // Handle preflight OPTIONS request
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    // Only allow POST requests
    if (request.method !== "POST") {
      return new Response(
        JSON.stringify({
          error: "Method not allowed. Use POST.",
        }),
        {
          status: 405,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        },
      );
    }

    try {
      // Get user ID for rate limiting (optional)
      const userId = request.headers.get("X-User-ID") || "anonymous";

      // Check rate limit
      if (!checkRateLimit(userId)) {
        return new Response(
          JSON.stringify({
            error: "Rate limit exceeded. Maximum 100 requests per hour.",
            retryAfter: 3600,
          }),
          {
            status: 429,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
              "Retry-After": "3600",
            },
          },
        );
      }

      // Parse request body
      const body = await request.json();

      // Validate request
      if (!body.model || !body.messages) {
        return new Response(
          JSON.stringify({
            error: "Invalid request. Required fields: model, messages",
          }),
          {
            status: 400,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          },
        );
      }

      // Forward request to Frenix API
      const frenixResponse = await fetch(
        "https://api.frenix.sh/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${env.FRENIX_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
      );

      // Track usage
      trackUsage(userId, body.model);

      // Get response data
      const responseData = await frenixResponse.text();

      // Return response to client
      return new Response(responseData, {
        status: frenixResponse.status,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Proxy error:", error);

      return new Response(
        JSON.stringify({
          error: "Internal server error",
          message: error.message,
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        },
      );
    }
  },
};

/**
 * Check if user has exceeded rate limit
 */
function checkRateLimit(userId) {
  const now = Date.now();
  const userRequests = rateLimits.get(userId) || [];

  // Remove requests older than 1 hour
  const recentRequests = userRequests.filter(
    (time) => now - time < RATE_WINDOW,
  );

  // Check if limit exceeded
  if (recentRequests.length >= RATE_LIMIT) {
    return false;
  }

  // Add current request
  recentRequests.push(now);
  rateLimits.set(userId, recentRequests);

  return true;
}

/**
 * Track usage statistics
 */
function trackUsage(userId, model) {
  const key = `${userId}:${model}`;
  const count = usageStats.get(key) || 0;
  usageStats.set(key, count + 1);
}
