import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const url = new URL(req.url);
    const path = url.pathname.replace("/cafe-api", "").replace("/", "");

    // GET /cafe-api/menu-items - fetch menu items
    if (req.method === "GET" && path === "menu-items") {
      const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .order("category", { ascending: true });

      if (error) throw error;
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // GET /cafe-api/menu-items/featured - fetch featured items
    if (req.method === "GET" && path === "menu-items/featured") {
      const limitParam = url.searchParams.get("limit") || "3";
      const limit = Math.min(parseInt(limitParam, 10), 10);
      const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .limit(limit);

      if (error) throw error;
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // GET /cafe-api/testimonials - fetch testimonials
    if (req.method === "GET" && path === "testimonials") {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // POST /cafe-api/contact - submit contact form
    if (req.method === "POST" && path === "contact") {
      const body = await req.json();
      const { name, email, message } = body;

      if (!name || !email || !message) {
        return new Response(
          JSON.stringify({ error: "Name, email, and message are required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return new Response(
          JSON.stringify({ error: "Invalid email address" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      if (name.trim().length === 0 || message.trim().length === 0) {
        return new Response(
          JSON.stringify({ error: "Name and message cannot be empty" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const { error } = await supabase
        .from("contact_submissions")
        .insert([{ name: name.trim(), email: email.trim(), message: message.trim() }]);

      if (error) throw error;

      return new Response(
        JSON.stringify({ success: true, message: "Contact form submitted successfully" }),
        {
          status: 201,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: "Not found" }),
      {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Edge function error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
