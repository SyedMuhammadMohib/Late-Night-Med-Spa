'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeInWhenVisible from '@/components/ui/FadeInWhenVisible';

type InputMode = 'file' | 'directory';

function Toggle({
  value,
  options,
  onChange,
}: {
  value: string;
  options: { label: string; value: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div
      className="flex items-center rounded-lg p-0.5 gap-0.5"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className="relative px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors duration-150"
          style={{
            color: value === opt.value ? 'var(--white)' : 'var(--white-dim)',
            background: value === opt.value ? 'rgba(99,102,241,0.25)' : 'transparent',
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default function TerminalPlayground() {
  const [inputMode, setInputMode] = useState<InputMode>('file');
  const [highlight, setHighlight] = useState(true);
  const [removeBoxes, setRemoveBoxes] = useState(true);

  const inputFlag = inputMode === 'file' ? './input.pdf' : './documents/';
  const hlFlag = highlight ? ' --hl 1' : '';
  const bboxFlag = removeBoxes ? ' --bbox 1' : '';

  const command = `python src/unredact.py -i ${inputFlag} -o ./output${hlFlag}${bboxFlag}`;

  const fakeCount = inputMode === 'directory' ? '23' : '1';
  const fakeBoxes = inputMode === 'directory' ? '187' : '14';
  const fakeChars = inputMode === 'directory' ? '12,441' : '847';

  return (
    <section className="py-32 px-6" style={{ background: 'var(--black)' }}>
      <div className="max-w-[900px] mx-auto">
        <FadeInWhenVisible>
          <div className="text-center mb-14 space-y-4">
            <div className="label-tag">Interactive Demo</div>
            <h2 className="text-4xl font-bold tracking-tight" style={{ color: 'var(--white)' }}>
              Build your command.
            </h2>
            <p style={{ color: 'var(--white-muted)', fontSize: '16px' }}>
              Toggle options below and watch the command update in real time.
            </p>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.1}>
          {/* Controls */}
          <div className="flex flex-wrap items-center gap-6 mb-6 justify-center">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium" style={{ color: 'var(--white-dim)' }}>Input mode</span>
              <Toggle
                value={inputMode}
                options={[
                  { label: 'Single File', value: 'file' },
                  { label: 'Directory', value: 'directory' },
                ]}
                onChange={(v) => setInputMode(v as InputMode)}
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium" style={{ color: 'var(--white-dim)' }}>Highlight</span>
              <Toggle
                value={highlight ? 'on' : 'off'}
                options={[{ label: 'On', value: 'on' }, { label: 'Off', value: 'off' }]}
                onChange={(v) => setHighlight(v === 'on')}
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium" style={{ color: 'var(--white-dim)' }}>Remove boxes</span>
              <Toggle
                value={removeBoxes ? 'on' : 'off'}
                options={[{ label: 'On', value: 'on' }, { label: 'Off', value: 'off' }]}
                onChange={(v) => setRemoveBoxes(v === 'on')}
              />
            </div>
          </div>

          {/* Terminal */}
          <div className="terminal-window overflow-x-auto">
            <div className="terminal-chrome">
              <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#FEBC2E' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#28C840' }} />
              <span className="ml-auto font-mono text-xs" style={{ color: 'rgba(241,240,255,0.3)' }}>
                unredact.py — interactive
              </span>
            </div>
            <div className="terminal-body">
              {/* Command line */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={command}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0.5 }}
                  transition={{ duration: 0.15 }}
                  style={{ color: 'rgba(241,240,255,0.95)' }}
                >
                  <span style={{ color: 'var(--cyan)' }}>$</span>{' '}
                  <span>{command}</span>
                </motion.div>
              </AnimatePresence>

              {/* Blank line */}
              <div className="h-3" />

              {/* Output */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${inputMode}-${highlight}-${removeBoxes}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  <div style={{ color: 'rgba(241,240,255,0.5)' }}>
                    [INFO] Scanning{inputMode === 'directory' ? ' directory: ./documents/ — ' + fakeCount + ' files found' : ': input.pdf'}
                  </div>
                  {removeBoxes && (
                    <div style={{ color: '#F43F5E' }}>
                      [DETECT] {fakeBoxes} redaction boxes identified (brightness &lt; 30)
                    </div>
                  )}
                  <div style={{ color: '#6366F1' }}>
                    [RECOVER] {fakeChars} characters recovered from black-on-black text
                  </div>
                  {highlight && (
                    <div style={{ color: '#818CF8' }}>
                      [HIGHLIGHT] Recovered text rendered in #F43F5E
                    </div>
                  )}
                  <div style={{ color: '#22D3EE' }}>
                    [WRITE] Output saved: ./output/{inputMode === 'directory' ? fakeCount + ' files' : 'input_unredacted.pdf'}
                  </div>
                  <div className="h-2" />
                  <div style={{ color: '#22D3EE' }}>
                    Process complete.{removeBoxes ? ` ${fakeBoxes} boxes removed.` : ''} {fakeChars} characters revealed.
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
