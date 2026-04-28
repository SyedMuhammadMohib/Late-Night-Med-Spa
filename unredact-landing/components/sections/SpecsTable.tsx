'use client';

import FadeInWhenVisible from '@/components/ui/FadeInWhenVisible';

const SPECS = [
  { label: 'Language', value: 'Python 3.x' },
  { label: 'Core Dependency', value: 'pymupdf==1.23.26' },
  { label: 'Input Formats', value: 'PDF (any version)' },
  { label: 'Processing Mode', value: 'Single file / Batch directory' },
  { label: 'Redaction Detection', value: 'Brightness-threshold image analysis' },
  { label: 'Text Recovery Method', value: 'Digital text re-colorization' },
  { label: 'Output Format', value: 'New PDF (non-destructive)' },
  { label: 'Highlight Color', value: '#F43F5E (optional, --hl flag)' },
  { label: 'License', value: 'MIT Open Source' },
  { label: 'Platform', value: 'Windows · macOS · Linux' },
];

export default function SpecsTable() {
  return (
    <section id="specs" className="relative py-32 px-6" style={{ background: 'var(--surface)' }}>
      <div className="max-w-[800px] mx-auto">
        <FadeInWhenVisible>
          <div className="text-center mb-14 space-y-4">
            <div className="label-tag">Technical Specifications</div>
            <h2 className="text-4xl font-bold tracking-tight" style={{ color: 'var(--white)' }}>
              Under the hood.
            </h2>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.1}>
          <div className="glass-card p-8 md:p-10">
            <table className="specs-table">
              <tbody>
                {SPECS.map((spec, i) => (
                  <tr key={spec.label}>
                    <td style={{ color: 'var(--white-dim)', fontSize: '13px', paddingRight: '24px' }}>
                      {spec.label}
                    </td>
                    <td
                      className="font-mono"
                      style={{ color: 'rgba(241,240,255,0.9)', fontSize: '13px' }}
                    >
                      {spec.label === 'Highlight Color' ? (
                        <span className="flex items-center gap-3">
                          <span
                            className="inline-block w-3 h-3 rounded-full"
                            style={{ background: '#F43F5E' }}
                          />
                          {spec.value}
                        </span>
                      ) : (
                        spec.value
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
