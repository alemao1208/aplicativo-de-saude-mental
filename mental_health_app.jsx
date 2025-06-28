import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const questions = [
  "Nos últimos 7 dias, com que frequência você se sentiu triste ou deprimido?",
  "Você tem sentido falta de interesse ou prazer nas atividades?",
  "Tem tido dificuldades para dormir ou dormido demais?",
  "Como tem estado seu nível de energia?",
  "Você tem conseguido se concentrar em suas tarefas?",
];

export default function MentalHealthApp() {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState(Array(questions.length).fill(""));
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");

  const handleResponse = (value) => {
    const newResponses = [...responses];
    newResponses[step] = value;
    setResponses(newResponses);
    setStep(step + 1);
  };

  const handleChat = () => {
    if (input.trim() === "") return;
    const newChat = [
      ...chat,
      { from: "user", text: input },
      {
        from: "ia",
        text: empatheticResponse(input),
      },
    ];
    setChat(newChat);
    setInput("");
  };

  const empatheticResponse = (msg) => {
    if (msg.includes("triste")) return "Sinto muito que você esteja se sentindo assim. Quer conversar mais sobre isso? Estou aqui para te ouvir.";
    if (msg.includes("ansioso")) return "A ansiedade pode ser difícil de lidar. Você não está sozinho. Que tal respirarmos fundo juntos?";
    if (msg.includes("feliz")) return "Fico muito feliz em ouvir isso! Conte-me mais sobre o que te deixou feliz!";
    return "Entendo. Pode me contar mais sobre como está se sentindo? Quero te ajudar.";
  };

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-center">Política Pública de Saúde Mental</h1>
      {step < questions.length ? (
        <Card>
          <CardContent className="p-4 space-y-4">
            <p className="text-lg font-medium">{questions[step]}</p>
            <Input
              placeholder="Digite sua resposta"
              value={responses[step]}
              onChange={(e) => handleResponse(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleResponse(e.target.value)}
            />
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardContent className="p-4 space-y-2 h-64 overflow-y-auto bg-gray-50">
              {chat.map((msg, idx) => (
                <div key={idx} className={`text-${msg.from === "user" ? "right" : "left"}`}> 
                  <p className={`text-sm ${msg.from === "user" ? "text-blue-700" : "text-green-700"}`}>{msg.text}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <div className="flex gap-2">
            <Input
              placeholder="Digite sua mensagem..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleChat()}
            />
            <Button onClick={handleChat}>Enviar</Button>
          </div>
        </>
      )}
    </div>
  );
}
