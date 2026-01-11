import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI Client
// In a real app, you would probably pick between OpenAI or Anthropic based on env vars
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'dummy-key', // Fallback for build time
});

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: `You are a helpful data analyst assistant for a business dashboard. 
          You have access to the dashboard state and can control it using tools.
          To answer questions about the data, ALWAYS use the 'filterData' tool to narrow down the view if specific criteria are mentioned, 
          or 'changeView' to switch between Table and Chart modes.
          If the user asks "Show me sales in the North", call 'filterData' with region='North'.
          If the user asks "Show me a chart", call 'changeView' with mode='chart'.
          
          The available data columns are: id, date, product, category, amount, region.`
                },
                ...messages
            ],
            tools: [
                {
                    type: 'function',
                    function: {
                        name: 'filterData',
                        description: 'Filter the dashboard data based on criteria.',
                        parameters: {
                            type: 'object',
                            properties: {
                                minAmount: { type: 'number', description: 'Minimum sale amount' },
                                maxAmount: { type: 'number', description: 'Maximum sale amount' },
                                category: { type: 'string', description: 'Product category (e.g., "Electronics", "Furniture")' },
                                region: { type: 'string', description: 'Region (e.g., "North", "South", "East", "West")' },
                                search: { type: 'string', description: 'Search term for product name' },
                            },
                        },
                    },
                },
                {
                    type: 'function',
                    function: {
                        name: 'changeView',
                        description: 'Change the dashboard view mode.',
                        parameters: {
                            type: 'object',
                            properties: {
                                mode: { type: 'string', enum: ['table', 'chart'], description: 'The view mode to switch to' },
                            },
                            required: ['mode'],
                        },
                    },
                },
                {
                    type: 'function',
                    function: {
                        name: 'clearFilters',
                        description: 'Clear all active filters to show all data.',
                        parameters: {
                            type: 'object',
                            properties: {},
                        }
                    }
                }
            ],
            tool_choice: 'auto',
        });

        // Return the full choice message so the frontend can handle content or tool_calls
        return NextResponse.json(response.choices[0].message);

    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
