import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req: Request) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const botToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
    const chatId = Deno.env.get("TELEGRAM_CHAT_ID");

    if (!botToken || !chatId) {
      console.error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID secrets");
      return new Response(
        JSON.stringify({
          error: "Telegram secrets are missing. Please set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in Supabase Edge Function secrets.",
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Parse reservation payload
    let data: Record<string, any> = {};
    try {
      data = await req.json();
    } catch {
      // Empty or non-JSON body
    }

    const {
      name = "نامشخص",
      phone = "نامشخص",
      email = "ثبت نشده",
      guests = "نامشخص",
      date = "نامشخص",
      time = "نامشخص",
      message = "ندارد",
    } = data;

    // Build Telegram message
    const telegramText = [
      "🎉 *رزرو جدید در وبسایت ثبت شد!*",
      "",
      `👤 *نام:* ${name}`,
      `📞 *شماره تماس:* ${phone}`,
      `✉️ *ایمیل:* ${email}`,
      `👥 *تعداد نفرات:* ${guests}`,
      `📅 *تاریخ:* ${date}`,
      `⏰ *ساعت:* ${time}`,
      `📝 *یادداشت / توضیحات:* ${message || "ندارد"}`,
      "",
      `🕒 *زمان ثبت:* ${new Date().toLocaleString("fa-IR", { timeZone: "Asia/Tehran" })}`
    ].join("\n");

    // Send message to Telegram Bot API
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramText,
          parse_mode: "Markdown",
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Telegram API error:", result);
      return new Response(
        JSON.stringify({
          error: "Telegram notification failed",
          details: result,
        }),
        {
          status: response.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Reservation notification sent successfully",
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err: any) {
    console.error("Unexpected error in quick-action function:", err);
    return new Response(
      JSON.stringify({ error: err?.message || "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
