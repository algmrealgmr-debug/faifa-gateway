import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

    console.log('GEMINI_API_KEY present:', Boolean(GEMINI_API_KEY));
    
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    console.log('Processing chat request with', messages.length, 'messages');

    // Convert messages to Gemini format
    const geminiMessages = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const modelName = 'gemini-2.0-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: FAIFA_KNOWLEDGE }]
          },
          contents: geminiMessages,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          }
        }),
      }
    );

    if (!response.ok) {
      const status = response.status;
      const errorText = await response.text();

      console.error('Gemini API error:', status, errorText);

      // Surface rate limiting explicitly so the client can show a friendly message.
      if (status === 429) {
        return new Response(JSON.stringify({ error: 'RATE_LIMIT' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      throw new Error(`Gemini API error: ${status}`);
    }

    const data = await response.json();
    console.log('Gemini response received');
    
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'عذراً، لم أتمكن من معالجة طلبك.';

    return new Response(JSON.stringify({ message: generatedText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
