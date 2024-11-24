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
import EvaluationDashboardCSV from './EvaluationDashboardCSV';
import './App.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const textColor = "lightblue"  //color of text

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

  // Bar Chart Options
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: textColor, 
        },
      },
      tooltip: {
        titleColor: "white",
        bodyColor: "white",
        backgroundColor: "rgba(0, 0, 0, 0.8)", 
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColor, //label color
        },
        grid: {
          color: "white", //line color
        },
      },
      y: {
        ticks: {
          color: textColor, //label color
        },
        grid: {
          color: "white", //line color
        },
      },
    },
  };

  // pie chart options
  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: textColor
        },
      },
      tooltip: {
        titleColor: "white",
        bodyColor: "white",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
      },
    },
    elements: {
      arc: {
        hoverOffset: 20, // how much it rises
      },
    },
  };

  return (
    <div style={{ padding: "20px", 
    maxWidth: "900px", 
    margin: "auto", 
    backgroundColor: "black", 
    color: textColor,
    borderRadius: "8px",
    }}>
       <style>{`
        body {
          margin: 0;
          background-color: #000000;
          color: #FFFFFF;
        }
      `}</style>
      <h1 style={{ textAlign: "center"}}>
        RAG Model Evaluation Dashboard</h1>
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ textAlign: "center"}}>
        Overview</h2>
        <p style={{ textAlign: "center"}}>
          <strong>Total Responses:</strong> {evaluationData.totalResponses}
        </p>
        <p style={{ textAlign: "center"}}>
          <strong>Correct Responses:</strong> {evaluationData.correctResponses} (
          {correctPercentage}%)
        </p>
        <p style={{ textAlign: "center"}}>
          <strong>Incorrect Responses:</strong> {evaluationData.incorrectResponses} (
          {(100 - correctPercentage).toFixed(2)}%)
        </p>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ textAlign: "center"}}>
            Performance Breakdown</h2>
        <Bar data={barData} options={barChartOptions} />
      </div>

      <div>
        <h2 style={{ textAlign: "center"}}
        >Correct vs. Incorrect Responses</h2>
        <Pie data={pieData} options={pieChartOptions}/>
      </div>
      <hr/>
      <EvaluationDashboardCSV />
    </div>
  );
};

export default EvaluationDashboard;