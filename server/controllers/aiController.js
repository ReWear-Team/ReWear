const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateDescription = async (req, res) => {
  try {
    const { title, category, condition } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an AI assistant for a sustainable fashion marketplace.

Generate:

1. Improved title
2. Product description (50-80 words)
3. 5 tags
4. Suggested resale price range

Product:
Title: ${title}
Category: ${category}
Condition: ${condition}

Return ONLY valid JSON:

{
  "title":"",
  "description":"",
  "tags":[],
  "suggestedPrice":""
}
`;

    const result = await model.generateContent(prompt);

    const responseText = result.response.text();

    const cleaned = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const data = JSON.parse(cleaned);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("AI Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate description",
    });
  }
};

const smartSearchKeywords = async (req, res) => {
  try {
    const { query } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
Extract search keywords from this clothing search.

Query:
"${query}"

Return ONLY JSON:

{
  "keywords":[]
}
`;

    const result = await model.generateContent(prompt);

    const text = result.response
      .text()
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const data = JSON.parse(text);

    res.json({
      success: true,
      keywords: data.keywords,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
    });
  }
};

module.exports = {
  generateDescription,
  smartSearchKeywords,
};