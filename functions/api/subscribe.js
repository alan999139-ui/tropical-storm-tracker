// Cloudflare Pages Function: /api/subscribe
// Handles email alert subscriptions
// Stores in KV if available, falls back to accepting and logging

export const onRequestPost = async (context) => {
  const { request, env } = context;

  try {
    const data = await request.json();

    // Validate required fields
    if (!data.email || !isValidEmail(data.email)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Valid email is required',
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!data.regions || data.regions.length === 0) {
      return new Response(JSON.stringify({
        success: false,
        error: 'At least one region is required',
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const subscription = {
      email: data.email,
      name: data.name || '',
      regions: data.regions,
      alertTypes: data.alertTypes || ['formation', 'intensification', 'landfall'],
      frequency: data.frequency || 'realtime',
      createdAt: new Date().toISOString(),
      ip: request.headers.get('CF-Connecting-IP') || 'unknown',
    };

    // Store in KV if available
    if (env.STORM_SUBSCRIPTIONS) {
      const key = `sub:${data.email}`;
      await env.STORM_SUBSCRIPTIONS.put(key, JSON.stringify(subscription));
    }

    // Log for monitoring
    console.log(`New subscription: ${data.email} - regions: ${data.regions.join(',')}`);

    return new Response(JSON.stringify({
      success: true,
      message: 'Subscription created successfully',
      email: data.email,
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Subscribe error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error',
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// GET handler: return API info (no secrets exposed)
export const onRequestGet = () => {
  return new Response(JSON.stringify({
    endpoint: '/api/subscribe',
    method: 'POST',
    description: 'Subscribe to storm alerts for specific regions',
    required_fields: ['email', 'regions'],
    optional_fields: ['name', 'alertTypes', 'frequency'],
    regions: ['north_atlantic', 'east_pacific', 'central_pacific', 'northwest_pacific', 'north_indian', 'south_indian', 'australia', 'south_pacific', 'global'],
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

// Handle CORS preflight
export const onRequestOptions = () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
