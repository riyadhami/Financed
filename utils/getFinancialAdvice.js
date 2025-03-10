import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const getFinancilaAdvice = async() => {
    try {
        const userPrompt = `
      Based on the following financial data:
      - Total Budget: ${totalBudget} INR 
      - Expenses: ${totalSpend} INR 
      - Incomes: ${totalIncome} INR
      Provide detailed financial advice in 2 sentence to help the user manage their finances more effectively.
    `;

    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{role: "user", content: userPrompt}],
    });

    const advice = chatCompletion.choices[0].message.content;
    console.log(advice);
    } catch(error) {
        console.error("Error fetching financial advice:", error);
        return "Sorry, I couldn't fetch the financial advice at this moment. Please try again later.";

    }
};

export default getFinancialAdvice;