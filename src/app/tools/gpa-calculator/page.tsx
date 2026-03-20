'use client';

import { useState } from 'react';
import Link from 'next/link';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'GPA Calculator',
  url: 'https://calcanvas.com/tools/gpa-calculator',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  description:
    'Calculate your weighted college GPA on a 4.0 scale. Add multiple courses with letter grades and credit hours.',
};

const gradeOptions = [
  { label: 'A', value: 4.0 },
  { label: 'A-', value: 3.7 },
  { label: 'B+', value: 3.3 },
  { label: 'B', value: 3.0 },
  { label: 'B-', value: 2.7 },
  { label: 'C+', value: 2.3 },
  { label: 'C', value: 2.0 },
  { label: 'C-', value: 1.7 },
  { label: 'D+', value: 1.3 },
  { label: 'D', value: 1.0 },
  { label: 'F', value: 0.0 },
];

interface Course {
  id: number;
  name: string;
  grade: string;
  credits: string;
}

let nextId = 1;

function createCourse(): Course {
  return { id: nextId++, name: '', grade: '4.0', credits: '3' };
}

export default function GPACalculator() {
  const [courses, setCourses] = useState<Course[]>([createCourse(), createCourse(), createCourse(), createCourse()]);
  const [result, setResult] = useState<{ gpa: number; totalCredits: number; totalPoints: number } | null>(null);

  function addCourse() {
    setCourses([...courses, createCourse()]);
  }

  function removeCourse(id: number) {
    if (courses.length <= 1) return;
    setCourses(courses.filter((c) => c.id !== id));
  }

  function updateCourse(id: number, field: keyof Course, value: string) {
    setCourses(courses.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  }

  function calculate() {
    let totalCredits = 0;
    let totalPoints = 0;

    for (const course of courses) {
      const credits = parseFloat(course.credits);
      const gradePoint = parseFloat(course.grade);
      if (isNaN(credits) || credits <= 0 || isNaN(gradePoint)) continue;

      totalCredits += credits;
      totalPoints += credits * gradePoint;
    }

    if (totalCredits === 0) return;

    setResult({
      gpa: totalPoints / totalCredits,
      totalCredits,
      totalPoints,
    });
  }

  function reset() {
    nextId = 1;
    setCourses([createCourse(), createCourse(), createCourse(), createCourse()]);
    setResult(null);
  }

  function getGpaColor(gpa: number): string {
    if (gpa >= 3.5) return 'text-green-600';
    if (gpa >= 3.0) return 'text-[#2563eb]';
    if (gpa >= 2.0) return 'text-yellow-600';
    return 'text-red-600';
  }

  function getLetterGrade(gpa: number): string {
    if (gpa >= 3.85) return 'A';
    if (gpa >= 3.5) return 'A-';
    if (gpa >= 3.15) return 'B+';
    if (gpa >= 2.85) return 'B';
    if (gpa >= 2.5) return 'B-';
    if (gpa >= 2.15) return 'C+';
    if (gpa >= 1.85) return 'C';
    if (gpa >= 1.5) return 'C-';
    if (gpa >= 1.15) return 'D+';
    if (gpa >= 0.85) return 'D';
    return 'F';
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
                "name": "How is GPA calculated?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "GPA is calculated by multiplying each course's grade points by its credit hours, summing those products, then dividing by total credit hours. For example, an A (4.0) in a 3-credit course and a B (3.0) in a 4-credit course gives (4.0×3 + 3.0×4) / 7 = 3.43 GPA."
                }
              },
              {
                "@type": "Question",
                "name": "What is a good GPA?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A GPA of 3.0 or above (B average) is generally considered good. A 3.5+ is considered excellent and competitive for graduate school. A 3.7+ often qualifies for Dean's List at many universities."
                }
              },
              {
                "@type": "Question",
                "name": "What is the difference between weighted and unweighted GPA?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "An unweighted GPA treats all courses equally on a 4.0 scale. A weighted GPA gives extra points for honors, AP, or IB courses (often on a 5.0 scale). This calculator uses the standard weighted-by-credit-hours method on a 4.0 scale."
                }
              },
              {
                "@type": "Question",
                "name": "Do plus and minus grades affect GPA?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, at most colleges. An A- is worth 3.7 instead of 4.0, while a B+ is 3.3 instead of 3.0. These differences add up over multiple courses and can significantly impact your cumulative GPA."
                }
              },
              {
                "@type": "Question",
                "name": "Can I raise my GPA significantly in one semester?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The impact depends on how many credits you've already completed. Early in college, one strong semester can make a big difference. Later, the cumulative average is harder to move because it's weighted by more total credits."
                }
              }
            ]
          })
        }}
      />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">GPA Calculator</h1>
      <p className="text-gray-600 mb-6">
        Calculate your weighted GPA on a 4.0 scale. Add your courses, select grades, and enter credit hours.
      </p>


      <div className="mt-8 space-y-3">
        {courses.map((course, index) => (
          <div key={course.id} className="flex gap-2 items-end">
            <div className="flex-1">
              {index === 0 && (
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
              )}
              <input
                type="text"
                value={course.name}
                onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                placeholder={`Course ${index + 1}`}
              />
            </div>
            <div className="w-28">
              {index === 0 && (
                <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
              )}
              <select
                value={course.grade}
                onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white"
              >
                {gradeOptions.map((g) => (
                  <option key={g.label} value={g.value}>
                    {g.label} ({g.value})
                  </option>
                ))}
              </select>
            </div>
            <div className="w-24">
              {index === 0 && (
                <label className="block text-sm font-medium text-gray-700 mb-1">Credits</label>
              )}
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={course.credits}
                onChange={(e) => updateCourse(course.id, 'credits', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                placeholder="3"
              />
            </div>
            <button
              onClick={() => removeCourse(course.id)}
              className="px-3 py-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition text-lg font-bold"
              title="Remove course"
            >
              &times;
            </button>
          </div>
        ))}

        <button
          onClick={addCourse}
          className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-[#2563eb] hover:text-[#2563eb] transition font-medium"
        >
          + Add Course
        </button>

        <div className="flex gap-3 pt-2">
          <button
            onClick={calculate}
            className="flex-1 bg-[#2563eb] text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Calculate GPA
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
              <p className="text-sm text-gray-500">Your GPA</p>
              <p className={`text-3xl font-bold ${getGpaColor(result.gpa)}`}>
                {result.gpa.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Letter Grade</p>
              <p className="text-2xl font-bold text-gray-900">
                {getLetterGrade(result.gpa)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Credits</p>
              <p className="text-2xl font-bold text-gray-900">
                {result.totalCredits}
              </p>
            </div>
          </div>
        </div>
      )}
<section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          What Is a GPA Calculator?
        </h2>
        <p className="text-gray-600 mb-3">
          A GPA calculator determines your grade point average by weighting each course&apos;s letter grade by its credit hours. Unlike a simple average of your grades, it accounts for the fact that a 4-credit course has more impact on your overall GPA than a 1-credit elective.
        </p>
        <p className="text-gray-600 mb-3">
          Most American colleges use the 4.0 scale, where an A equals 4.0 points and an F equals 0.0. The plus/minus system adds granularity &mdash; an A- is 3.7, a B+ is 3.3, and so on. This calculator supports all standard letter grades so you get an accurate result.
        </p>
        <p className="text-gray-600">
          Whether you&apos;re checking your semester GPA, planning which grades you need to reach a target, or preparing a graduate school application, this tool gives you an instant answer. Just enter your courses, select the grades, and specify the credit hours for each.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Frequently Asked Questions
        </h2>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          How is GPA calculated?
        </h3>
        <p className="text-gray-600 mb-4">
          GPA is calculated by multiplying each course&apos;s grade points by its credit hours, summing those products, then dividing by total credit hours. For example, an A (4.0) in a 3-credit course and a B (3.0) in a 4-credit course gives (4.0 &times; 3 + 3.0 &times; 4) / 7 = 3.43 GPA.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What is a good GPA?
        </h3>
        <p className="text-gray-600 mb-4">
          A GPA of 3.0 or above (B average) is generally considered good. A 3.5 or higher is considered excellent and competitive for graduate school admissions. Many universities place students on the Dean&apos;s List at 3.5 or 3.7 and above.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What is the difference between weighted and unweighted GPA?
        </h3>
        <p className="text-gray-600 mb-4">
          An unweighted GPA treats all courses equally on a 4.0 scale. A weighted GPA gives extra points for honors, AP, or IB courses, often using a 5.0 scale. This calculator uses the standard credit-hour-weighted method on a 4.0 scale, which is the system used by most colleges.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          Do plus and minus grades affect GPA?
        </h3>
        <p className="text-gray-600 mb-4">
          Yes, at most colleges. An A- is worth 3.7 instead of 4.0, while a B+ is 3.3 instead of 3.0. Over a full course load, these differences compound and can shift your GPA by several tenths of a point.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          Can I raise my GPA significantly in one semester?
        </h3>
        <p className="text-gray-600">
          It depends on how many credits you&apos;ve already completed. Early in college, one strong semester can move your GPA substantially. By senior year, the cumulative average is anchored by many credit hours, so it takes consistent effort over multiple semesters to see meaningful improvement.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Example Calculation
        </h2>
        <p className="text-gray-600 mb-3">
          A student takes five courses this semester. Here&apos;s their breakdown:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mb-3">
          <li>English 101: A (4.0) &times; 3 credits = 12.0 quality points</li>
          <li>Calculus I: B+ (3.3) &times; 4 credits = 13.2 quality points</li>
          <li>Biology: A- (3.7) &times; 4 credits = 14.8 quality points</li>
          <li>History: B (3.0) &times; 3 credits = 9.0 quality points</li>
          <li>Art Elective: A (4.0) &times; 2 credits = 8.0 quality points</li>
        </ul>
        <p className="text-gray-600 mb-3">
          Total quality points: 57.0. Total credits: 16. GPA: 57.0 / 16 = <strong>3.56</strong>.
        </p>
        <p className="text-gray-600">
          This student earns a 3.56 GPA for the semester, which falls in the A- range and would likely qualify for the Dean&apos;s List at most universities.
        </p>
      </section>

      <section className="mt-8 pb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Related Tools
        </h2>
        <ul className="space-y-1">
          <li><Link href="/tools/percentage-calculator" className="text-[#2563eb] hover:underline">Percentage Calculator</Link></li>
          <li><Link href="/tools/average-calculator" className="text-[#2563eb] hover:underline">Average Calculator</Link></li>
          <li><Link href="/tools/fraction-calculator" className="text-[#2563eb] hover:underline">Fraction Calculator</Link></li>
          <li><Link href="/tools/standard-deviation-calculator" className="text-[#2563eb] hover:underline">Standard Deviation Calculator</Link></li>
        </ul>
      </section>
    </main>
  );
}
