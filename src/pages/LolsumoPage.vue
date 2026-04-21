<!--
  LolsumoPage.vue – Case study: Lolsumo coaching app for League of Legends.
  Layout: sticky left nav (scroll spy) + white section cards on the dotted whiteboard.
-->

<script setup lang="ts">
import { ref } from 'vue'
import CaseStudyNav from '@/components/CaseStudyNav.vue'
import CaseStudySection from '@/components/CaseStudySection.vue'
import StickyNote from '@/components/StickyNote.vue'
import CardCallout from '@/components/CardCallout.vue'
import TagPill from '@/components/TagPill.vue'

const NAV_SECTIONS = [
  { id: 'overview',   label: 'Overview' },
  { id: 'context',    label: 'Context' },
  { id: 'problem',    label: 'The Problem' },
  { id: 'approach',   label: 'My Approach' },
  { id: 'research',   label: 'Research' },
  { id: 'community',  label: 'Community' },
  { id: 'casual',     label: 'Casual Players' },
  { id: 'advanced',   label: 'Advanced Players' },
  { id: 'pro',        label: 'PRO Features' },
  { id: 'revenue',    label: 'Revenue' },
  { id: 'results',    label: 'Results' },
]

const panelRef = ref<HTMLElement | null>(null)
</script>

<template>
  <section
    class="h-screen p-0 sm:p-6 lg:p-[40px] flex flex-col"
    aria-labelledby="project-heading"
  >
    <div
      ref="panelRef"
      class="h-full w-full overflow-y-auto sm:rounded-3xl sm:border sm:border-black/[0.06]"
      style="
        background-color: #f7f6f2;
        background-image: radial-gradient(circle, rgba(0,0,0,0.13) 1.2px, transparent 1.2px);
        background-size: 22px 22px;
      "
    >
      <div class="flex gap-8 justify-center pt-20 pb-14 sm:pt-10 sm:pb-14" style="padding-left: clamp(2rem, 4vw, 3.5rem); padding-right: clamp(2rem, 4vw, 3.5rem);">

        <!-- ── Left nav (desktop only) ── -->
        <CaseStudyNav :sections="NAV_SECTIONS" :panel="panelRef" />

        <!-- ── Main content ── -->
        <div class="w-full min-w-0 max-w-4xl space-y-24">

          <!-- ── Overview ── -->
          <CaseStudySection id="overview" label="Overview" first>

            <div class="space-y-4">
              <h1
                id="project-heading"
                class="font-heading text-3xl sm:text-4xl font-black leading-tight tracking-tight text-[var(--color-text-primary)] lg:text-6xl"
              >
                Lolsumo: a coaching app for League of Legends
              </h1>
              <div class="flex flex-wrap gap-2">
                <TagPill
                  v-for="tag in ['Community Engagement', 'Design System', 'User Testing']"
                  :key="tag"
                  :label="tag"
                />
              </div>
              <div class="flex flex-wrap gap-6 sm:gap-12 pt-2">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)] opacity-60">Timeline</p>
                  <p class="mt-1 text-[var(--color-text-secondary)]">2017 → 2019</p>
                </div>
                <div>
                  <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)] opacity-60">My role</p>
                  <p class="mt-1 text-[var(--color-text-secondary)]">Product Designer</p>
                </div>
                <div>
                  <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)] opacity-60">Collaborated with</p>
                  <p class="mt-1 text-[var(--color-text-secondary)]">Marketing, Engineers, Leadership</p>
                </div>
                <div>
                  <p class="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)] opacity-60">Company</p>
                  <p class="mt-1 text-[var(--color-text-secondary)]">Dojo Madness</p>
                </div>
              </div>
            </div>

            <hr class="border-black/[0.06]" />

            <div class="space-y-3">
              <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">TL;DR</h2>
              <p class="text-[var(--color-text-secondary)] leading-relaxed">
                Lolsumo was a real-time coaching app for League of Legends players with <strong>500,000+ MAU</strong> and millions of downloads. I designed features for both casual and advanced players, kept up with fast-changing game patches, and leveraged community-driven insights to refine the product. The app's success boosted engagement and helped Dojo Madness secure <strong>$6M in funding</strong>.
              </p>
            </div>

            <figure>
              <img src="/project-pages/lolsumo/lolsumo-1.png" alt="Lolsumo Android and iOS apps" class="w-full rounded-[19px] shadow-[inset_0_0_0_2px_#275243]" />
              <figcaption>Lolsumo Android &amp; iOS apps</figcaption>
            </figure>

          </CaseStudySection>

          <!-- ── Context ── -->
          <CaseStudySection id="context" label="Context">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">A coaching app built for the most complex game in the world</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              I joined Dojo Madness as a Product Designer in <strong>2017</strong> and was part of a cross-functional team of ~20 people, including designers, developers, PMs, QA analysts, and content creators. We focused on building and maintaining user-facing apps for casual gamers who played esports titles like League of Legends, Overwatch, Counter Strike, Fortnite, and Dota 2.
            </p>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              One of the main products I worked on was Lolsumo, an app designed to support League of Legends (LoL) players. LoL is a complex team-based strategy game, where 10 players face off in 30–40 minute matches. With <strong>over 140 champions</strong> to choose from, players must master tactics and make strategic decisions to win.
            </p>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              Lolsumo aimed to help players learn and improve through personalized stats, in-game tips, and overall performance scoring. With <strong>over 80 million players worldwide</strong>, the challenge was clear: players constantly seek easy ways to learn, but the game's complexity makes effective guidance difficult to deliver.
            </p>
            <CardCallout label="My role">
              I designed features for both casual and advanced players, working closely with engineers and content creators to keep pace with bi-weekly LoL patches and new champion releases.
            </CardCallout>
            <figure>
              <img src="/project-pages/lolsumo/lolsumo-2.png" alt="League of Legends game map" class="w-full rounded-[19px] shadow-[inset_0_0_0_2px_#275243]" />
              <figcaption>League of Legends game map</figcaption>
            </figure>
          </CaseStudySection>

          <!-- ── The Problem ── -->
          <CaseStudySection id="problem" label="The Problem">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">Serving multiple player types in a fast-moving game</h2>

            <p class="pt-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-text-primary)]">Business problem</p>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              Lolsumo needed to find a <strong>path to profitability</strong> while keeping operational costs under control. At the same time, the company had to keep pace with the fast-changing League of Legends ecosystem, where new game patches and champions were released <strong>bi-weekly</strong>.
            </p>

            <p class="pt-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-text-primary)]">User problem</p>
            <div class="flex gap-3 py-6">
              <StickyNote :rotate="-1" class="flex-1">
                <span class="text-sm font-bold rounded-md px-2 py-0.5" style="background: #d4a017;">Casual</span>
                Needed clear in-game guidance with item guides and builds in real-time.
              </StickyNote>
              <StickyNote :rotate="1" class="flex-1">
                <span class="text-sm font-bold rounded-md px-2 py-0.5" style="background: #d4a017;">Advanced</span>
                Needed to analyze post-game stats or alternate champion builds.
              </StickyNote>
              <StickyNote :rotate="-0.5" class="flex-1">
                <span class="text-sm font-bold rounded-md px-2 py-0.5" style="background: #d4a017;">Both</span>
                Wanted to win more games and master their preferred champions.
              </StickyNote>
            </div>

            <p class="pt-2 text-sm font-semibold uppercase tracking-widest text-[var(--color-text-primary)]">Project goals</p>
            <ul class="space-y-2 list-none text-[var(--color-text-secondary)] leading-relaxed">
              <li class="flex gap-2"><span class="text-[var(--color-brand-primary)] shrink-0">•</span><span>Deliver personalized performance stats for players at all skill levels.</span></li>
              <li class="flex gap-2"><span class="text-[var(--color-brand-primary)] shrink-0">•</span><span>Provide in-game tactical guidance to improve decision-making.</span></li>
              <li class="flex gap-2"><span class="text-[var(--color-brand-primary)] shrink-0">•</span><span>Offer post-game analysis to create a continuous learning loop.</span></li>
              <li class="flex gap-2"><span class="text-[var(--color-brand-primary)] shrink-0">•</span><span>Keep content up-to-date with bi-weekly LoL patches and new champion releases.</span></li>
              <li class="flex gap-2"><span class="text-[var(--color-brand-primary)] shrink-0">•</span><span>Engage the community to drive adoption, feedback, and retention.</span></li>
            </ul>
          </CaseStudySection>

          <!-- ── My Approach ── -->
          <CaseStudySection id="approach" label="My Approach">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">Designing in two tracks, validated by the community</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              Rather than designing one experience and hoping it worked for everyone, I split the design work into <strong>two parallel tracks</strong>: one focused on surfacing the right information at the right moment for casual players, and one building analytical depth for players who wanted to understand the game at a macro level.
            </p>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              Our primary validation loop was the <strong>Lolsumo Reddit community</strong>. Instead of running expensive research cycles, we posted targeted questions, shared early prototypes with engaged volunteers, and collected continuous feedback through surveys. This kept us grounded in real player needs rather than assumptions.
            </p>
            <CardCallout label="Approach in practice">
              I combined competitive analysis to identify gaps in the market, community-driven feedback to validate direction, and A/B testing to refine specific features. Every two weeks, a new game patch forced us to revisit content and interactions, which made fast iteration a permanent part of how the team worked.
            </CardCallout>
          </CaseStudySection>

          <!-- ── Research ── -->
          <CaseStudySection id="research" label="Research">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">Understanding the competitive landscape</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              The market was already crowded with apps and websites offering features similar to Lolsumo. I analyzed coaching, stats, and guide platforms to spot opportunities for differentiation, but some competitors managed to <strong>launch key features before us</strong>.
            </p>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              This raised the market pressure, and while we pushed hard to stay competitive, we had to make small compromises along the way to keep our place in the game.
            </p>
            <figure>
              <div class="rounded-[19px] overflow-hidden border-2 border-[#275243]"><img src="/project-pages/lolsumo/lolsumo-3.png" alt="Lolsumo competitors" class="w-full block" /></div>
              <figcaption>Lolsumo competitors</figcaption>
            </figure>
          </CaseStudySection>

          <!-- ── Community ── -->
          <CaseStudySection id="community" label="Community">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">Turning a passionate community into a design partner</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              Our community wasn't just passionate, they were our biggest asset in shaping and validating Lolsumo. With a <strong>4.5 out of 5 App Store rating</strong> and thousands of daily active users, we had a constant stream of input to work with.
            </p>
            <CardCallout
              label="How we engaged"
              :items="[
                { title: 'Bi-weekly check-ins', description: 'Led regular sessions with the Lolsumo Reddit community to gather feedback and surface new ideas.' },
                { title: 'Targeted questions', description: 'Posted to r/LOLSUMO to validate ideas on depth of statistics, multi-platform support, and patch cadence.' },
                { title: 'Prototype testing', description: 'Community volunteers tested prototypes and shared direct suggestions, accelerating our validation cycles.' },
              ]"
            />
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              Survey results showed clear preferences for navigation patterns, and player quotes highlighted requests for better tips, performance tracking, and strategic decision-making guidance. Together, these methods gave us <strong>continuous validation</strong> and ensured we were always building features that players truly valued.
            </p>
            <figure>
              <img src="/project-pages/lolsumo/lolsumo-4.png" alt="Active community on the r/LOLSUMO subreddit" class="w-full rounded-[19px] shadow-[inset_0_0_0_2px_#275243]" />
              <figcaption>Active community on the r/LOLSUMO subreddit</figcaption>
            </figure>
            <figure>
              <img src="/project-pages/lolsumo/lolsumo-5.png" alt="User testing result sample" class="w-full rounded-[19px] shadow-[inset_0_0_0_2px_#275243]" />
              <figcaption>User testing result sample</figcaption>
            </figure>
          </CaseStudySection>

          <!-- ── Casual Players ── -->
          <CaseStudySection id="casual" label="Casual Players">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">Helping casual players enjoy the game without feeling lost</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              For casual players, mastering League of Legends was overwhelming. With more than a hundred champions and hundreds of items to choose from, it could take years to learn the nuances of the game. Players who only played occasionally couldn't be expected to keep up, but they still wanted to enjoy matches without feeling lost.
            </p>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              Lolsumo focused on surfacing information <strong>at exactly the right moment</strong>:
            </p>
            <CardCallout
              label="Features for casual players"
              :items="[
                { title: 'Skill Performance Index', description: 'A quick rating to give players a clear sense of progress after each match.' },
                { title: 'Live In-Game Guide', description: 'Updated builds and item recommendations in real time, directly during a match.' },
                { title: 'Champion Runes', description: 'Optimized rune pages tailored to each specific matchup.' },
                { title: 'Match History', description: 'A quick way to review recent performance and spot patterns.' },
              ]"
            />
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              By surfacing this guidance in the moment it was needed, Lolsumo helped casual players focus on playing rather than memorizing item trees or complex strategies.
            </p>
            <figure>
              <img src="/project-pages/lolsumo/lolsumo-6.png" alt="In-game item build and match history" class="w-full rounded-[19px] shadow-[inset_0_0_0_2px_#275243]" />
              <figcaption>In-game item build and match history</figcaption>
            </figure>
          </CaseStudySection>

          <!-- ── Advanced Players ── -->
          <CaseStudySection id="advanced" label="Advanced Players">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">Giving advanced players the depth they needed to climb</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              More advanced players weren't satisfied with surface-level guidance. For them, the real challenge was understanding the <strong>macro layer of the game</strong>: things like gold efficiency, minion control, or timing builds correctly. Mastery required detailed insights that revealed not just what happened in a match, but why it mattered.
            </p>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              Lolsumo delivered this depth through a set of advanced tools:
            </p>
            <CardCallout
              label="Features for advanced players"
              :items="[
                { title: 'Post-Game Stats', description: 'Detailed breakdowns of gold earned, minions killed, and key performance metrics.' },
                { title: 'In-Depth Analysis', description: 'Highlighted the timing of item builds, flagging purchases made too early or too late.' },
                { title: 'Tier Lists', description: 'Patch-specific rankings of the strongest champions, updated with every release.' },
                { title: 'Skill Duel', description: 'A lane-vs-lane matchup predictor showing the likelihood of winning against a specific enemy champion.' },
              ]"
            />
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              By combining these tools, Lolsumo gave advanced players the ability to refine their strategy, adjust their builds, and stay on top of the <strong>ever-changing meta</strong>.
            </p>
            <figure>
              <img src="/project-pages/lolsumo/lolsumo-7.png" alt="In-depth match analysis and tier lists" class="w-full rounded-[19px] shadow-[inset_0_0_0_2px_#275243]" />
              <figcaption>In-depth match analysis and tier lists</figcaption>
            </figure>
          </CaseStudySection>

          <!-- ── PRO Features ── -->
          <CaseStudySection id="pro" label="PRO Features">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">A subscription model built around real player value</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              A core part of our monetization strategy was to place advanced features behind a <strong>Lolsumo Pro subscription</strong>. While the free version covered essentials, Pro unlocked deeper insights and removed ads.
            </p>
            <CardCallout
              label="Pro features"
              :items="[
                { title: 'Ad-free Experience', description: 'Allowed distraction-free gameplay without interruptions.' },
                { title: 'Lane Pressure Map', description: 'Showed lane opponents, their rank, match history, and preferred champions and builds in one place, instead of across three different websites.' },
                { title: 'Weekly Recap', description: 'Summarized performance trends over time, creating a continuous learning loop.' },
                { title: 'Detailed Match Analysis', description: 'Highlighted when items were bought too late or too early, plus comparisons against global averages.' },
              ]"
            />
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              For many players, these features were worth the upgrade, as no other platform combined <strong>real-time, in-game, and post-game data</strong> at this depth in one app.
            </p>
            <figure>
              <img src="/project-pages/lolsumo/lolsumo-8.png" alt="Lolsumo PRO features" class="w-full rounded-[19px] shadow-[inset_0_0_0_2px_#275243]" />
              <figcaption>Lolsumo PRO features</figcaption>
            </figure>
          </CaseStudySection>

          <!-- ── Revenue Experiments ── -->
          <CaseStudySection id="revenue" label="Revenue">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">Seasonal promotions that moved the needle</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              To grow revenue and stay competitive, we experimented with targeted seasonal promotions, timed around key engagement spikes.
            </p>
            <div class="flex gap-3 py-6">
              <StickyNote :rotate="-1" class="flex-1">
                <span class="text-sm font-bold rounded-md px-2 py-0.5" style="background: #d4a017;">Black Friday</span>
                Timed promotions around high-engagement retail moments and new season launches.
              </StickyNote>
              <StickyNote :rotate="1" class="flex-1">
                <span class="text-sm font-bold rounded-md px-2 py-0.5" style="background: #d4a017;">New LoL Season</span>
                Capitalized on seasonal player motivation to rank up and start fresh.
              </StickyNote>
              <StickyNote :rotate="-0.5" class="flex-1">
                <span class="text-sm font-bold rounded-md px-2 py-0.5" style="background: #d4a017;">+25% conversions</span>
                Higher conversions compared to non-promotion periods across all three campaigns.
              </StickyNote>
            </div>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              Reduced subscription costs to <strong>€30/year</strong> for short periods during Black Friday, Christmas, and new LoL season launches. Seasonal offers became a <strong>key driver of revenue</strong>, boosting both subscriptions and engagement.
            </p>
            <figure>
              <img src="/project-pages/lolsumo/lolsumo-9.png" alt="Lolsumo seasonal offers" class="w-full rounded-[19px] shadow-[inset_0_0_0_2px_#275243]" />
              <figcaption>Lolsumo seasonal offers</figcaption>
            </figure>
          </CaseStudySection>

          <!-- ── Results ── -->
          <CaseStudySection id="results" label="Results">
            <h2 class="font-heading text-2xl font-bold text-[var(--color-text-primary)]">One of the most popular LoL coaching apps on the market</h2>
            <p class="text-[var(--color-text-secondary)] leading-relaxed">
              Lolsumo became one of the most popular LoL coaching apps, supporting over <strong>500,000 MAU</strong> and achieving millions of downloads on iOS and Android. The app was widely recognized in gaming media, praised by outlets such as ComputerBild and The Emergence as a leading real-time coaching tool. Meanwhile, Dojo Madness secured <strong>$6 million in funding</strong> to expand its esports analytics products.
            </p>

            <div class="flex flex-col sm:flex-row gap-3">
              <CardCallout label="MAU" value="500K+" description="monthly active users" />
              <CardCallout label="Funding" value="$6M" description="secured by Dojo Madness" />
              <CardCallout label="Rating" value="4.5 / 5" description="App Store rating" />
            </div>

            <div class="flex flex-col sm:flex-row gap-3 items-start">
              <CardCallout
                label="What I learned"
                class="flex-1"
                :items="[
                  { title: 'Community is a design tool', description: 'Involving passionate users early surfaced insights we wouldn\'t have found in a lab. Reddit became one of our most reliable feedback channels.' },
                  { title: 'Freshness is a feature', description: 'Bi-weekly patches taught me that content currency mattered as much as the product itself. Stale data eroded trust faster than any bug.' },
                  { title: 'Designing as a player helped', description: 'Being active gamers ourselves compressed the feedback loop. We felt the problems firsthand, which made testing and iteration faster.' },
                ]"
              />
              <CardCallout
                label="What I'd do differently"
                class="flex-1"
                :items="[
                  { title: 'Move faster on competitive gaps', description: 'Competitors launched key features before us on a few occasions. I\'d push for a tighter link between competitive analysis and the roadmap from day one.' },
                  { title: 'Test monetization earlier', description: 'Many users had already formed habits around the free tier. An earlier experiment would have given us better data on willingness to pay.' },
                  { title: 'Invest in a component library sooner', description: 'Bi-weekly patches meant constant updates. A structured component system from the start would have cut time re-solving the same layout problems.' },
                ]"
              />
            </div>
          </CaseStudySection>

        </div><!-- /content -->

        <!-- Balances the left nav so content stays centered -->
        <div class="hidden lg:block w-52 shrink-0"></div>

      </div><!-- /sidebar + content -->
    </div><!-- /whiteboard panel -->
  </section>
</template>
