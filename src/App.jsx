// src/App.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Info } from 'lucide-react';

const modelo = (area) => 6834 * area + 23803;

const dados = Array.from({ length: 11 }, (_, i) => ({
  area: i * 10 + 50,
  preco: modelo(i * 10 + 50),
}));

export default function App() {
  const [area, setArea] = useState(100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 to-white p-4 md:p-10 text-gray-800">
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.h1 layout className="text-4xl font-bold text-center text-emerald-800">
          🏠 Previsão de Preço de Imóveis
        </motion.h1>

        <motion.p layout className="text-center text-lg">
          Ajuste a área construída e veja a previsão de preço com base em uma regressão linear simples.
        </motion.p>

        <Card className="bg-white/60 backdrop-blur-lg shadow-xl rounded-2xl">
          <CardContent className="space-y-4 p-6">
            <label className="block font-medium text-emerald-700">
              Área construída (m²): {area}
            </label>
            <input
              type="range"
              min={50}
              max={200}
              value={area}
              onChange={(e) => setArea(+e.target.value)}
              className="w-full accent-emerald-600"
            />
            <p className="text-xl font-semibold text-center">
              💰 Preço estimado: <span className="text-emerald-700">R$ {modelo(area).toLocaleString()}</span>
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Info className="w-5 h-5 text-emerald-600" /> Como funciona a regressão?
            </h2>
            <p>
              O modelo de regressão linear estima o preço com base em uma fórmula: <br />
              <span className="italic text-emerald-700">Preço = 6834 × Área + 23803</span>
            </p>
            <p className="mt-2">
              Isso significa que a cada metro quadrado adicional, o preço aumenta em média R$ 6.834.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/70 shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">📈 Gráfico de Dispersão</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dados}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="area" label={{ value: 'Área (m²)', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'Preço (R$)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => `R$ ${value.toLocaleString()}`} />
                <Line type="monotone" dataKey="preco" stroke="#059669" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
