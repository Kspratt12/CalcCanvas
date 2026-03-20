'use client';

import { useState } from 'react';
import AdPlacement from '@/components/AdPlacement';
import Link from 'next/link';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Due Date Calculator',
  url: 'https://calcanvas.com/tools/due-date-calculator',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  description:
    'Calculate your estimated pregnancy due date from your last menstrual period or conception date. See current week, trimester, and timeline.',
};

type CalcMethod = 'lmp' | 'conception';

interface Results {
  dueDate: Date;
  currentWeek: number;
  currentDay: number;
  trimester: number;
  daysRemaining: number;
  daysPregnant: number;
  percentComplete: number;
}

const trimesterLabels: Record<number, string> = {
  1: 'First Trimester (Weeks 1-12)',
  2: 'Second Trimester (Weeks 13-26)',
  3: 'Third Trimester (Weeks 27-40)',
};

export default function DueDateCalculator() {
  const [method, setMethod] = useState<CalcMethod>('lmp');
  const [dateInput, setDateInput] = useState('');
  const [results, setResults] = useState<Results | null>(null);

  function calculate() {
    if (!dateInput) return;

    const inputDate = new Date(dateInput + 'T00:00:00');
    if (isNaN(inputDate.getTime())) return;

    let dueDate: Date;
    let pregnancyStart: Date;

    if (method === 'lmp') {
      dueDate = new Date(inputDate);
      dueDate.setDate(dueDate.getDate() + 280);
      pregnancyStart = new Date(inputDate);
    } else {
      dueDate = new Date(inputDate);
      dueDate.setDate(dueDate.getDate() + 266);
      pregnancyStart = new Date(inputDate);
      pregnancyStart.setDate(pregnancyStart.getDate() - 14);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const daysPregnant = Math.floor(
      (today.getTime() - pregnancyStart.getTime()) / (1000 * 60 * 60 * 24)
    );
    const currentWeek = Math.floor(daysPregnant / 7);
    const currentDay = daysPregnant % 7;
    const daysRemaining = Math.floor(
      (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    let trimester: number;
    if (currentWeek < 13) trimester = 1;
    else if (currentWeek < 27) trimester = 2;
    else trimester = 3;

    const percentComplete = Math.min(100, Math.max(0, (daysPregnant / 280) * 100));

    setResults({
      dueDate,
      currentWeek: Math.max(0, currentWeek),
      currentDay: Math.max(0, currentDay),
      trimester,
      daysRemaining,
      daysPregnant: Math.max(0, daysPregnant),
      percentComplete,
    });
  }

  function reset() {
    setMethod('lmp');
    setDateInput('');
    setResults(null);
  }

  function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  function getTrimesterMilestones(dueDate: Date): { label: string; date: Date; weeks: string }[] {
    const lmpDate = new Date(dueDate);
    lmpDate.setDate(lmpDate.getDate() - 280);

    const endFirst = new Date(lmpDate);
    endFirst.setDate(endFirst.getDate() + 12 * 7);

    const endSecond = new Date(lmpDate);
    endSecond.setDate(endSecond.getDate() + 26 * 7);

    return [
      { label: 'First Trimester Ends', date: endFirst, weeks: 'Week 12' },
      { label: 'Second Trimester Ends', date: endSecond, weeks: 'Week 26' },
      { label: 'Due Date', date: dueDate, weeks: 'Week 40' },
    ];
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
                "name": "How is a due date calculated?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A due date is calculated by adding 280 days (40 weeks) to the first day of your last menstrual period (LMP), or 266 days (38 weeks) from the date of conception. Both methods typically produce the same estimated due date."
                }
              },
              {
                "@type": "Question",
                "name": "How accurate is a due date calculator?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Due date calculators provide an estimate. Only about 5% of babies are born on their exact due date. Most babies are born within two weeks before or after the estimated date, between weeks 38 and 42."
                }
              },
              {
                "@type": "Question",
                "name": "What are the three trimesters of pregnancy?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The first trimester spans weeks 1-12, the second trimester covers weeks 13-26, and the third trimester runs from weeks 27 through delivery (typically around week 40). Each trimester brings different developmental milestones."
                }
              },
              {
                "@type": "Question",
                "name": "Can my due date change?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. An early ultrasound (usually between weeks 8-12) may adjust the due date if the fetal measurements differ significantly from the LMP-based estimate. The ultrasound date is generally considered more accurate."
                }
              },
              {
                "@type": "Question",
                "name": "What is the difference between gestational age and fetal age?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Gestational age is counted from the first day of the last menstrual period (about 2 weeks before conception). Fetal age is counted from the actual date of conception. Gestational age is the standard used in obstetrics."
                }
              }
            ]
          })
        }}
      />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Due Date Calculator</h1>
      <p className="text-gray-600 mb-6">
        Estimate your pregnancy due date, current week, and trimester from your last menstrual period or conception date.
      </p>

      <AdPlacement format="leaderboard" />

      <div className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calculate based on
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setMethod('lmp')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium border transition ${
                method === 'lmp'
                  ? 'bg-[#2563eb] text-white border-[#2563eb]'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Last Menstrual Period
            </button>
            <button
              onClick={() => setMethod('conception')}
              className={`flex-1 py-2 rounded-lg text-sm font-medium border transition ${
                method === 'conception'
                  ? 'bg-[#2563eb] text-white border-[#2563eb]'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Conception Date
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {method === 'lmp'
              ? 'First Day of Last Menstrual Period'
              : 'Estimated Conception Date'}
          </label>
          <input
            type="date"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={calculate}
            className="flex-1 bg-[#2563eb] text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Calculate Due Date
          </button>
          <button
            onClick={reset}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition"
          >
            Reset
          </button>
        </div>
      </div>

      {results && (
        <>
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Estimated Due Date</h2>
            <p className="text-2xl font-bold text-[#2563eb] text-center mb-4">
              {formatDate(results.dueDate)}
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-500">Current Week</p>
                <p className="text-xl font-bold text-gray-900">
                  Week {results.currentWeek}{results.currentDay > 0 ? ` + ${results.currentDay}d` : ''}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Trimester</p>
                <p className="text-xl font-bold text-gray-900">
                  {results.trimester === 1 ? '1st' : results.trimester === 2 ? '2nd' : '3rd'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Days Remaining</p>
                <p className="text-xl font-bold text-gray-900">
                  {results.daysRemaining > 0 ? results.daysRemaining : 'Past due'}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>{results.daysPregnant} days pregnant</span>
                <span>{results.percentComplete.toFixed(0)}% complete</span>
              </div>
              <div className="w-full bg-blue-100 rounded-full h-3">
                <div
                  className="bg-[#2563eb] h-3 rounded-full transition-all"
                  style={{ width: `${results.percentComplete}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Trimester Timeline</h2>
            <div className="space-y-4">
              {getTrimesterMilestones(results.dueDate).map((milestone, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                    i === 0 && results.trimester > 1 ? 'bg-green-500' :
                    i === 1 && results.trimester > 2 ? 'bg-green-500' :
                    i === 2 && results.daysRemaining <= 0 ? 'bg-green-500' :
                    'bg-gray-300'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{milestone.label}</p>
                    <p className="text-sm text-gray-500">{milestone.weeks} &mdash; {formatDate(milestone.date)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="mt-8">
        <AdPlacement format="rectangle" />
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          What Is a Due Date Calculator?
        </h2>
        <p className="text-gray-600 mb-3">
          A due date calculator estimates when your baby is expected to arrive based on either the first day of your last menstrual period (LMP) or the date of conception. This is the same method doctors and midwives use during early prenatal visits to establish your estimated due date, also called the EDD.
        </p>
        <p className="text-gray-600 mb-3">
          The standard calculation adds 280 days (40 weeks) to the LMP date, which is known as Naegele&apos;s rule. If you know your conception date, the calculator adds 266 days (38 weeks) instead, since conception typically occurs about two weeks after the start of your period.
        </p>
        <p className="text-gray-600">
          Keep in mind that only about 5% of babies arrive on their exact due date. Most births occur within a two-week window around the EDD, anywhere from 38 to 42 weeks. This calculator also shows your current week of pregnancy, which trimester you&apos;re in, and a progress timeline so you can track major milestones.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Frequently Asked Questions
        </h2>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          How is a due date calculated?
        </h3>
        <p className="text-gray-600 mb-4">
          A due date is calculated by adding 280 days (40 weeks) to the first day of your last menstrual period, or 266 days (38 weeks) from the date of conception. Both methods typically give the same estimated due date because conception generally occurs about 14 days after the start of the last period.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          How accurate is a due date calculator?
        </h3>
        <p className="text-gray-600 mb-4">
          Due date calculators provide a good estimate, but they&apos;re not exact. Only about 5% of babies are born on their due date. Most arrive within two weeks before or after, between weeks 38 and 42. An early ultrasound (weeks 8-12) can refine the estimate further.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What are the three trimesters of pregnancy?
        </h3>
        <p className="text-gray-600 mb-4">
          The first trimester covers weeks 1 through 12 and involves rapid early development. The second trimester spans weeks 13 through 26, when many parents learn the baby&apos;s sex and feel the first kicks. The third trimester runs from week 27 until delivery, a period of significant growth and preparation.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          Can my due date change?
        </h3>
        <p className="text-gray-600 mb-4">
          Yes. An early ultrasound may adjust your due date if the baby&apos;s measurements differ from the LMP-based estimate by more than a week. The ultrasound-based date is generally considered more accurate, especially if your menstrual cycle is irregular.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What is the difference between gestational age and fetal age?
        </h3>
        <p className="text-gray-600">
          Gestational age is counted from the first day of the last menstrual period, which is about two weeks before conception actually occurs. Fetal age counts from the actual conception date. Doctors use gestational age as the standard, so when they say you&apos;re &quot;8 weeks pregnant,&quot; the embryo is actually about 6 weeks old.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Example Calculation
        </h2>
        <p className="text-gray-600 mb-3">
          A woman&apos;s last menstrual period started on January 15, 2025. Using Naegele&apos;s rule:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mb-3">
          <li>LMP: January 15, 2025</li>
          <li>Add 280 days (40 weeks)</li>
          <li>Estimated due date: October 22, 2025</li>
          <li>Estimated conception: around January 29, 2025 (day 14 of cycle)</li>
        </ul>
        <p className="text-gray-600 mb-3">
          If she checks on April 15, 2025, she would be 13 weeks pregnant (into the second trimester) with about 190 days remaining until her due date.
        </p>
        <p className="text-gray-600">
          This same result can be reached by entering the conception date of January 29 and adding 266 days, which also lands on October 22, 2025.
        </p>
      </section>

      <section className="mt-8 pb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Related Tools
        </h2>
        <ul className="space-y-1">
          <li><Link href="/tools/age-calculator" className="text-[#2563eb] hover:underline">Age Calculator</Link></li>
          <li><Link href="/tools/date-calculator" className="text-[#2563eb] hover:underline">Date Calculator</Link></li>
          <li><Link href="/tools/countdown-timer" className="text-[#2563eb] hover:underline">Countdown Timer</Link></li>
          <li><Link href="/tools/bmi-calculator" className="text-[#2563eb] hover:underline">BMI Calculator</Link></li>
        </ul>
      </section>
    </main>
  );
}
