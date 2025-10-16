'use client';

import React from 'react';

export default function ExperienceCodeBlock() {
  const codeLines = [
    {
      number: 1,
      content: (
        <>
          <span className="text-purple-400">function</span>{' '}
          <span className="text-blue-400">experience</span>() {'{'}
        </>
      ),
    },
    {
      number: 2,
      content: (
        <>
          {'  '}
          <span className="text-purple-400">const</span>{' '}
          <span className="text-blue-300">degree</span> ={' '}
          <span className="text-rose-400">&quot;Informatics @ UW&quot;</span>;
        </>
      ),
    },
    {
      number: 3,
      content: (
        <>
          {'  '}
          <span className="text-purple-400">let</span>{' '}
          <span className="text-blue-300">skills</span> = [
          <span className="text-rose-400">&quot;React&quot;</span>,{' '}
          <span className="text-rose-400">&quot;AWS&quot;</span>,{' '}
          <span className="text-rose-400">&quot;Go&quot;</span>];
        </>
      ),
    },
    {
      number: 4,
      content: (
        <>
          {'  '}
          <span className="text-green-500 italic">
            {"// Bridged design & engineering"}
          </span>
        </>
      ),
    },
    {
      number: 5,
      content: (
        <>
          {'  '}
          <span className="text-purple-400">for</span> (
          <span className="text-purple-400">const</span>{' '}
          <span className="text-blue-300">project</span>{' '}
          <span className="text-purple-400">of</span>{' '}
          <span className="text-blue-300">portfolio</span>) {'{'}
        </>
      ),
    },
    {
      number: 6,
      content: <>    build(project);</>,
    },
    {
      number: 7,
      content: <>  {'}'}</>,
    },
    {
      number: 8,
      content: (
        <>
          {'  '}
          apply(<span className="text-rose-400">&quot;Frontend SWE Roles&quot;</span>);
        </>
      ),
    },
    {
      number: 9,
      content: (
        <>
          {'  '}
          <span className="text-purple-400">return</span>{' '}
          <span className="text-rose-400">
            &quot;Let&apos;s build something great together!&quot;
          </span>;
        </>
      ),
    },
    {
      number: 10,
      content: <>&rbrace;</>,
    },
  ];

  return (
    <div className="bg-[#1e1e1e] text-[#d4d4d4] font-mono rounded-md overflow-x-auto p-4">
      {codeLines.map(({ number, content }) => (
        <div key={number} className="flex">
          <div className="w-8 text-right pr-4 select-none text-gray-600">
            {number}
          </div>
          <div>{content}</div>
        </div>
      ))}
    </div>
  );
}
