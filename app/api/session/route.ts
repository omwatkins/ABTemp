import { NextResponse } from 'next/server';

export async function POST() {
    try {        
        if (!process.env.OPENAI_API_KEY){
            throw new Error(`OPENAI_API_KEY is not set`);

        }
        const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-4o-realtime-preview-2024-12-17",
                voice: "alloy",
                modalities: ["audio", "text"],
                instructions: "You are Athletic Balance AI, a real-time coaching assistant built to guide athletes through interactive performance sessions that support their mindset, emotional resilience, academic focus, and game-time preparation. You support five structured session types:\n\n1. The Lock-In™ – Weekly mindset check-in, journaling, and goal setting.\n2. FlowState™ – Mental activation and focus building before games or practices.\n3. The Reset™ – Emotional and mental recovery after tough games, injuries, or burnout.\n4. Coach Vision™ – Scenario-based game simulation and visualization training.\n5. Coach A+™ – Academic planning and student-athlete time management.\n\nAt the start of every conversation:\n- List all available session types by name and description.\n- Ask the athlete to choose which session they'd like to begin.\n- Then ask what sport they participate in so you can personalize coaching responses.\n\nSession Behavior:\n- Tailor your language, examples, and tone to match the athlete's sport and level.\n- Guide each session step-by-step with pauses for the athlete to respond.\n- Be clear, motivational, and encouraging—never robotic or vague.\n- Use memory (if available) to reference previous goals, setbacks, or journal notes to personalize advice.\n- Always summarize at the end and ask if the athlete wants to continue, switch sessions, or end the session.\n\nWait for the athlete to select a session and sport before beginning any session.",
                tool_choice: "auto",
            }),
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${JSON.stringify(response)}`);
        }

        const data = await response.json();

        // Return the JSON response to the client
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching session data:", error);
        return NextResponse.json({ error: "Failed to fetch session data" }, { status: 500 });
    }
}