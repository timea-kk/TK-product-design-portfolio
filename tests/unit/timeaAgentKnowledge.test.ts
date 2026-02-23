/**
 * Unit tests for getAnswerForQuestion.
 * This is pure logic (no DOM, no Vue) so tests are fast and straightforward.
 */

import { describe, it, expect } from 'vitest'
import { getAnswerForQuestion, DEFAULT_ANSWER } from '@/data/timeaAgentKnowledge'

describe('getAnswerForQuestion', () => {
  it('returns the default answer for an empty string', () => {
    expect(getAnswerForQuestion('')).toBe(DEFAULT_ANSWER)
  })

  it('returns the default answer for a whitespace-only string', () => {
    expect(getAnswerForQuestion('   ')).toBe(DEFAULT_ANSWER)
  })

  it('returns the default answer for null (runtime guard)', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(getAnswerForQuestion(null as any)).toBe(DEFAULT_ANSWER)
  })

  it('returns the default answer when no keyword matches', () => {
    expect(getAnswerForQuestion('asdfjkl qwerty zxcvbnm')).toBe(DEFAULT_ANSWER)
  })

  it('matches a greeting and returns an intro answer', () => {
    const answer = getAnswerForQuestion('hello')
    expect(answer).toContain('Timea')
    expect(answer).not.toBe(DEFAULT_ANSWER)
  })

  it('matches contact keywords and returns the contact answer', () => {
    const answer = getAnswerForQuestion('how do I contact you?')
    expect(answer).toContain('work@timea.cc')
  })

  it('is case-insensitive', () => {
    const lower = getAnswerForQuestion('berlin')
    const upper = getAnswerForQuestion('BERLIN')
    expect(lower).toBe(upper)
    expect(lower).not.toBe(DEFAULT_ANSWER)
  })

  it('returns the Ecosia answer for "ecosia"', () => {
    const answer = getAnswerForQuestion('tell me about ecosia')
    expect(answer).toContain('Ecosia')
    expect(answer).toContain('Senior Product Designer')
  })

  it('picks a higher-scoring entry when multiple entries could match', () => {
    // "flora design system" scores higher for the Flora/design-ops entry than for general skills
    const answer = getAnswerForQuestion('tell me about flora the design system')
    expect(answer).toContain('Flora')
  })

  it('returns the Flora answer for "design system"', () => {
    const answer = getAnswerForQuestion('what is the flora design system')
    expect(answer).toContain('Flora')
  })

  it('returns the location answer for "berlin"', () => {
    const answer = getAnswerForQuestion('where are you based, berlin?')
    expect(answer).toContain('Berlin')
    expect(answer).not.toBe(DEFAULT_ANSWER)
  })
})
