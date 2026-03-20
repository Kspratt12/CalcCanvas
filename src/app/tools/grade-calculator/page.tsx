'use client';

import { useState } from 'react';
import Link from 'next/link';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Grade Calculator',
  url: 'https://calcanvas.com/tools/grade-calculator',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  description:
    'Calculate your weighted course grade and letter grade. Find out what score you need on your final exam to reach your target grade.',
};

interface Assignment {
  id: number;
  name: string;
  score: string;
  totalPoints: string;
  weight: string;
}

let nextId = 1;

function createAssignment(): Assignment {
  return { id: nextId++, name: '', score: '', totalPoints: '', weight: '' };
}

function getLetterGrade(pct: number): string {
  if (pct >= 93) return 'A';
  if (pct >= 90) return 'A-';
  if (pct >= 87) return 'B+';
  if (pct >= 83) return 'B';
  if (pct >= 80) return 'B-';
  if (pct >= 77) return 'C+';
  if (pct >= 73) return 'C';
  if (pct >= 70) return 'C-';
  if (pct >= 67) return 'D+';
  if (pct >= 63) return 'D';
  if (pct >= 60) return 'D-';
  return 'F';
}

export default function GradeCalculator() {
  const [assignments, setAssignments] = useState<Assignment[]>([
    createAssignment(),
    createAssignment(),
    createAssignment(),
  ]);
  const [result, setResult] = useState<{
    weightedGrade: number;
    letterGrade: string;
    totalWeight: number;
  } | null>(null);

  const [finalWeight, setFinalWeight] = useState('');
  const [desiredGrade, setDesiredGrade] = useState('');
  const [neededScore, setNeededScore] = useState<number | null>(null);

  function addAssignment() {
    setAssignments([...assignments, createAssignment()]);
  }

  function removeAssignment(id: number) {
    if (assignments.length <= 1) return;
    setAssignments(assignments.filter((a) => a.id !== id));
  }

  function updateAssignment(id: number, field: keyof Assignment, value: string) {
    setAssignments(assignments.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
  }

  function calculate() {
    let weightedSum = 0;
    let totalWeight = 0;

    for (const a of assignments) {
      const score = parseFloat(a.score);
      const total = parseFloat(a.totalPoints);
      const weight = parseFloat(a.weight);
      if (isNaN(score) || isNaN(total) || isNaN(weight) || total <= 0 || weight <= 0) continue;

      const pct = (score / total) * 100;
      weightedSum += pct * (weight / 100);
      totalWeight += weight;
    }

    if (totalWeight === 0) return;

    const weightedGrade = (weightedSum / totalWeight) * 100;

    setResult({
      weightedGrade,
      letterGrade: getLetterGrade(weightedGrade),
      totalWeight,
    });
  }

  function calculateNeededScore() {
    const fWeight = parseFloat(finalWeight);
    const desired = parseFloat(desiredGrade);
    if (!result || isNaN(fWeight) || isNaN(desired) || fWeight <= 0) {
      setNeededScore(null);
      return;
    }

    const currentWeight = result.totalWeight;
    const currentWeightedSum = (result.weightedGrade / 100) * currentWeight;
    const needed = ((desired * (currentWeight + fWeight) / 100) - currentWeightedSum) / (fWeight / 100);

    setNeededScore(needed);
  }

  function reset() {
    nextId = 1;
    setAssignments([createAssignment(), createAssignment(), createAssignment()]);
    setResult(null);
    setFinalWeight('');
    setDesiredGrade('');
    setNeededScore(null);
  }

  function getGradeColor(pct: number): string {
    if (pct >= 90) return 'text-green-600';
    if (pct >= 80) return 'text-[#2563eb]';
    if (pct >= 70) return 'text-yellow-600';
    return 'text-red-600';
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How are weighted grades calculated?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Weighted grades multiply each assignment's percentage score by its weight, then divide by the total weight. This means a final exam worth 40% of your grade has more impact than a homework assignment worth 5%."
                }
              },
              {
                "@type": "Question",
                "name": "What is the standard grading scale?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The most common scale is: A (93-100%), A- (90-92%), B+ (87-89%), B (83-86%), B- (80-82%), C+ (77-79%), C (73-76%), C- (70-72%), D+ (67-69%), D (63-66%), D- (60-62%), F (below 60%)."
                }
              },
              {
                "@type": "Question",
                "name": "How do I figure out what I need on my final?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Enter your current assignments and grades, calculate your current grade, then use the 'Score Needed on Final' section below. Enter the final exam's weight and your desired overall grade to see exactly what score you need."
                }
              },
              {
                "@type": "Question",
                "name": "Do all professors use the same grading weights?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No, grading weights vary by professor and course. Common structures include: exams 50-60%, homework 15-25%, quizzes 10-15%, participation 5-10%, and a final project or paper 15-25%. Always check your syllabus."
                }
              }
            ]
          })
        }}
      />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Grade Calculator</h1>
      <p className="text-gray-600 mb-6">
        Calculate your weighted course grade and find out what you need on your final exam to reach your target grade.
      </p>


      <div className="mt-8 space-y-3">
        {assignments.map((a, index) => (
          <div key={a.id} className="flex gap-2 items-end">
            <div className="flex-1">
              {index === 0 && (
                <label className="block text-sm font-medium text-gray-700 mb-1">Assignment</label>
              )}
              <input
                type="text"
                value={a.name}
                onChange={(e) => updateAssignment(a.id, 'name', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                placeholder={`Assignment ${index + 1}`}
              />
            </div>
            <div className="w-20">
              {index === 0 && (
                <label className="block text-sm font-medium text-gray-700 mb-1">Score</label>
              )}
              <input
                type="number"
                value={a.score}
                onChange={(e) => updateAssignment(a.id, 'score', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                placeholder="85"
              />
            </div>
            <div className="w-20">
              {index === 0 && (
                <label className="block text-sm font-medium text-gray-700 mb-1">Total</label>
              )}
              <input
                type="number"
                value={a.totalPoints}
                onChange={(e) => updateAssignment(a.id, 'totalPoints', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                placeholder="100"
              />
            </div>
            <div className="w-24">
              {index === 0 && (
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight %</label>
              )}
              <input
                type="number"
                value={a.weight}
                onChange={(e) => updateAssignment(a.id, 'weight', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                placeholder="20"
              />
            </div>
            <button
              onClick={() => removeAssignment(a.id)}
              className="px-3 py-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition text-lg font-bold"
              title="Remove assignment"
            >
              &times;
            </button>
          </div>
        ))}

        <button
          onClick={addAssignment}
          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-[#2563eb] hover:text-[#2563eb] transition font-medium"
        >
          + Add Assignment
        </button>

        <div className="flex gap-3 pt-2">
          <button
            onClick={calculate}
            className="flex-1 bg-[#2563eb] text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Calculate Grade
          </button>
          <button
            onClick={reset}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition"
          >
            Reset
          </button>
        </div>
      </div>

      {result && (
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Results</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-500">Weighted Grade</p>
              <p className={`text-3xl font-bold ${getGradeColor(result.weightedGrade)}`}>
                {result.weightedGrade.toFixed(1)}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Letter Grade</p>
              <p className="text-2xl font-bold text-gray-900">
                {result.letterGrade}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Weight Used</p>
              <p className="text-2xl font-bold text-gray-900">
                {result.totalWeight}%
              </p>
            </div>
          </div>
        </div>
      )}

      {result && (
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Score Needed on Final</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Final Exam Weight (%)
              </label>
              <input
                type="number"
                value={finalWeight}
                onChange={(e) => setFinalWeight(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                placeholder="30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Desired Overall Grade (%)
              </label>
              <input
                type="number"
                value={desiredGrade}
                onChange={(e) => setDesiredGrade(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                placeholder="90"
              />
            </div>
          </div>
          <button
            onClick={calculateNeededScore}
            className="mt-4 w-full bg-gray-800 text-white font-semibold py-3 rounded-lg hover:bg-gray-900 transition"
          >
            Calculate Needed Score
          </button>
          {neededScore !== null && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">You need to score at least</p>
              <p className={`text-3xl font-bold ${neededScore <= 100 ? 'text-[#2563eb]' : 'text-red-600'}`}>
                {neededScore.toFixed(1)}%
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {neededScore <= 100
                  ? 'on your final to reach your target grade.'
                  : 'which exceeds 100% \u2014 this target may not be achievable.'}
              </p>
            </div>
          )}
        </div>
      )}
<section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          What Is a Grade Calculator?
        </h2>
        <p className="text-gray-600 mb-3">
          A grade calculator computes your overall course grade by factoring in each assignment&apos;s score and its weight toward the final grade. Most courses use a weighted grading system where exams count more than homework, and a single final exam might represent 30-40% of your total grade.
        </p>
        <p className="text-gray-600 mb-3">
          This tool handles the math behind weighted averages so you can see exactly where you stand at any point in the semester. Enter each graded assignment with its score, total possible points, and weight percentage to get your current weighted grade and letter grade.
        </p>
        <p className="text-gray-600">
          The &quot;Score Needed on Final&quot; feature is especially useful during finals week. After calculating your current grade, enter your final exam&apos;s weight and your target grade to find out exactly what score you need. This helps you allocate study time effectively across multiple finals.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Frequently Asked Questions
        </h2>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          How are weighted grades calculated?
        </h3>
        <p className="text-gray-600 mb-4">
          Each assignment&apos;s percentage score is multiplied by its weight. These weighted values are summed and divided by the total weight. For example, if you scored 90% on homework (worth 30%) and 80% on an exam (worth 70%), your weighted grade is (90 &times; 0.30 + 80 &times; 0.70) / 1.00 = 83%.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What is the standard grading scale?
        </h3>
        <p className="text-gray-600 mb-4">
          The most common scale is: A (93-100%), A- (90-92%), B+ (87-89%), B (83-86%), B- (80-82%), C+ (77-79%), C (73-76%), C- (70-72%), D+ (67-69%), D (63-66%), D- (60-62%), F (below 60%). Some professors use different cutoffs, so always check your syllabus.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          How do I figure out what I need on my final?
        </h3>
        <p className="text-gray-600 mb-4">
          First, enter all your current assignments and calculate your grade. Then use the &quot;Score Needed on Final&quot; section. Enter the final exam&apos;s weight percentage and your desired overall grade. The calculator will tell you exactly what score you need to achieve your goal.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          Do all professors use the same grading weights?
        </h3>
        <p className="text-gray-600 mb-4">
          No, grading weights vary by professor and course. Common structures include exams at 50-60%, homework at 15-25%, quizzes at 10-15%, participation at 5-10%, and a final project or paper at 15-25%. Always refer to your course syllabus for the specific breakdown.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What if my weights don&apos;t add up to 100%?
        </h3>
        <p className="text-gray-600">
          This calculator normalizes the weights, so it still works correctly even if you haven&apos;t entered all categories yet. For instance, if you&apos;ve only entered assignments worth 60% of your grade, it will calculate your grade based on those 60% and show you the weight used.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Example Calculation
        </h2>
        <p className="text-gray-600 mb-3">
          A student has completed several assignments in their Biology course:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mb-3">
          <li>Homework: 92/100 (weight: 20%) &rarr; 92% &times; 0.20 = 18.4</li>
          <li>Midterm 1: 78/100 (weight: 25%) &rarr; 78% &times; 0.25 = 19.5</li>
          <li>Midterm 2: 85/100 (weight: 25%) &rarr; 85% &times; 0.25 = 21.25</li>
        </ul>
        <p className="text-gray-600 mb-3">
          Current weighted sum: 59.15 out of 70% of the grade. Normalized grade: 59.15 / 0.70 = <strong>84.5% (B)</strong>.
        </p>
        <p className="text-gray-600">
          With a final exam worth 30%, the student needs at least a 90.2% on the final to finish with an A- (90% overall). The math: (90 &times; 1.00 - 59.15) / 0.30 = 102.8% &mdash; not possible. However, scoring an 88% on the final would yield an overall grade of 85.6% (B), which is still solid.
        </p>
      </section>

      <section className="mt-8 pb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Related Tools
        </h2>
        <ul className="space-y-1">
          <li><Link href="/tools/gpa-calculator" className="text-[#2563eb] hover:underline">GPA Calculator</Link></li>
          <li><Link href="/tools/percentage-calculator" className="text-[#2563eb] hover:underline">Percentage Calculator</Link></li>
          <li><Link href="/tools/average-calculator" className="text-[#2563eb] hover:underline">Average Calculator</Link></li>
          <li><Link href="/tools/fraction-calculator" className="text-[#2563eb] hover:underline">Fraction Calculator</Link></li>
        </ul>
      </section>
    </main>
  );
}
