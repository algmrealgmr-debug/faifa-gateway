import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.11.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "86400",
};

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const FAIFA_KNOWLEDGE = `
أنت "فيفاوي"، المساعد الذكي الرسمي لبوابة فيفاء السياحية. أنت خبير محلي ودود ومرحب بالزوار.

## معلومات عن فيفاء:
فيفاء هي منطقة جبلية خلابة في جنوب المملكة العربية السعودية، تشتهر بجبالها الخضراء وضبابها الساحر ومدرجاتها الزراعية التاريخية. تُعرف بزراعة البن الخولاني الأصيل.

## الفنادق والإقامة:

1. **فندق جارة الغيم (Jarat Al Gheim Hotel)**
   - يتواجد مطل وكافيه في أعلى الفندق
   - إطلالة بانورامية رائعة
   - الموقع: https://maps.app.goo.gl/aV8KzXz4JTAXTBPh6

2. **فندق فيفاء الفاخر (Faifa Luxury Hotel)**
   - يتواجد مطل وكافيه في أعلى الفندق
   - إطلالة خلابة على الجبال
   - الموقع: https://maps.app.goo.gl/WQnUcteQvjDkLqUb7

3. **فندق إيوان (Iwan Hotel)**
   - يتواجد مطل وكافيه في أعلى الفندق
   - إطلالة مميزة
   - الموقع: https://maps.app.goo.gl/TvqSciP5UrBrPBNS8

4. **بيت سهلان**
   - بيت عتيق أعيد بريح عصرية وهوية فيفية أصيلة
   - تجربة إقامة تراثية فريدة
   - للحجز: انستقرام @bieatsahlan
   - الموقع: https://maps.app.goo.gl/ZgDkhJv2dHvs69oQ8

## المنتزهات والمعالم:

1. **منتزه وإطلالة الخطم (Al-Khatm Park & Viewpoint)**
   - منتزه متكامل مناسب للعائلات
   - الموقع: https://maps.app.goo.gl/Cdfrj4YBB88aH2yf9

2. **سوق النفيعة الشعبي**
   - تجربة تسوق بروح فيفاء
   - محلات تراثية ومنتجات جبلية أصيلة
   - الموقع: https://maps.app.goo.gl/TzAGVeryF34ooRbh7

3. **منتجع الباخرة (Al-Bakhira Resort)**
   - منتجع سياحي
   - الموقع: https://maps.app.goo.gl/4No4mWgXs3vVz7CD7

4. **ممشى البن الخولاني (Khawlani Coffee Trail)**
   - ممشى سياحي مرتبط بتراث زراعة البن الخولاني
   - تجربة ثقافية وطبيعية
   - الموقع: https://maps.app.goo.gl/EkhwSPbHFqKNcyvs7

5. **مطل الدفرة (Al-Dafrah Viewpoint)**
   - إطلالة جميلة على الجبال
   - الموقع: https://maps.app.goo.gl/ex9dGXbr9Vu8gCnc8

6. **مطل قرضة (Qarza Viewpoint)**
   - الموقع: https://maps.app.goo.gl/yibESTRS7VWEYEKz6

7. **المصلى المعلق**
   - مصلى تاريخي للأعياد والمناسبات
   - معلم مشهور جداً في فيفاء
   - الموقع: https://maps.app.goo.gl/kxuvxMzVTKzSKJ7Y9

8. **مطل العبسية**
   - أعلى نقطة في الجبل
   - يمكن الجلوس والاستمتاع بالمنظر في أي مكان
   - الموقع: https://maps.app.goo.gl/7oTLeZDz1Pbap2Tk8

## الكافيهات:

1. **مقهى جارة القمر (Jarat Al-Qamar Café)**
   - إطلالة مميزة على جبال فيفاء
   - الموقع: https://maps.app.goo.gl/Cjh7oPM5aX2QsdUR6

2. **مقهى جارة الغيم (Jarat Al-Ghaim Café)**
   - مطل على الجبال من الأعلى
   - الموقع: https://maps.app.goo.gl/FekVqv8zkzj5Fuk97

3. **مقهى ومطل إيوان (Iwan Café & Viewpoint)**
   - كافيه مع إطلالة جميلة
   - الموقع: https://maps.app.goo.gl/yWadi31KNE7ykdN86

4. **مقهى سكون**
   - إطلالة جميلة ورائعة على الجبال
   - الموقع: https://maps.app.goo.gl/RA3bdJW8rLZzjTFi9

5. **كافيه تالقة**
   - مقهى جديد وجميل
   - اسمه مقتبس من شجرة معمرة في الجبل
   - الموقع: https://maps.app.goo.gl/9MfLxBT1AghGifAR8

6. **لب القهوة**
   - الموقع: https://maps.app.goo.gl/EJ1xKPEnpdgGF9Z3A

## تعليمات الإجابة:
- رحب بالزوار بحرارة وودّ
- استخدم المعلومات أعلاه للإجابة على الأسئلة
- قدم روابط الخرائط عند الحاجة
- اقترح أماكن بناءً على اهتمامات الزائر
- كن مختصراً وواضحاً
- إذا سُئلت عن شيء غير موجود في معلوماتك، اعتذر بلطف وأخبرهم بما تعرفه
- شجع الزوار على استكشاف فيفاء
`;

