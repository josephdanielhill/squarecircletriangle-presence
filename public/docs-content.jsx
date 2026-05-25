/* eslint-disable */
// docs-content.jsx — page tree + content for SquareCircleTriangle docs

const G = {
  square: (
    <svg viewBox="0 0 16 16">
      <rect className="fill"   x="1.6" y="1.6" width="12.8" height="12.8" />
      <rect className="stroke" x="1.6" y="1.6" width="12.8" height="12.8" />
    </svg>
  ),
  circle: (
    <svg viewBox="0 0 16 16">
      <circle className="fill"   cx="8" cy="8" r="6.4" />
      <circle className="stroke" cx="8" cy="8" r="6.4" />
    </svg>
  ),
  triangle: (
    <svg viewBox="0 0 16 16">
      <polygon className="fill"   points="8,1.4 14.6,14.4 1.4,14.4" />
      <polygon className="stroke" points="8,1.4 14.6,14.4 1.4,14.4" />
    </svg>
  ),
};

const A = ({ href, children, page }) => (
  <a className="inline" href={href || ('#/' + (page || ''))}>{children}</a>
);

const ShapeDiagram = () => (
  <div className="shape-diagram">
    <div className="node">
      <div className="shape">{G.square}</div>
      <div className="lbl">Square</div>
      <div>Knowledge shared</div>
    </div>
    <div className="connector"></div>
    <div className="node">
      <div className="shape">{G.circle}</div>
      <div className="lbl">Circle</div>
      <div>Experiences connected</div>
    </div>
    <div className="connector"></div>
    <div className="node">
      <div className="shape">{G.triangle}</div>
      <div className="lbl">Triangle</div>
      <div>Technology reimagined</div>
    </div>
    <div className="center-cap">Fig 01 — The ecosystem</div>
  </div>
);

