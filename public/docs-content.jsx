/* eslint-disable */
// docs-content.jsx: page tree + content for SquareCircleTriangle docs

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


const PAGES = [
  {
    id: 'welcome',
    section: 'Home',
    title: 'Welcome',
    eyebrow: 'Introduction',
    lede: 'Every person has the power to change the world. We believe in unleashing that power through knowledge shared, experiences connected, and technology reimagined.',
    ledeQuote: true,
    updated: 'May 2026 by JH',
    body: () => (
      <>
        <p>
          <strong>SquareCircleTriangle</strong> is a studio built on three shapes: three disciplines
          that feed each other in a continuous loop. We
          {' '}<A page="square">teach what we know</A>,
          {' '}<A page="circle">convene the people who care</A>, and
          {' '}<A page="triangle">build the tools they need next</A>.
        </p>
        <p>
          The shapes are not metaphors; they are the operating model. Square generates
          the intellectual capital; Circle surfaces the people and contexts that need it;
          Triangle turns both into durable, scalable technology. Each feeds the next in a
          loop that compounds over time.
        </p>

        <h2 id="disciplines">The Disciplines (TLDR)</h2>
        <p>
          SquareCircleTriangle operates as a cohesive studio across three distinct, interlinking domains. Click below to explore each area in depth:
        </p>
        <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          <a className="card" href="#/square">
            <div className="card-icon" style={{ color: 'var(--accent)' }}>
              {G.square}
            </div>
            <h4>Square</h4>
            <p><strong>Education &amp; Consulting.</strong> We teach what we know, delivering top-tier educational materials, engaging insights, and corporate consulting to level up people and teams.</p>
            <span className="arrow">Explore Square →</span>
          </a>
          <a className="card" href="#/circle">
            <div className="card-icon" style={{ color: 'var(--accent)' }}>
              {G.circle}
            </div>
            <h4>Circle</h4>
            <p><strong>Community.</strong> We convene the people who care, enabling network expansion, fostering deep collaboration, and enriching spaces where shared values align.</p>
            <span className="arrow">Explore Circle →</span>
          </a>
          <a className="card" href="#/triangle">
            <div className="card-icon" style={{ color: 'var(--accent)' }}>
              {G.triangle}
            </div>
            <h4>Triangle</h4>
            <p><strong>Applications.</strong> We build the tools they need next, turning community insights and educational frameworks into lightweight, bespoke applications like DeckCRM, Timecard, Kostly, Weeklie, CrewCall, and Reflectify.</p>
            <span className="arrow">Explore Triangle →</span>
          </a>
        </div>

        <h2 id="who-we-are">Who We Are</h2>
        <p>
          SquareCircleTriangle is a multidisciplinary studio founded and built by Joseph Hill.
        </p>
        <div style={{ margin: '24px 0' }}>
          <div style={{
            display: 'flex',
            gap: '20px',
            padding: '20px',
            border: '1px solid var(--rule)',
            borderRadius: '10px',
            background: 'var(--panel)',
            alignItems: 'center',
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent), #e7b89c)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '20px',
              fontWeight: '600',
              fontFamily: 'var(--ff-mono)',
              flexShrink: 0,
            }}>
              JH
            </div>
            <div>
              <h4 style={{ margin: '0 0 4px', fontSize: '15.5px', fontWeight: '600', color: 'var(--fg)' }}>Joseph Hill</h4>
              <div style={{ fontSize: '10.5px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px', fontFamily: 'var(--ff-mono)' }}>Founder &amp; Multidisciplinary Builder</div>
              <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--fg-2)', lineHeight: '1.5' }}>
                With over 17 years of experience in product design, database architecture, and productivity frameworks, Joseph leads the studio's vision. By setting out to release one micro-app/experience every month, he uses vibe coding to explore the outer limits of independent building.
              </p>
            </div>
          </div>
        </div>

        <div className="callout tip">
          <span className="ico">→</span>
          <span>
            <strong>Where to start.</strong> Read about the{' '}
            <A page="square">Square</A>, <A page="circle">Circle</A>, and{' '}
            <A page="triangle">Triangle</A> sections in order; the narrative builds.
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
        <div className="card-grid">
          <a className="card" href="#/circle-law">
            <div className="card-icon">
              {G.circle}
            </div>
            <h4>Langenhorn AI Weekly (LAW)</h4>
            <p>A weekly get-together for AI enthusiasts and builders in Hamburg to share insights and show &amp; tell.</p>
            <span className="arrow">Learn more →</span>
          </a>
        </div>
        <p>
          Community is the medium that transforms individual learning into collective
          capacity. A well-formed Circle doesn't just support its members; it generates
          the insights and relationships that feed back into Square and Triangle.
        </p>
      </>
    ),
  },
  {
    id: 'circle-law',
    section: 'Circle',
    title: 'Langenhorn (Hamburg) AI Weekly',
    eyebrow: 'Circle · Community',
    lede: 'A weekly show-and-tell and casual exchange for like-minded builders utilizing AI for private projects and work insights.',
    updated: 'June 2026 by JH',
    body: () => (
      <>
        <p>
          <strong>Langenhorn (Hamburg) AI Weekly</strong> (or <strong>LAW</strong> for short) is a weekly get-together in Langenhorn, Hamburg. It serves as a casual exchange for like-minded people who are utilizing AI for private projects and work insights.
        </p>
        <p>
          The meetup is built on the belief that the best way to keep up with the rapid pace of AI progress is to share real, hands-on experiences. Rather than listening to formal lectures, we gather to talk, share what we are working on, and exchange practical insights.
        </p>

        <h2 id="format">The Format</h2>
        <p>
          LAW events are structured around casual, interactive collaboration rather than rigid presentations:
        </p>
        <div className="card-grid">
          <div className="card">
            <h4>Casual Exchange</h4>
            <p>Catch up on the latest AI news, tooling updates, and model releases in a relaxed setting.</p>
          </div>
          <div className="card">
            <h4>Show &amp; Tell</h4>
            <p>A low-pressure space to demo private projects, custom prompts, workflows, or experimental tools you're building.</p>
          </div>
          <div className="card">
            <h4>Work &amp; Private Insights</h4>
            <p>Discuss real-world learnings from using AI for daily tasks, professional pipelines, and personal workflows.</p>
          </div>
        </div>

        <h2 id="who-it-is-for">Who It Is For</h2>
        <p>
          The weekly is designed for anyone actively experimenting with or using AI:
        </p>
        <ul>
          <li><strong>Developers &amp; Builders:</strong> Sharing scripts, vibe coding setups, custom agents, and tool integrations.</li>
          <li><strong>Creators &amp; Designers:</strong> Sharing AI-assisted content pipelines, UI generation, and design assets.</li>
          <li><strong>Curious Minds:</strong> Anyone looking to learn, explore, and find inspiration from others' workflows.</li>
        </ul>

        <h2 id="meetup-details">Meetup Details</h2>
        <p>
          Here is all the essential information to help you join our next get-together:
        </p>
        <div className="dl">
          <span className="term">When</span>
          <span className="desc">Every Monday from 16:30.</span>

          <span className="term">Where</span>
          <span className="desc">Langenhorn Markt area, Hamburg (get in touch for the specific location details).</span>

          <span className="term">Cost</span>
          <span className="desc">Free to attend. Bring your own laptop, projects, and curiosity.</span>

          <span className="term">Focus Areas</span>
          <span className="desc">AI engineering, vibe coding, LLM application architecture, automation, and prompt optimization.</span>
        </div>

        <div className="callout tip">
          <span className="ico">→</span>
          <span>
            <strong>How to Join:</strong> Coming Soon.
          </span>
        </div>
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
          <a className="card" href="#/triangle-kostly">
            <div className="card-icon">
              <svg viewBox="0 0 16 16">
                <polygon className="fill" points="8,1.4 14.6,14.4 1.4,14.4" />
                <polygon className="stroke" points="8,1.4 14.6,14.4 1.4,14.4" />
              </svg>
            </div>
            <h4>Kostly</h4>
            <p>Track software tooling, project cost distribution, and share your stack publicly.</p>
            <span className="arrow">Learn more →</span>
          </a>
          <a className="card" href="#/triangle-weeklie">
            <div className="card-icon">
              <svg viewBox="0 0 16 16">
                <polygon className="fill" points="8,1.4 14.6,14.4 1.4,14.4" />
                <polygon className="stroke" points="8,1.4 14.6,14.4 1.4,14.4" />
              </svg>
            </div>
            <h4>Weeklie</h4>
            <p>Plan your work week with intentionality, schedule breaks, and export to iCal.</p>
            <span className="arrow">Learn more →</span>
          </a>
          <a className="card" href="#/triangle-crewcall">
            <div className="card-icon">
              <svg viewBox="0 0 16 16">
                <polygon className="fill" points="8,1.4 14.6,14.4 1.4,14.4" />
                <polygon className="stroke" points="8,1.4 14.6,14.4 1.4,14.4" />
              </svg>
            </div>
            <h4>CrewCall</h4>
            <p>Intelligent interval rowing coach to plan and execute sessions with visual guidance.</p>
            <span className="arrow">Learn more →</span>
          </a>
          <a className="card" href="#/triangle-reflectify">
            <div className="card-icon">
              <svg viewBox="0 0 16 16">
                <polygon className="fill" points="8,1.4 14.6,14.4 1.4,14.4" />
                <polygon className="stroke" points="8,1.4 14.6,14.4 1.4,14.4" />
              </svg>
            </div>
            <h4>Reflectify</h4>
            <p>A simple two-step experience to reflect on your professional career and generate a rich report.</p>
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
          DeckCRM is a lightweight personal relationship manager designed for relationship-led work. It is built around the core insight that our most valuable connections live in informal exchanges, email threads, and meeting notes, rather than in rigid enterprise CRM records.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', margin: '24px 0' }}>
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
          <a
            href="https://tally.so/r/zxNrGM"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: 'transparent',
              border: '1px solid var(--rule)',
              color: 'var(--fg)',
              borderRadius: '8px',
              fontWeight: '500',
              fontSize: '14.5px',
              textDecoration: 'none',
              transition: 'background-color 0.2s ease, border-color 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--hover)';
              e.currentTarget.style.borderColor = 'var(--muted)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'var(--rule)';
            }}
          >
            <span>Feedback / Support</span>
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
    updated: 'April 2026 by JH',
    body: () => (
      <>
        <p>
          Continuing to "own" my own stack, Timecard is a simple time and context-based tool designed to log and associate time with specific activities, enabling practitioners and small teams to reflect on and understand their time investments across various topics and themes.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', margin: '24px 0' }}>
          <a
            href="https://timecard.squarecircletriangle.co/"
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
            <span>Launch Timecard</span>
            <span style={{ fontSize: '12px' }}>↗</span>
          </a>
          <a
            href="https://tally.so/r/zxNrGM"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: 'transparent',
              border: '1px solid var(--rule)',
              color: 'var(--fg)',
              borderRadius: '8px',
              fontWeight: '500',
              fontSize: '14.5px',
              textDecoration: 'none',
              transition: 'background-color 0.2s ease, border-color 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--hover)';
              e.currentTarget.style.borderColor = 'var(--muted)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'var(--rule)';
            }}
          >
            <span>Feedback / Support</span>
            <span style={{ fontSize: '12px' }}>↗</span>
          </a>
        </div>

        <div className="callout tip">
          <span className="ico">→</span>
          <span>
            <strong>Project Status:</strong> Active micro-app with ongoing refinements. Deployed in April 2026 with full reporting, push notifications, and customizable goals.
          </span>
        </div>

        <h2 id="objective">Objective &amp; Concept</h2>
        <p>
          Timecard was created to invert the typical time-tracking experience: most tools fail because they require more manual effort to input than the actual value of the insights they return. Timecard inverts this by focusing on friction-free inputs and clear, instant reflection.
        </p>
        <p>
          The core functionality centers around:
        </p>
        <ul>
          <li><strong>Friction-Free Logging:</strong> Start and stop tracking with a single click, associating time blocks with specific cards, decks, or context themes.</li>
          <li><strong>Customizable Goals:</strong> Establish goals at both the deck and card levels to maintain target focus and review performance against milestones.</li>
          <li><strong>Instant Visual Insights:</strong> A dedicated Insights view with robust "By Cards" analytics that strips out inactive items and provides real-time time-allocation reflection.</li>
        </ul>

        <h2 id="impulse">The Impulse</h2>
        <p>
          In a modern workflow, time is the ultimate currency, yet tracking it is notoriously tedious. Most tools feel like homework. Timecard was built to feel lightweight and immediate, empowering builders to own their own time data without the weight of enterprise features.
        </p>

        <h2 id="design">Design Goals</h2>
        <div className="dl">
          <span className="term">Friction-free</span>
          <span className="desc">Log time in under ten seconds. No categories until you need them.</span>
          
          <span className="term">Honest reports</span>
          <span className="desc">Surface where time actually goes, not what was planned.</span>
          
          <span className="term">Small team first</span>
          <span className="desc">Designed for two to twenty people, not enterprise.</span>
        </div>

        <h2 id="changelog">Changelog &amp; Milestones</h2>
        <p>
          An active timeline of the design phases, feature integrations, and version deployments:
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
                <td>30 Apr 2026</td>
                <td>
                  <strong>Behind the Clock &amp; Configuration</strong>
                  <ul>
                    <li>Added "Behind the clock" section for time context and reflection.</li>
                    <li>Added savable report configuration to quickly retrieve frequent views.</li>
                    <li>Minor UX improvements and interface polish.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>29 Apr 2026</td>
                <td>
                  <strong>Reporting Engine &amp; Timers</strong>
                  <ul>
                    <li>Added the Reporting feature to generate customizable timecard reports.</li>
                    <li>Added Primary and Secondary Timer definitions for concurrent task tracking.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>27 Apr 2026</td>
                <td>
                  <strong>Notifications &amp; Styling</strong>
                  <ul>
                    <li>Added Push Notifications for active timers and tracking reminders.</li>
                    <li>Updated the Settings Area controls and layout.</li>
                    <li>Adjusted the app icon for better visibility and aesthetic alignment.</li>
                    <li>Minor UX improvements on Card Panels.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>26 Apr 2026</td>
                <td>
                  <strong>Insights &amp; Sidebar</strong>
                  <ul>
                    <li>Added previously used cards for the day in the side panel (for both Web and Mobile).</li>
                    <li>Made minor alignment improvements throughout the card lists.</li>
                    <li>Added the active timer display into the page title.</li>
                    <li>Removed cards with 0m tracked from the Insights view.</li>
                    <li>Improved the "By Cards" layout in Insights.</li>
                    <li>Added customizable Deck and Card Goal functionality.</li>
                    <li>Integrated an Insights overview directly into the sidebar clock.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>25 Apr 2026</td>
                <td>
                  <strong>Project Spaces &amp; Feedback</strong>
                  <ul>
                    <li>Created the dedicated Project Space and details view.</li>
                    <li>Updated the Feedback Form URL and integrated the direct Feedback button.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>24 Apr 2026</td>
                <td>
                  <strong>Timer Control &amp; Log Adjustments</strong>
                  <ul>
                    <li>Implemented card-specific URLs and direct timer start functionality.</li>
                    <li>Added capabilities to manually add, modify, and delete time logs.</li>
                    <li>Updated the Insights area with clearer and more high-contrast visuals.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>23 Apr 2026</td>
                <td>
                  <strong>Project Launch</strong>
                  <ul>
                    <li>Designed and implemented the core aesthetics using AI design assistance to lock in the look and feel.</li>
                    <li>Leveraged AI coding agents to implement the initial functional version.</li>
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
    id: 'triangle-kostly',
    section: 'Triangle',
    title: 'Kostly',
    eyebrow: 'Triangle · Application',
    lede: 'Track software tooling, project cost distribution, and share your stack publicly.',
    updated: 'April 2026 by JH',
    body: () => (
      <>
        <p>
          Kostly is a simple tool designed to enable builders and teams to track exactly what software tooling is utilized for which project. It displays precise cost distributions and generates a public profile page to share this stack index transparently, supporting a true "build in the open" ethos.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', margin: '24px 0' }}>
          <a
            href="https://kostly.squarecircletriangle.co/"
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
            <span>Launch Kostly</span>
            <span style={{ fontSize: '12px' }}>↗</span>
          </a>
          <a
            href="https://kostly.squarecircletriangle.co/stackindex"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: 'transparent',
              border: '1px solid var(--rule)',
              color: 'var(--fg)',
              borderRadius: '8px',
              fontWeight: '500',
              fontSize: '14.5px',
              textDecoration: 'none',
              transition: 'background-color 0.2s ease, border-color 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--hover)';
              e.currentTarget.style.borderColor = 'var(--muted)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'var(--rule)';
            }}
          >
            <span>Explore Stack Index</span>
            <span style={{ fontSize: '12px' }}>↗</span>
          </a>
          <a
            href="https://tally.so/r/zxNrGM"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: 'transparent',
              border: '1px solid var(--rule)',
              color: 'var(--fg)',
              borderRadius: '8px',
              fontWeight: '500',
              fontSize: '14.5px',
              textDecoration: 'none',
              transition: 'background-color 0.2s ease, border-color 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--hover)';
              e.currentTarget.style.borderColor = 'var(--muted)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'var(--rule)';
            }}
          >
            <span>Feedback / Support</span>
            <span style={{ fontSize: '12px' }}>↗</span>
          </a>
        </div>

        <div className="callout tip">
          <span className="ico">→</span>
          <span>
            <strong>Project Status:</strong> Active micro-app launched publicly. Deployed in March 2026 with full project-tool cost distribution graphs, upcoming renewal email/bubble alerts, and a global Stack Index.
          </span>
        </div>

        <h2 id="objective">Objective &amp; Concept</h2>
        <p>
          Kostly was designed to address a common pain point: as a builder or small team scales, software subscription costs become fragmented across multiple projects. Kostly brings order by letting you define your tools, record renewal calendars and no-cost periods, and visualize true project-specific expenses, while providing a public-facing OpenPage showing what you use.
        </p>
        <p>
          The core functionality centers around:
        </p>
        <ul>
          <li><strong>Tool &amp; Project Mapping:</strong> Map software licenses directly to specific projects and cost thresholds, enabling a clear view of where money is being spent.</li>
          <li><strong>Public OpenPage Stacks:</strong> Automatically index your verified stack under a shareable short URL (powered by ezli.me) to build transparency with your users and community.</li>
          <li><strong>Interactive Insights:</strong> Dashboard graphs displaying currency-converted project cost limits, renewal calendars, and cancellation alerts.</li>
        </ul>

        <h2 id="impulse">The Impulse</h2>
        <p>
          With the first micro-app, DeckCRM, over 36 hours of total development was invested. A main takeaway was: <em>how can we achieve similar or greater product scope with significantly reduced time?</em>
        </p>
        <p>
          By utilizing a structured workflow (very clear Miro board mapping, specialized LLM/MCP PRD definitions, and a streamlined Vibe Coding process), Kostly was built and launched with just over 16 hours of development time. It stands as a testament to the compounding speed of AI-assisted development pipeline mastery.
        </p>
        <p>
          Additionally, Kostly introduced a collaborative Stack Index, inviting the public to review, discover, and share how their software stack makes them feel and what value they actually derive from each subscription.
        </p>

        <h2 id="development-pipeline">Pipeline &amp; Velocity</h2>
        <p>
          Kostly highlights a major evolution in the monthly micro-app challenge:
        </p>
        <div className="dl">
          <span className="term">Miro Conceptualizing</span>
          <span className="desc">Mapping out the complete UX flow and dashboard limits before typing a line of code.</span>
          
          <span className="term">Vibe Coding Mastery</span>
          <span className="desc">Utilizing Miro MCP, Claude, and Github Copilot to generate comprehensive prompts, dropping dev time by over 50% compared to DeckCRM.</span>
          
          <span className="term">Building in Public</span>
          <span className="desc">A shared stack index enabling community ratings and absolute transparency.</span>
        </div>

        <h2 id="changelog">Changelog &amp; Milestones</h2>
        <p>
          An active timeline of the design phases, feature integrations, and version deployments:
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
                <td>01 Apr 2026</td>
                <td>
                  <strong>Inactive Scheduling</strong>
                  <ul>
                    <li>Added Cancel Tool option from a specific date to automatically set it inactive.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>10 Mar 2026</td>
                <td>
                  <strong>Reminder Optimization</strong>
                  <ul>
                    <li>Improved the automated reminder system for rating tools on the index.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>02 Mar 2026</td>
                <td>
                  <strong>Index Prototype &amp; Mobile</strong>
                  <ul>
                    <li>Created the first tool index prototype.</li>
                    <li>Updated the product landing page and index navigation.</li>
                    <li>Generated launch assets for ProductHunt and Peerlist integrations.</li>
                    <li>Designed and implemented a simplified Mobile Version of the dashboard.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>27 Feb 2026</td>
                <td>
                  <strong>Onboarding &amp; Add Flows</strong>
                  <ul>
                    <li>Created the simplified user onboarding flow.</li>
                    <li>Implemented a direct adding new tool and adding new project flow.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>22 Feb 2026</td>
                <td>
                  <strong>Layouts &amp; Thresholds</strong>
                  <ul>
                    <li>Improved global application layouts.</li>
                    <li>Added the capability to define multiple Project Cost Threshold alerts.</li>
                    <li>Bug fixed project-specific dashboard views.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>21 Feb 2026</td>
                <td>
                  <strong>Visual Overhaul &amp; Metrics</strong>
                  <ul>
                    <li>Massive Visual Overhaul of the main Tool Page.</li>
                    <li>Added tool cancellation alerts, project renewal bubble prompts, and notes support.</li>
                    <li>Added graph for Project Total Costs on the Dashboard and configured currency conversions.</li>
                    <li>Integrated the new OpenPage Global View and deployed ezli.me short URLs.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>13 Feb 2026</td>
                <td>
                  <strong>Reminders &amp; Exports</strong>
                  <ul>
                    <li>Implemented per-tool custom renewal reminders.</li>
                    <li>Created account-level CSV file exports.</li>
                    <li>Improved UX handling of asynchronous processes.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>11 Feb 2026</td>
                <td>
                  <strong>Responsive Currency</strong>
                  <ul>
                    <li>Added Short URL Support via ezli.me and integrated currency handling on the stack.</li>
                    <li>Implemented responsive designs and moved tag filters.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>09 Feb 2026</td>
                <td>
                  <strong>OpenPage MVP</strong>
                  <ul>
                    <li>Added ability to assign tools to projects from the Stack flow.</li>
                    <li>Enabled financial detail visibility toggles for the public OpenPage profiles.</li>
                    <li>Deployed MVP of the Profile OpenPage Concept.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>08 Feb 2026</td>
                <td>
                  <strong>PRD &amp; Infrastructure</strong>
                  <ul>
                    <li>Authored PRD and initial vibe coding prompts using Miro MCP and Claude.</li>
                    <li>Set up the Base44 project spaces, domain routing, and renewal calendar calendar-views.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>21 Jan 2026</td>
                <td>
                  <strong>Initialization</strong>
                  <ul>
                    <li>Initialized project spaces, Linear tasks, and initial Miro concept planning boards.</li>
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
    id: 'triangle-weeklie',
    section: 'Triangle',
    title: 'Weeklie',
    eyebrow: 'Triangle · Application',
    lede: 'Simple work week planning and calendar export to stay balanced and aligned.',
    updated: 'April 2026 by JH',
    body: () => (
      <>
        <p>
          Weeklie is a simple web tool designed to help builders and practitioners plan out their work week with intentionality, schedule breaks, and ensure they don't overshoot target hours. It provides a visual, lightweight weekly planner that exports to standard calendar formats (iCal), making it easy to share availability and scheduled blocks with partners or teams.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', margin: '24px 0' }}>
          <a
            href="https://weeklie.squarecircletriangle.co/"
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
            <span>Launch Weeklie</span>
            <span style={{ fontSize: '12px' }}>↗</span>
          </a>
          <a
            href="https://tally.so/r/zxNrGM"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: 'transparent',
              border: '1px solid var(--rule)',
              color: 'var(--fg)',
              borderRadius: '8px',
              fontWeight: '500',
              fontSize: '14.5px',
              textDecoration: 'none',
              transition: 'background-color 0.2s ease, border-color 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--hover)';
              e.currentTarget.style.borderColor = 'var(--muted)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'var(--rule)';
            }}
          >
            <span>Feedback / Support</span>
            <span style={{ fontSize: '12px' }}>↗</span>
          </a>
        </div>

        <div className="callout tip">
          <span className="ico">→</span>
          <span>
            <strong>Project Status:</strong> Active micro-app migrated from a Claude Artifact. Deployed on a custom subdomain with support for multiple daily pauses, auto-versioning, and carry-over work hours.
          </span>
        </div>

        <h2 id="objective">Objective &amp; Concept</h2>
        <p>
          Weeklie was created to solve a personal coordination and pacing problem: planning and communicating weekly work schedules to ensure both work hour intentionality and partner alignment. Rather than managing complex, heavy calendar schedules, Weeklie allows you to build a visual work plan every Sunday, block breaks/pauses, and export the final schedule as a calendar file.
        </p>
        <p>
          The core gameplay loop centers around:
        </p>
        <ul>
          <li><strong>Intentional Planning:</strong> Visualizing your week in advance, matching scheduled slots against target hours so you don't overwork.</li>
          <li><strong>Multiple Pauses:</strong> Ability to break down the day with multiple pauses/breaks, reflecting real-world schedules.</li>
          <li><strong>Calendar Export:</strong> Export your planned week to a calendar file and sync it to a dedicated calendar for easy visibility.</li>
        </ul>

        <h2 id="impulse">The Impulse</h2>
        <p>
          This project started its life as an interactive Claude Artifact. After hit restrictions and scaling limitations within the artifact interface, it was migrated into a dedicated standalone repository using Claude Code. This transition highlights the power of modern vibe coding: taking a prototype built fully in chat and wrapping it into a production-ready, subdomain-hosted web application.
        </p>

        <h2 id="changelog">Changelog &amp; Milestones</h2>
        <p>
          An active timeline of the development phases and feature integrations:
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
                <td>26 Apr 2026</td>
                <td>
                  <strong>Carry-Over Usability</strong>
                  <ul>
                    <li>Made adding and managing Carry-Over work hours easier to set and track.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>20 Apr 2026</td>
                <td>
                  <strong>Flexible Pauses</strong>
                  <ul>
                    <li>Added support for configuring multiple pauses per day.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>02 Apr 2026</td>
                <td>
                  <strong>Carry-Over Logic</strong>
                  <ul>
                    <li>Fixed and optimized carry-over time formulas to accurately display positive and negative hour balances.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>01 Apr 2026</td>
                <td>
                  <strong>Assets &amp; Articles</strong>
                  <ul>
                    <li>Created marketing and visual assets.</li>
                    <li>Published the conceptual scratchpad post: <a href="https://scrapbook.josephhill.co/3+-+Areas/scrapbook/Scratchpad/pages/2026-03-31+-+Work+Hour+Intentionality" target="_blank" rel="noopener noreferrer">2026-03-31 - Work Hour Intentionality</a>.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>30 Mar 2026</td>
                <td>
                  <strong>Project Launch</strong>
                  <ul>
                    <li>Created github project from the Claude Artifact.</li>
                    <li>Implemented marketing landing page and feedback loops.</li>
                    <li>Configured custom subdomain and automated application versioning.</li>
                    <li>Switched calendar logic to a CW (Calendar Week) picker.</li>
                    <li>Added support for marking days off.</li>
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
    id: 'triangle-crewcall',
    section: 'Triangle',
    title: 'CrewCall',
    eyebrow: 'Triangle · Application',
    lede: 'Intelligent interval rowing coach to plan and execute sessions with visual guidance.',
    updated: 'July 2026 by JH',
    body: () => (
      <>
        <p>
          CrewCall is an intelligent interval rowing coach designed to help practitioners plan and execute interval rowing training sessions at home without relying on non-EU tech. It acts as a smart companion, auto-scaling session pacing, arrangements, and stroke rate targets, while providing real-time audio guidance to keep your focus entirely on the rowing rhythm.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', margin: '24px 0' }}>
          <a
            href="https://crewcall.squarecircletriangle.co/"
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
            <span>Launch CrewCall</span>
            <span style={{ fontSize: '12px' }}>↗</span>
          </a>
          <a
            href="https://tally.so/r/zxNrGM"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: 'transparent',
              border: '1px solid var(--rule)',
              color: 'var(--fg)',
              borderRadius: '8px',
              fontWeight: '500',
              fontSize: '14.5px',
              textDecoration: 'none',
              transition: 'background-color 0.2s ease, border-color 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--hover)';
              e.currentTarget.style.borderColor = 'var(--muted)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'var(--rule)';
            }}
          >
            <span>Feedback / Support</span>
            <span style={{ fontSize: '12px' }}>↗</span>
          </a>
        </div>

        <div className="callout tip">
          <span className="ico">→</span>
          <span>
            <strong>Project Status:</strong> Active micro-app launched in June 2026. Features a questionnaire-based Smart Session Builder, an advanced workout builder, customizable time blocks, color-coded intensity alerts, looping background videos, a dedicated mobile warning screen, and auditory guides.
          </span>
        </div>

        <h2 id="objective">Objective &amp; Concept</h2>
        <p>
          Created as a replacement for interval rowing training at home. The core objective is to replace rigid commercial tools (like Apple Fitness) by allowing users to define specific workout timeframes and receive structured guidance on intensity for each phase, helping to build progressive training regimens.
        </p>
        <p>
          The core functionality centers around:
        </p>
        <ul>
          <li><strong>Smart Session Builder:</strong> A questionnaire-based generator that auto-builds customized workout routines based on user goals, intensity preference, and target duration.</li>
          <li><strong>Intelligent Intervals:</strong> Automatically scales the workout layout, pacing, and target stroke rates dynamically based on the total time you define.</li>
          <li><strong>Audio Cues:</strong> Built-in voice synth guidance, transition alerts, 5-second countdown beeps, and a 10-second initiation interval to get set up before starting.</li>
          <li><strong>Workout Builder:</strong> A fully customizable advanced workout editor where you can fine-tune phases, intensities, and durations, or drag-and-drop blocks.</li>
          <li><strong>Freestyle Intervals:</strong> Unstructured training blocks to allow free-form pacing alongside standard intensity targets.</li>
          <li><strong>Import &amp; Export:</strong> Save custom workout configurations as JSON files, and upload them later to instantly run or share specific sessions.</li>
        </ul>

        <h2 id="impulse">The Impulse</h2>
        <p>
          When executing interval training, looking down at a phone screen to see the remaining time or target stroke rate is distracting and disrupts the rhythm. CrewCall was born out of a desire to create a clean, web-based tool that works seamlessly on desktop and tablet, utilising audio cues for hands-free, distraction-free training, while staying within a self-owned tech stack.
        </p>

        <h2 id="design">Design Goals</h2>
        <div className="dl">
          <span className="term">Rhythm-First Design</span>
          <span className="desc">High-contrast, color-coded visual cues that are readable from a distance while rowing.</span>

          <span className="term">Distraction-Free Guidance</span>
          <span className="desc">Voice synthesis and audio alerts that let you keep your eyes closed or on your posture.</span>

          <span className="term">Highly Flexible</span>
          <span className="desc">Tailor row-to-rest ratios and configure pause times to match any training progression.</span>
        </div>

        <h2 id="changelog">Changelog &amp; Milestones</h2>
        <p>
          An active timeline of the design phases, feature integrations, and version deployments:
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
                <td>08 Jul 2026</td>
                <td>
                  <strong>Session Customization &amp; Audio Pacing</strong>
                  <ul>
                    <li>Moved the panel collapse button to be front and center for improved ergonomics and panel control.</li>
                    <li>Added a "Freestyle" interval type for unstructured, free-form workouts.</li>
                    <li>Implemented a 5-second countdown beep before interval transitions.</li>
                    <li>Added a 10-second initiation countdown before the session starts to allow users to get in position.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>01 Jul 2026</td>
                <td>
                  <strong>Smart Builder &amp; UX Polish</strong>
                  <ul>
                    <li>Implemented a questionnaire-based Smart Session Builder to automatically generate custom routines based on user goals.</li>
                    <li>Added inline advanced block insertion with scroll position preservation.</li>
                    <li>Added a mobile warning screen to prompt users to view the app on web or tablet, with a CTA navigating back to the landing page.</li>
                    <li>Implemented a collapsible active panel for advanced mode to tighten layout spacing.</li>
                    <li>Added a looping header background video with a frosted-glass blur effect on the landing page.</li>
                    <li>Implemented session pause/break functionality.</li>
                    <li>Added color-coded feedback to the advanced editor.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>30 Jun 2026</td>
                <td>
                  <strong>Project Launch</strong>
                  <ul>
                    <li>Created the base design and repository.</li>
                    <li>Configured the custom subdomain <code>crewcall.squarecircletriangle.co</code>.</li>
                    <li>Added the project scrapbook page.</li>
                    <li>Implemented import and export features for workout configurations.</li>
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
    id: 'triangle-reflectify',
    section: 'Triangle',
    title: 'Reflectify',
    eyebrow: 'Triangle · Application',
    lede: 'A simple two-step experience to reflect on your professional career and generate a rich report.',
    updated: 'July 2026 by JH',
    body: () => (
      <>
        <p>
          Reflectify is a lightweight web experience designed to facilitate deep professional reflection. By providing a structured, customizable prompt to feed into your favorite AI model, it generates a comprehensive dataset which you then upload back into Reflectify to unlock a rich, interactive career report.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', margin: '24px 0' }}>
          <a
            href="https://reflectify.squarecircletriangle.co/"
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
            <span>Launch Reflectify</span>
            <span style={{ fontSize: '12px' }}>↗</span>
          </a>
          <a
            href="https://tally.so/r/zxNrGM"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: 'transparent',
              border: '1px solid var(--rule)',
              color: 'var(--fg)',
              borderRadius: '8px',
              fontWeight: '500',
              fontSize: '14.5px',
              textDecoration: 'none',
              transition: 'background-color 0.2s ease, border-color 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--hover)';
              e.currentTarget.style.borderColor = 'var(--muted)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'var(--rule)';
            }}
          >
            <span>Feedback / Support</span>
            <span style={{ fontSize: '12px' }}>↗</span>
          </a>
          <a
            href="https://discord.gg/pKUK6VpEYr"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              background: 'transparent',
              border: '1px solid var(--rule)',
              color: 'var(--fg)',
              borderRadius: '8px',
              fontWeight: '500',
              fontSize: '14.5px',
              textDecoration: 'none',
              transition: 'background-color 0.2s ease, border-color 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--hover)';
              e.currentTarget.style.borderColor = 'var(--muted)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'var(--rule)';
            }}
          >
            <span>Join Discord Channel</span>
            <span style={{ fontSize: '12px' }}>↗</span>
          </a>
        </div>

        <div className="callout tip">
          <span className="ico">→</span>
          <span>
            <strong>Project Status:</strong> Active micro-app launched in July 2026. Features prompt generation, multi-language support (English and German), and secure local JSON parsing to generate rich interactive career reports.
          </span>
        </div>

        <h2 id="objective">Objective &amp; Concept</h2>
        <p>
          The objective of Reflectify is to create a simple, privacy-focused, two-step process for professional self-reflection:
        </p>
        <ol>
          <li><strong>Generate Prompt:</strong> Users get a carefully crafted, structured prompt to input into an AI model of their choice (e.g., ChatGPT, Claude, Gemini).</li>
          <li><strong>Generate Report:</strong> The AI processes the prompt and outputs a structured JSON file. Users upload this JSON back to Reflectify to generate a highly visual, comprehensive career report offline in their browser.</li>
        </ol>

        <h2 id="impulse">The Impulse</h2>
        <p>
          Reflecting on one's career path can be a daunting, unstructured task. Traditional performance reviews are often backwards-looking and company-centric. Reflectify was built to give individuals a personal, structured space to analyze their accomplishments, identify growth areas, and project future paths, without sacrificing data privacy by processing everything client-side.
        </p>

        <h2 id="changelog">Changelog &amp; Milestones</h2>
        <p>
          An active timeline of the design phases, feature integrations, and version deployments:
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
                <td>13 Jul 2026</td>
                <td>
                  <strong>Domain Setup &amp; Localization</strong>
                  <ul>
                    <li>Configured the custom subdomain <code>reflectify.squarecircletriangle.co</code>.</li>
                    <li>Added language support for the prompt to allow multi-language reflections.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>12 Jul 2026</td>
                <td>
                  <strong>Project Genesis</strong>
                  <ul>
                    <li>Created the project scrapbook page.</li>
                    <li>Built the proof-of-concept (PoC) client-side parser and prompt generator.</li>
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
    id: 'privacy',
    section: 'Home',
    title: 'Privacy Policy',
    eyebrow: 'Legal',
    lede: 'How SquareCircleTriangle collects, uses, and protects information across this site and its applications.',
    updated: 'July 2026 by JH',
    body: () => (
      <>
        <p>
          This Privacy Policy explains what information SquareCircleTriangle ("we", "us") collects
          when you visit squarecircletriangle.co and its subdomains (including the Square, Circle,
          and Triangle applications), and how that information is used.
        </p>

        <h2 id="analytics">Website Analytics</h2>
        <p>
          We use <a className="inline" href="https://usefathom.com/" target="_blank" rel="noopener noreferrer">Fathom Analytics</a> to
          understand overall traffic patterns, such as which pages are popular and where visitors
          come from. Fathom is a privacy-first analytics service that does not use cookies and does
          not track or profile individuals across websites or devices.
        </p>
        <div className="callout tip">
          <span className="ico">→</span>
          <span>
            Fathom does not collect any personally identifiable information (PII). Visitors are
            never tracked across other websites, and no persistent identifiers are stored in your
            browser for analytics purposes.
          </span>
        </div>
        <p>
          The data Fathom aggregates includes anonymized/hashed information such as approximate
          location (country/region, derived from IP address, which is discarded after processing),
          browser and device type, referring site, and pages visited. This information cannot be
          used to identify you individually. You can read more in{' '}
          <a className="inline" href="https://usefathom.com/privacy" target="_blank" rel="noopener noreferrer">Fathom's own privacy policy</a>.
        </p>

        <h2 id="cookies">Cookies</h2>
        <p>
          This site does not set analytics or advertising cookies. Any cookies used are strictly
          those necessary for the applications under the Triangle discipline (e.g. DeckCRM,
          Timecard, Kostly, Weeklie, CrewCall, Reflectify) to function, such as session or authentication
          cookies where a user account is involved. Each application's own scope may set additional
          functional cookies necessary to deliver the service you request.
        </p>

        <h2 id="data-we-collect">Other Information We Collect</h2>
        <p>
          Where you voluntarily provide information to us — for example via a contact form,
          feedback form, or by signing up for one of the Triangle applications — we collect only
          what is necessary to respond to you or provide the service, such as your name, email
          address, and the content of your message. We do not sell or share this information with
          third parties for marketing purposes.
        </p>

        <h2 id="third-parties">Third-Party Services</h2>
        <p>
          Some pages link out to third-party services (such as Tally for feedback forms, or hosted
          subdomains for individual applications). Those services have their own privacy policies
          governing any information you provide directly to them.
        </p>

        <h2 id="your-rights">Your Rights</h2>
        <p>
          Depending on your jurisdiction, you may have rights to access, correct, or request
          deletion of personal information we hold about you. Because our analytics provider does
          not collect personal data, there is generally nothing to request in relation to site
          analytics. For any other data you have shared with us directly, contact us using the
          details below.
        </p>

        <h2 id="changes">Changes to This Policy</h2>
        <p>
          We may update this policy from time to time as our practices or applicable law changes.
          The "Last updated" date at the top of this page reflects the most recent revision.
        </p>

        <h2 id="contact">Contact</h2>
        <p>
          If you have questions about this Privacy Policy or how your information is handled,
          please reach out via the feedback links available on the individual application pages.
        </p>
      </>
    ),
  },
];

window.SCT_PAGES = PAGES;
window.SCT_GLYPHS = G;
