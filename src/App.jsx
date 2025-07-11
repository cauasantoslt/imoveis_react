import { useState } from "react";
import {
  ScatterChart,
  Scatter,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { Info } from "lucide-react";
import { motion } from "framer-motion";

const SLOPE = 6834;
const INTERCEPT = 50000;

const sampleData = Array.from({ length: 50 }, (_, i) => {
  const area = 40 + i * 8;
  const noise = (Math.random() - 0.5) * 50000;
  const price = INTERCEPT + SLOPE * area + noise;
  return { area, price };
});

export default function App() {
  const [area, setArea] = useState(100);
  const predictedPrice = INTERCEPT + SLOPE * area;

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-5xl font-bold text-center mb-8"
      >
        Prevendo Preços de Imóveis com Regressão Linear
      </motion.h1>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="rounded-2xl shadow-lg bg-white p-6 space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Info className="w-5 h-5" /> Estime o preço para uma área
          </h2>
          <div className="flex flex-col gap-4">
            <label htmlFor="areaSlider" className="font-medium">
              Área do 1º andar (m²): {area}
            </label>
            <input
              id="areaSlider"
              type="range"
              min={20}
              max={400}
              step={1}
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <p className="text-lg">
              <span className="font-semibold">Preço previsto:</span> R${" "}
              {predictedPrice.toLocaleString("pt-BR", {
                maximumFractionDigits: 0,
              })}
            </p>
            <p className="text-sm text-gray-500">
              Fórmula: preço = {INTERCEPT.toLocaleString("pt-BR")} +{" "}
              {SLOPE.toLocaleString("pt-BR")} × área
            </p>
          </div>
        </div>

        <div className="rounded-2xl shadow-lg bg-white p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Info className="w-5 h-5" /> Visualização dos Dados
          </h2>
          <ScatterChart width={500} height={300} className="mx-auto">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="area" name="Área (m²)" />
            <YAxis
              dataKey="price"
              name="Preço (R$)"
              tickFormatter={(v) => (v / 1000).toLocaleString("pt-BR") + "k"}
            />
            <Tooltip
              formatter={(value) =>
                `R$ ${Number(value).toLocaleString("pt-BR")}`
              }
            />
            <Scatter name="Imóveis" data={sampleData} fill="#3b82f6" />
            <ReferenceLine
              segment={[
                { x: 20, y: INTERCEPT + SLOPE * 20 },
                { x: 400, y: INTERCEPT + SLOPE * 400 },
              ]}
              stroke="#ef4444"
              strokeDasharray="6 3"
              label="Regressão"
            />
          </ScatterChart>
        </div>
      </section>

      <section className="max-w-3xl mx-auto space-y-4">
        {[
          {
            title: "1. Introdução",
            body: "Utilizamos uma base de dados inspirada no desafio 'House Prices' (Kaggle). A variável alvo é o preço de venda do imóvel.",
          },
          {
            title: "2. Análise Exploratória",
            body: "Foi calculada a correlação de Pearson entre preço e variáveis como a área do primeiro andar, identificando fortes relações lineares.",
          },
          {
            title: "3. Modelo de Regressão",
            body: "Usamos regressão linear simples (OLS) com a área como preditor. O coeficiente angular (~R$ 6.834) indica o impacto de cada m² adicional no preço.",
          },
          {
            title: "4. Interpretação dos Coeficientes",
            body: "O intercepto (~R$ 50.000 nesta demo) estima o preço base. O R² avalia a proporção de variância explicada pela área.",
          },
        ].map((item, idx) => (
          <details
            key={idx}
            className="border rounded-xl p-4 bg-white shadow"
          >
            <summary className="cursor-pointer font-semibold text-lg mb-2">
              {item.title}
            </summary>
            <p className="text-gray-700 leading-relaxed">{item.body}</p>
          </details>
        ))}
      </section>

      <footer className="mt-12 text-center text-sm text-gray-500">
        Site interativo criado com React, Tailwind e Recharts • Adaptado por
        ChatGPT
      </footer>
    </main>
  );
}