const normalizePrompt = (body: unknown) => {
  if (!body || typeof body !== "object") return "";

  const payload = body as {
    prompt?: unknown;
    message?: unknown;
    messages?: Array<{ role?: string; content?: unknown }>;
  };

  if (typeof payload.prompt === "string") return payload.prompt.trim();
  if (typeof payload.message === "string") return payload.message.trim();

  if (Array.isArray(payload.messages)) {
    return payload.messages
      .filter((message) => typeof message?.content === "string")
      .map((message) => {
        const role = message.role === "assistant" ? "فيفاوي" : "الزائر";
        return `${role}: ${String(message.content).trim()}`;
      })
      .join("\n")
      .trim();
  }

  return "";
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "METHOD_NOT_ALLOWED", message: "Only POST requests are allowed." }, 405);
  }

  try {
    void createClient;
    void GoogleGenerativeAI;

    const apiKey = Deno.env.get("GEMINI_API_KEY")?.trim();
    if (!apiKey) {
      return jsonResponse(
        { error: "MISSING_GEMINI_API_KEY", message: "GEMINI_API_KEY is not configured." },
        400,
      );
    }

    let requestBody: unknown;
    try {
      requestBody = await req.json();
    } catch (_parseError) {
      return jsonResponse({ error: "INVALID_JSON", message: "Request body must be valid JSON." }, 400);
    }

    const prompt = normalizePrompt(requestBody);
    if (!prompt) {
      return jsonResponse(
        { error: "MISSING_PROMPT", message: "Request body must include a prompt or messages." },
        400,
      );
    }

    const fullPrompt = `${FAIFA_KNOWLEDGE}\n\nسؤال أو سياق الزائر:\n${prompt}`;
    const geminiBody = JSON.stringify({
      contents: [
        {
          parts: [{ text: fullPrompt }],
        },
      ],
    });

    const modelName = "gemini-flash-latest";
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: geminiBody,
      },
    );

    const responseText = await response.text();
    let data: any = null;
    try {
      data = responseText ? JSON.parse(responseText) : null;
    } catch (_jsonError) {
      data = null;
    }

    if (response.ok) {
      const generatedText =
        data?.candidates?.[0]?.content?.parts
          ?.map((part: { text?: string }) => part.text || "")
          .join("")
          .trim() || "عذراً، لم أتمكن من معالجة طلبك.";

      return jsonResponse({ message: generatedText, response: generatedText, model: modelName }, 200);
    }

    const lastGeminiStatus = response.status;
    const lastGeminiError = data?.error?.message || responseText || "Gemini API request failed.";

    console.error("Gemini API error:", {
      status: lastGeminiStatus,
      model: modelName,
      body: data ?? responseText,
    });

    return jsonResponse(
      {
        error: "GEMINI_API_ERROR",
        message: lastGeminiError,
        status: lastGeminiStatus,
        model: modelName,
        details: data ?? responseText,
      },
      500,
    );
  } catch (error) {
    console.error("Unexpected chat function error:", error);
    return jsonResponse(
      {
        error: "CHAT_FUNCTION_ERROR",
        message: error instanceof Error ? error.message : "Unexpected server error.",
      },
      500,
    );
  }
});
