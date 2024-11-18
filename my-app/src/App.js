// Import required libraries
import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

// Mock Data
const evaluationData = {
  totalResponses: 100,
  correctResponses: 78,
  incorrectResponses: 22,
  metrics: {
    accuracy: 85,
    relevance: 90,
    clarity: 80,
  },
};

const categoryBreakdown = [
  { category: "Accuracy", score: 85 },
  { category: "Relevance", score: 90 },
  { category: "Clarity", score: 80 },
];

// Main Component
const EvaluationDashboard = () => {
  const correctPercentage = (
    (evaluationData.correctResponses / evaluationData.totalResponses) *
    100
  ).toFixed(2);

  // Bar Chart Data
  const barData = {
    labels: categoryBreakdown.map((item) => item.category),
    datasets: [
      {
        label: "Performance Score (%)",
        data: categoryBreakdown.map((item) => item.score),
        backgroundColor: ["#4caf50", "#2196f3", "#ff9800"],
      },
    ],
  };

  // Pie Chart Data
  const pieData = {
    labels: ["Correct Responses", "Incorrect Responses"],
    datasets: [
      {
        data: [evaluationData.correctResponses, evaluationData.incorrectResponses],
        backgroundColor: ["#4caf50", "#f44336"],
      },
    ],
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h1>RAG Model Evaluation Dashboard</h1>
      <div style={{ marginBottom: "20px" }}>
        <h2>Overview</h2>
        <p>
          <strong>Total Responses:</strong> {evaluationData.totalResponses}
        </p>
        <p>
          <strong>Correct Responses:</strong> {evaluationData.correctResponses} (
          {correctPercentage}%)
        </p>
        <p>
          <strong>Incorrect Responses:</strong> {evaluationData.incorrectResponses} (
          {(100 - correctPercentage).toFixed(2)}%)
        </p>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h2>Performance Breakdown</h2>
        <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
      </div>

      <div>
        <h2>Correct vs. Incorrect Responses</h2>
        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default EvaluationDashboard;