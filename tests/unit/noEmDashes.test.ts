/**
 * Scans all source files for em dashes (\u2014).
 * Fails with the offending file paths and line numbers if any are found.
 */

import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync, statSync } from 'fs'
import { join } from 'path'

// User-facing copy lives in page/component templates and the TimeaAgent knowledge data.
// Code comments are excluded by skipping lines that start with comment markers.
const USER_FACING_FILES = [
  'src/pages',
  'src/components',
  'src/data/timeaAgentKnowledge.ts',
]

function collectViolations(file: string): string[] {
  const violations: string[] = []
  let inBlockComment = false
  const lines = readFileSync(file, 'utf-8').split('\n')
  lines.forEach((line, i) => {
    const t = line.trim()
    if (inBlockComment) {
      if (t.includes('-->') || t.includes('*/')) inBlockComment = false
      return
    }
    if (t.startsWith('<!--') || t.startsWith('/*')) {
      if (!t.includes('-->') && !t.endsWith('*/')) inBlockComment = true
      return
    }
    if (t.startsWith('//') || t.startsWith('*')) return
    if (line.includes('\u2014')) violations.push(`${file}:${i + 1}: ${t}`)
  })
  return violations
}

function collectFiles(dir: string): string[] {
  const results: string[] = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const stat = statSync(full)
    if (stat.isDirectory()) {
      results.push(...collectFiles(full))
    } else if (full.endsWith('.vue') || full.endsWith('.ts')) {
      results.push(full)
    }
  }
  return results
}

describe('user-facing copy', () => {
  it('contains no em dashes', () => {
    const root = join(__dirname, '../..')
    const violations: string[] = []

    for (const target of USER_FACING_FILES) {
      const full = join(root, target)
      const files = statSync(full).isDirectory() ? collectFiles(full) : [full]
      for (const file of files) {
        violations.push(...collectViolations(file))
      }
    }

    expect(violations, `Em dashes found:\n${violations.join('\n')}`).toHaveLength(0)
  })
})
