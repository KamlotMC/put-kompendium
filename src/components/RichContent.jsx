import React from 'react';
import katex from 'katex';
import {
  Info,
  AlertTriangle,
  GraduationCap,
  Terminal,
  Lightbulb,
  ZoomIn,
  BookOpen,
  Compass,
  PenTool,
  Calculator,
} from 'lucide-react';
import { InteractiveDiagram } from './InteractiveDiagrams.jsx';

/**
 * Renders inline formatted text supporting:
 *   $$display math$$, $inline math$, **bold**, *italic*, `code`, and newlines.
 */
export function FormattedText({ text, className = '' }) {
  if (!text) return null;

  const lines = String(text).split('\n');
  return (
    <span className={className}>
      {lines.map((line, lineIdx) => (
        <React.Fragment key={lineIdx}>
          {renderInlineTokens(line, `l${lineIdx}`)}
          {lineIdx < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </span>
  );
}

function renderMath(expr, displayMode, key) {
  try {
    const html = katex.renderToString(expr.trim(), {
      displayMode,
      throwOnError: false,
      strict: false,
    });
    return displayMode ? (
      <span
        key={key}
        className="block my-2.5 overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    ) : (
      <span key={key} dangerouslySetInnerHTML={{ __html: html }} />
    );
  } catch {
    return <code key={key} className="prose-code">{expr}</code>;
  }
}

function renderInlineTokens(text, prefix) {
  const regex = /(\$\$[^$]+\$\$|\$[^$\n]+\$|\*\*[^*]+\*\*|`[^`]+`|\*[^*\n]+\*)/g;
  const parts = [];
  let last = 0;
  let match;
  let i = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }
    const token = match[0];
    const key = `${prefix}-${i++}`;

    if (token.startsWith('$$') && token.endsWith('$$')) {
      parts.push(renderMath(token.slice(2, -2), true, key));
    } else if (token.startsWith('$') && token.endsWith('$')) {
      parts.push(renderMath(token.slice(1, -1), false, key));
    } else if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={key} className="font-semibold text-[var(--text)]">
          {renderInlineTokens(token.slice(2, -2), `${key}b`)}
        </strong>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        <code key={key} className="prose-code">
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      parts.push(
        <em key={key} className="italic">
          {renderInlineTokens(token.slice(1, -1), `${key}i`)}
        </em>
      );
    }
    last = match.index + token.length;
  }

  if (last < text.length) {
    parts.push(text.slice(last));
  }
  return parts;
}

const CALLOUT_STYLES = {
  definition: {
    icon: BookOpen,
    kicker: 'Definicja',
    border: 'var(--accent)',
    bg: 'var(--accent-soft)',
    labelColor: 'var(--accent-text)',
  },
  theorem: {
    icon: Compass,
    kicker: 'Twierdzenie / Fakt',
    border: 'var(--crimson)',
    bg: 'var(--crimson-soft)',
    labelColor: 'var(--crimson)',
  },
  proof: {
    icon: PenTool,
    kicker: 'Dowód i wyprowadzenie',
    border: 'var(--border-strong)',
    bg: 'var(--bg-subtle)',
    labelColor: 'var(--text)',
  },
  example: {
    icon: Calculator,
    kicker: 'Przykład krok po kroku',
    border: 'var(--success)',
    bg: 'var(--success-soft)',
    labelColor: 'var(--success)',
  },
  info: {
    icon: Info,
    kicker: 'Uwaga',
    border: 'var(--accent)',
    bg: 'var(--accent-soft)',
    labelColor: 'var(--accent-text)',
  },
  exam: {
    icon: GraduationCap,
    kicker: 'Na egzamin',
    border: 'var(--purple)',
    bg: 'var(--purple-soft)',
    labelColor: 'var(--purple)',
  },
  warning: {
    icon: AlertTriangle,
    kicker: 'Pułapka / Uwaga',
    border: 'var(--warning)',
    bg: 'var(--warning-soft)',
    labelColor: 'var(--warning)',
  },
  lab: {
    icon: Terminal,
    kicker: 'Laboratorium',
    border: 'var(--success)',
    bg: 'var(--success-soft)',
    labelColor: 'var(--success)',
  },
  tip: {
    icon: Lightbulb,
    kicker: 'Wskazówka',
    border: 'var(--accent)',
    bg: 'var(--bg-subtle)',
    labelColor: 'var(--accent-text)',
  },
};

function SlideFigure({ src, caption, source, onOpenImage }) {
  return (
    <figure className="m-0 flex flex-col">
      <button
        type="button"
        onClick={() => onOpenImage?.({ src, caption, source })}
        className="slide-frame group relative text-left cursor-zoom-in w-full"
      >
        <img
          src={src}
          alt={caption || 'Ilustracja z wykładu'}
          loading="lazy"
          className="w-full h-auto block"
        />
        <span className="absolute top-2.5 right-2.5 bg-zinc-900/80 text-white text-xs font-medium px-2.5 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          <ZoomIn className="w-3.5 h-3.5" /> Powiększ
        </span>
      </button>
      {(caption || source) && (
        <figcaption className="mt-2 px-0.5 text-xs text-[var(--text-muted)] leading-relaxed">
          {caption && <span className="text-[var(--text-secondary)]">{caption}</span>}
          {source && <span className="ml-1.5 opacity-75">({source})</span>}
        </figcaption>
      )}
    </figure>
  );
}

export function RichBlocks({ blocks = [], onOpenImage }) {
  return (
    <div className="space-y-4">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'p':
            return (
              <p key={idx} className="text-[0.95rem] leading-[1.78] text-[var(--text-secondary)] m-0">
                <FormattedText text={block.text} />
              </p>
            );

          case 'list': {
            const Tag = block.ordered ? 'ol' : 'ul';
            return (
              <Tag
                key={idx}
                className={`space-y-2 pl-5 m-0 text-[0.93rem] leading-[1.72] text-[var(--text-secondary)] ${
                  block.ordered ? 'list-decimal' : 'list-disc'
                }`}
              >
                {block.items.map((item, i) => (
                  <li key={i} className="pl-1">
                    {typeof item === 'string' ? (
                      <FormattedText text={item} />
                    ) : (
                      <>
                        {item.title && (
                          <strong className="font-semibold text-[var(--text)]">
                            <FormattedText text={item.title} />
                            {item.text ? ': ' : ''}
                          </strong>
                        )}
                        {item.text && <FormattedText text={item.text} />}
                      </>
                    )}
                  </li>
                ))}
              </Tag>
            );
          }

          case 'callout': {
            const st = CALLOUT_STYLES[block.variant] || CALLOUT_STYLES.info;
            const Icon = st.icon;
            return (
              <div
                key={idx}
                className="rounded-md px-4 py-3.5 border"
                style={{
                  background: st.bg,
                  borderColor: 'var(--border)',
                  borderLeftWidth: '3px',
                  borderLeftColor: st.border,
                }}
              >
                <div className="flex items-start gap-2 mb-1.5">
                  <Icon className="w-4 h-4 shrink-0 mt-0.5" style={{ color: st.labelColor }} />
                  <div className="min-w-0">
                    <span
                      className="text-[10px] font-mono uppercase tracking-wider block leading-tight opacity-80"
                      style={{ color: st.labelColor }}
                    >
                      {st.kicker}
                    </span>
                    <div className="font-serif-heading font-semibold text-[0.98rem] leading-snug text-[var(--text)]">
                      <FormattedText text={block.title} />
                    </div>
                  </div>
                </div>
                <div className="text-[0.9rem] leading-[1.75] text-[var(--text-secondary)] pl-6">
                  <FormattedText text={block.text} />
                </div>
              </div>
            );
          }

          case 'table':
            return (
              <div key={idx} className="card overflow-hidden my-3">
                {block.caption && (
                  <div className="px-4 py-2 text-xs font-mono text-[var(--text-muted)] bg-[var(--bg-subtle)] border-b border-[var(--border)]">
                    <FormattedText text={block.caption} />
                  </div>
                )}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-[var(--border-strong)] bg-[var(--bg-subtle)]/50 text-left">
                        {block.headers.map((h, hi) => (
                          <th key={hi} className="py-2.5 px-3.5 font-semibold text-xs text-[var(--text)]">
                            <FormattedText text={h} />
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, ri) => (
                        <tr
                          key={ri}
                          className="border-b last:border-b-0 border-[var(--border)] hover:bg-[var(--bg-subtle)]/35 transition-colors"
                        >
                          {row.map((cell, ci) => (
                            <td key={ci} className="py-2.5 px-3.5 align-top leading-relaxed text-[var(--text-secondary)]">
                              <FormattedText text={cell} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );

          case 'figure':
            return (
              <div key={idx} className="my-4 max-w-2xl mx-auto">
                <SlideFigure
                  src={block.src}
                  caption={block.caption}
                  source={block.source}
                  onOpenImage={onOpenImage}
                />
              </div>
            );

          case 'figure_grid':
            return (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                {block.items.map((item, fi) => (
                  <SlideFigure
                    key={fi}
                    src={item.src}
                    caption={item.caption}
                    source={item.source}
                    onOpenImage={onOpenImage}
                  />
                ))}
              </div>
            );

          case 'svg':
            return (
              <InteractiveDiagram
                key={idx}
                diagramId={block.diagramId}
                title={block.title}
                caption={block.caption}
              />
            );

          case 'formula':
            return (
              <div key={idx} className="rounded-md bg-[var(--bg-subtle)] border border-[var(--border)] px-4 py-3 text-center overflow-x-auto">
                {renderMath(block.latex, true, `fm-${idx}`)}
                {block.label && (
                  <div className="text-xs text-[var(--text-muted)] mt-1">
                    <FormattedText text={block.label} />
                  </div>
                )}
              </div>
            );

          case 'code':
            return (
              <div key={idx} className="card overflow-hidden my-3">
                {block.caption && (
                  <div className="px-3.5 py-2 text-xs font-mono text-[var(--text-muted)] bg-[var(--bg-subtle)] border-b border-[var(--border)]">
                    {block.caption}
                  </div>
                )}
                <pre className="m-0 p-4 overflow-x-auto text-xs sm:text-sm font-mono bg-zinc-950 text-zinc-100 leading-relaxed">
                  <code>{block.code}</code>
                </pre>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