const PAGES = [
  {
    id: 'welcome',
    section: 'Home',
    title: 'Welcome',
    eyebrow: 'Introduction',
    lede: 'Every person has the power to change the world. We believe in unleashing that power through knowledge shared, experiences connected, and technology reimagined.',
    ledeQuote: true,
    updated: '',
    body: () => (
      <>
        <p>
          <strong>SquareCircleTriangle</strong> is a studio in three shapes — three disciplines
          that feed each other in a continuous loop. We
          {' '}<A page="square">teach what we know</A>,
          {' '}<A page="circle">convene the people who care</A>, and
          {' '}<A page="triangle">build the tools they need next</A>.
        </p>
        <ShapeDiagram />
        <p>
          The shapes are not metaphors — they are the operating model. Square generates
          the intellectual capital; Circle surfaces the people and contexts that need it;
          Triangle turns both into durable, scalable technology. Each feeds the next in a
          loop that compounds over time.
        </p>
        <div className="callout tip">
          <span className="ico">→</span>
          <span>
            <strong>Where to start.</strong> If you're new here, read about the{' '}
            <A page="square">Square</A>, <A page="circle">Circle</A>, and{' '}
            <A page="triangle">Triangle</A> sections in order — the narrative builds.
          </span>
        </div>
      </>
    ),
  },
  {
    id: 'square',
    section: 'Square',
    icon: 'square',
    sectionTop: true,
    title: 'Square',
    eyebrow: 'Section overview',
    lede: 'Education & Consulting.',
    updated: '',
    body: () => (
      <>
        <p>
          Square is for <strong>Education &amp; Consulting</strong>. Providing high quality
          material and engaging education extracts which level up people. Combining education
          towards a more corporate environment and you have consulting, based on the experiences
          and knowledge of the complete eco-system.
        </p>
        <p>
          The Square discipline exists because knowledge transfer is the foundation of everything
          else. Without well-articulated, shareable knowledge, communities stay fragmented and
          technology stays inaccessible. Square creates the conditions for both to flourish.
        </p>
      </>
    ),
  },
  {
    id: 'circle',
    section: 'Circle',
    icon: 'circle',
    sectionTop: true,
    title: 'Circle',
    eyebrow: 'Section overview',
    lede: 'Community.',
    updated: '',
    body: () => (
      <>
        <p>
          Circle is for <strong>community</strong>. Enabling and supporting people to come
          together around a common cause, providing services and support for forming and
          enriching communities. Whether it's connecting like-minded individuals, fostering
          collaboration, or building networks around shared values, we help create meaningful
          spaces where people can grow, contribute, and support one another.
        </p>
        <p>
          Community is the medium that transforms individual learning into collective
          capacity. A well-formed Circle doesn't just support its members — it generates
          the insights and relationships that feed back into Square and Triangle.
        </p>
      </>
    ),
  },
  {
    id: 'triangle',
    section: 'Triangle',
    icon: 'triangle',
    sectionTop: true,
    title: 'Triangle',
    eyebrow: 'Section overview',
    lede: 'Applications.',
    updated: '',
    body: () => (
      <>
        <p>
          Triangle is for <strong>Applications</strong>. Using the knowledge and community to
          build bespoke applications that transform sectors and build new ones. Our applications
          bridge education and community insights into practical, powerful tools.
        </p>
        <div className="card-grid">
          <a className="card" href="#/triangle-deckcrm">
            <div className="card-icon">
              <svg viewBox="0 0 16 16">
                <polygon className="fill" points="8,1.4 14.6,14.4 1.4,14.4" />
                <polygon className="stroke" points="8,1.4 14.6,14.4 1.4,14.4" />
              </svg>
            </div>
            <h4>DeckCRM</h4>
            <p>Relationship management built around how people actually communicate.</p>
            <span className="arrow">Learn more →</span>
          </a>
          <a className="card" href="#/triangle-timecard">
            <div className="card-icon">
              <svg viewBox="0 0 16 16">
                <polygon className="fill" points="8,1.4 14.6,14.4 1.4,14.4" />
                <polygon className="stroke" points="8,1.4 14.6,14.4 1.4,14.4" />
              </svg>
            </div>
            <h4>Timecard</h4>
            <p>Time and project tracking for small teams that actually gets used.</p>
            <span className="arrow">Learn more →</span>
          </a>
        </div>
        <p>
          Triangle applications are not built in isolation. They emerge from the patterns
          and problems surfaced in Square programs and Circle communities. This means they
          solve real problems for people who are already engaged in the ecosystem.
        </p>
      </>
    ),
  },
  {
    id: 'triangle-deckcrm',
    section: 'Triangle',
    title: 'DeckCRM',
    eyebrow: 'Triangle · Application',
    lede: 'Relationship management built around how people actually communicate.',
    updated: 'May 2026 by JH',
    body: () => (
      <>
        <p>
          DeckCRM is a lightweight personal relationship manager designed for relationship-led work. It is built around the core insight that our most valuable connections live in informal exchanges, email threads, and meeting notes—not in rigid enterprise CRM records.
        </p>

        <div style={{ margin: '24px 0' }}>
          <a
            href="https://deckcrm.squarecircletriangle.co/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: 'var(--accent-bg)',
              border: '1px solid var(--accent)',
              color: 'var(--accent)',
              borderRadius: '8px',
              fontWeight: '500',
              fontSize: '14.5px',
              textDecoration: 'none',
              transition: 'background-color 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--hover)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--accent-bg)';
            }}
          >
            <span>Launch DeckCRM</span>
            <span style={{ fontSize: '12px' }}>↗</span>
          </a>
        </div>

        <div className="callout tip">
          <span className="ico">→</span>
          <span>
            <strong>Project Status:</strong> Active micro-app with ongoing refinements. Design v2 is now live with enhanced pinning mechanics and a dedicated Ghost Deck.
          </span>
        </div>

        <h2 id="objective">Objective &amp; Concept</h2>
        <p>
          DeckCRM was created as the first step in a larger career objective: <strong>releasing one micro-app/experience every month for 12 months</strong> (starting in January 2026). This objective serves as a personal laboratory to test and master the latest and greatest AI coding tools, exploring how far an independent builder can go with AI acceleration.
        </p>
        <p>
          The core gameplay loop of DeckCRM centers around:
        </p>
        <ul>
          <li><strong>Custom Decks:</strong> Users can build 1 to 3 decks of people (e.g., “Friends”, “Colleagues”). Each deck defines a specific time interval after which those contacts require nurturing.</li>
          <li><strong>Contact Cards &amp; XP:</strong> Every contact is represented as a card. Cards have an Experience Point (XP) score that increases when you engage and nurture the connection, and decreases over time as they become due. The XP cap has been expanded from 100 to 900 for long-term progression.</li>
        </ul>

        <h2 id="impulse">The Impulse</h2>
        <p>
          The motivation behind DeckCRM was to scratch a personal itch. Having worked across many organizations and locations throughout a long career, relationships inevitably became fragmented. Remembering to reach out to positive, impactful people regularly proved difficult, leading to lost contacts.
        </p>
        <p>
          Initially, a custom Notion system called <a className="inline" href="https://www.notion.com/templates/connex-simple-crm" target="_blank" rel="noopener noreferrer">Connex Simple CRM</a> was built to automate these reminders. It worked exceptionally well, letting the process be hands-off.
        </p>
        <p>
          Years later, aiming to migrate off Notion and close the account, the advent of <em>vibe coding</em> presented the perfect opportunity to rewrite the system as a custom, lightweight micro-app. This allowed the migration of personal data while gaining deep, hands-on experience with AI workflows.
        </p>

        <h2 id="tech-stack">Technology Stack</h2>
        <p>
          To maintain a productive, high-vibe pipeline, a modern serverless stack and AI-assisted workflow were chosen:
        </p>
        <div className="dl">
          <span className="term">Core Development</span>
          <span className="desc"><strong>Claude</strong> for AI Coding &amp; <strong>GitHub Copilot</strong> for efficient bug fixing and code optimization.</span>
          
          <span className="term">Hosting</span>
          <span className="desc"><strong>Cloudflare Pages &amp; Workers</strong> for lightning-fast edge deployments.</span>
          
          <span className="term">Database</span>
          <span className="desc"><strong>Neon Serverless Postgres</strong> (successfully migrated from Supabase in April 2026 for improved serverless performance).</span>
          
          <span className="term">Transactional Email</span>
          <span className="desc"><strong>Resend</strong> for reliable daily contact reminder dispatches.</span>
          
          <span className="term">Design &amp; Ops</span>
          <span className="desc"><strong>Figma</strong> for UI concepts, <strong>Miro</strong> for flow boards, <strong>Linear</strong> for tracking milestones, <strong>Tally</strong> for customer feedback, and <strong>Toggl</strong> for precise time tracking.</span>
        </div>

        <h2 id="mechanics">App Mechanics</h2>
        
        <h3 id="debug-menu">Secret Debug Menu</h3>
        <p>
          To facilitate testing and rapid verification of app state, a secret debug system was engineered directly into the search bar. By searching for the exact query <code>DEBUG_MENU_TRUE</code>, you unlock a hidden administrative panel that provides real-time account stats and advanced simulations:
        </p>
        <ul>
          <li><strong>Email Simulator:</strong> Triggers and previews the daily email notification for overdue contacts.</li>
          <li><strong>Instant Card Spawning:</strong> Generates either an immediately overdue card or a card in the "Contact Soon" queue to test UI layouts.</li>
          <li><strong>Coffee Modal Trigger:</strong> Instantly displays the appreciation overlay to verify responsiveness.</li>
        </ul>

        <h3 id="coffee-logic">Buy Me a Coffee Logic</h3>
        <p>
          To gently nudge users towards supporting the project without hindering their core workflow, a soft-paywall appreciation modal was added. It triggers dynamically based on the following usage milestones:
        </p>
        <div className="dl">
          <span className="term">Deck Milestone</span>
          <span className="desc">Immediately after a user creates their 3rd Deck.</span>
          
          <span className="term">Contact Milestone</span>
          <span className="desc">Immediately after a user adds their 5th Contact card.</span>
          
          <span className="term">Login Milestone</span>
          <span className="desc">Upon the user's 4th successful login to the application.</span>
          
          <span className="term">Time Milestone</span>
          <span className="desc">Once 30 days have elapsed since the account's initial creation date.</span>
        </div>

        <h2 id="changelog">Changelog &amp; Milestones</h2>
        <p>
          An active timeline of the design phases, engine migrations, and version deployments:
        </p>
        <div className="tbl">
          <table>
            <thead>
              <tr>
                <th style={{ width: '130px' }}>Date</th>
                <th>Changes &amp; Milestones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>03 May 2026</td>
                <td>
                  <strong>v2.0 Design Update</strong>
                  <ul>
                    <li>Complete aesthetic redesign to v2 styles.</li>
                    <li>Added Ghost Deck filters to easily identify contacts who are ghosting.</li>
                    <li>Implemented note pinning, allowing up to 3 vital notes to be pinned to a card's front.</li>
                    <li>Minor UX optimizations and responsiveness enhancements.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>27 Apr 2026</td>
                <td>
                  <strong>Database Migration</strong>
                  <ul>
                    <li>Migrated production database infrastructure from Supabase to Neon serverless Postgres for improved low-latency cold starts.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>20 Apr 2026</td>
                <td>
                  <strong>Infrastructure Refactor</strong>
                  <ul>
                    <li>Migrated off Base44 deployment pipeline.</li>
                    <li>Configured Cloudflare for core domain routing and assets hosting.</li>
                    <li>Integrated Resend for automated transactional email dispatch.</li>
                    <li>Built an import feature supporting raw CSV files to transfer user contact lists.</li>
                    <li>Created a new promotional landing page.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>06 Apr 2026</td>
                <td>
                  <strong>Global Insights</strong>
                  <ul>
                    <li>Added Global Stats visualization on the back of the Deck Details page.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>02 Feb 2026</td>
                <td>
                  <strong>Launch Preparation</strong>
                  <ul>
                    <li>Built the interactive ProductBoard and LaunchPad Peerlist pages.</li>
                    <li>Implemented major SEO and page speed optimizations on the main landing page.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>31 Jan 2026</td>
                <td>
                  <strong>Finalizing v1</strong>
                  <ul>
                    <li>Polished the public-facing landing page.</li>
                    <li>Published the narrative behind the impulse to build the application.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>28 Jan 2026</td>
                <td>
                  <strong>Recommendation Algorithms</strong>
                  <ul>
                    <li>Refactored "Contact Soon" suggestions to compute priorities from contact due dates rather than contact XP values.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>25 Jan 2026</td>
                <td>
                  <strong>Friction Removal</strong>
                  <ul>
                    <li>Removed the initial limit on maximum decks.</li>
                    <li>Adjusted Buy Me A Coffee triggers for balanced user experience.</li>
                    <li>Fully documented the secret Debug Menu and Coffee logic.</li>
                    <li>Fixed attention calculation bugs for overdue cards.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>21 Jan 2026</td>
                <td>
                  <strong>UX &amp; Insights</strong>
                  <ul>
                    <li>Resolved page blanking issues during card edits.</li>
                    <li>Fixed a swiping bug with onboarding tutorial cards.</li>
                    <li>Deployed first draft of Deck Details insights.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>16 Jan 2026</td>
                <td>
                  <strong>Friction Reductions</strong>
                  <ul>
                    <li>Streamlined note creation flows to allow adding notes directly to cards.</li>
                    <li>Fixed double toolbar layout bug on the contact creation page.</li>
                    <li>Removed redundant "Add New Deck" modals.</li>
                    <li>Introduced initial tutorial card mechanics to onboard new signups.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>10 Jan 2026</td>
                <td>
                  <strong>Gamification Refinements</strong>
                  <ul>
                    <li>Fixed calculation bugs in the core XP engine.</li>
                    <li>Added a live activity feed onto the debug menu for real-time tracking.</li>
                    <li>Increased contact XP cap from 100 to 900.</li>
                    <li>Enforced character validation rules on notes required to earn XP.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>05 Jan 2026</td>
                <td>
                  <strong>Navigation &amp; Controls</strong>
                  <ul>
                    <li>Introduced persistent toolbars across all views.</li>
                    <li>Enabled gesture-based search swipe in Deck Details.</li>
                    <li>Polished deck interval validation and automated focus shifts after creating a card.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>04 Jan 2026</td>
                <td>
                  <strong>Automation Debugging</strong>
                  <ul>
                    <li>Resolved Base44 webhook email dispatch issues.</li>
                    <li>Created initial secret Debug Menu via <code>DEBUG_MENU_TRUE</code>.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>02 Jan 2026</td>
                <td>
                  <strong>Onboarding Fixes</strong>
                  <ul>
                    <li>Patched existing account onboarding loops.</li>
                    <li>Integrated real-time database update checks.</li>
                    <li>Fixed Deck Total XP aggregation synchronization lag.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>30 Dec 2025</td>
                <td>
                  <strong>Email Dispatches</strong>
                  <ul>
                    <li>Initiated daily cron task for sending email alerts on overdue cards.</li>
                    <li>Reworked signup pipelines to navigate around early platform constraints.</li>
                    <li>Integrated real-time update alerts synced with the scrapbook logs.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>29 Dec 2025</td>
                <td>
                  <strong>Monetization Dry-Runs</strong>
                  <ul>
                    <li>Deployed early "Buy me a coffee" overlay mechanics.</li>
                    <li>Improved onboarding keyboard listeners (pressing Enter key progresses flows).</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>21 Dec 2025</td>
                <td>
                  <strong>PWA &amp; XP Engine</strong>
                  <ul>
                    <li>Researched PWA configurations.</li>
                    <li>Deployed first draft of card theme support.</li>
                    <li>Developed the card Experience Points (XP) rules.</li>
                    <li>Created the grid UI displaying contacts that need immediate attention.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>20 Dec 2025</td>
                <td>
                  <strong>Feedback Loops</strong>
                  <ul>
                    <li>Embedded inside-app feedback collector.</li>
                    <li>Refactored bottom navigation layout.</li>
                    <li>Added "Edit Card" capability directly on the cards.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>19 Dec 2025</td>
                <td>
                  <strong>UX Enhancements</strong>
                  <ul>
                    <li>Improved the flow when skipping optional contact info.</li>
                    <li>Made the deck badge clickable, routing users directly to the parent deck.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>18 Dec 2025</td>
                <td>
                  <strong>Authentication v1</strong>
                  <ul>
                    <li>Conducted first thorough system walkthrough to identify release gaps.</li>
                    <li>Created initial secure sign-up and sign-in screens.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>23 Nov 2025</td>
                <td>
                  <strong>Initial Drafts</strong>
                  <ul>
                    <li>Completed basic GDPR and PII compliance strategy mapping.</li>
                    <li>Built first sandbox build to test UX and map missing pieces.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>14 Nov 2025</td>
                <td>
                  <strong>Flow Validations</strong>
                  <ul>
                    <li>Mapped visual diagrams for DeckBuilder and Today View mechanics.</li>
                    <li>Leveraged LLMs to critique and optimize transaction state boundaries.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>10 Nov 2025</td>
                <td>
                  <strong>Miro Setup</strong>
                  <ul>
                    <li>Migrated UX mapping to public Miro workspace.</li>
                    <li>Scoped product backlogs and next sprint tasks.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>02 Nov 2025</td>
                <td>
                  <strong>Concept Phase</strong>
                  <ul>
                    <li>Authored product pitch deck and core features list.</li>
                    <li>Drafted app structural component dependencies.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>12 Oct 2025</td>
                <td>
                  <strong>Project Initialization</strong>
                  <ul>
                    <li>Initialized Linear workspace boards.</li>
                    <li>Scheduled core deliverables list.</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: 'triangle-timecard',
    section: 'Triangle',
    title: 'Timecard',
    eyebrow: 'Triangle · Application',
    lede: 'Time and project tracking for small teams that actually gets used.',
    updated: '',
    body: () => (
      <>
        <p>
          Timecard is a minimal time-tracking tool built for small teams and independent
          practitioners. The hypothesis: most time-tracking tools fail because they require
          more effort than the insight they return. Timecard inverts this.
        </p>
        <div className="callout warn">
          <span className="ico">~</span>
          <span>Timecard is in active development. Expected release Q3 2026.</span>
        </div>
        <h2 id="design">Design goals</h2>
        <div className="dl">
          <span className="term">Friction-free</span>
          <span className="desc">Log time in under ten seconds. No categories until you need them.</span>
          <span className="term">Honest reports</span>
          <span className="desc">Surface where time actually goes, not what was planned.</span>
          <span className="term">Small team first</span>
          <span className="desc">Designed for two to twenty people, not enterprise.</span>
        </div>
      </>
    ),
  },
];

window.SCT_PAGES = PAGES;
window.SCT_GLYPHS = G;
