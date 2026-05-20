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
        <div className="card-grid">
          <a className="card" href="#/square-programs">
            <div className="card-icon">
              <svg viewBox="0 0 16 16">
                <rect className="fill" x="1.6" y="1.6" width="12.8" height="12.8" />
                <rect className="stroke" x="1.6" y="1.6" width="12.8" height="12.8" />
              </svg>
            </div>
            <h4>Education Programs</h4>
            <p>Structured learning paths and workshops that build lasting capability.</p>
            <span className="arrow">View programs →</span>
          </a>
          <a className="card" href="#/square-consulting">
            <div className="card-icon">
              <svg viewBox="0 0 16 16">
                <rect className="fill" x="1.6" y="1.6" width="12.8" height="12.8" />
                <rect className="stroke" x="1.6" y="1.6" width="12.8" height="12.8" />
              </svg>
            </div>
            <h4>Consulting</h4>
            <p>Hands-on advisory drawing on the full ecosystem of knowledge and community.</p>
            <span className="arrow">View consulting →</span>
          </a>
        </div>
        <p>
          The Square discipline exists because knowledge transfer is the foundation of everything
          else. Without well-articulated, shareable knowledge, communities stay fragmented and
          technology stays inaccessible. Square creates the conditions for both to flourish.
        </p>
      </>
    ),
  },
  {
    id: 'square-programs',
    section: 'Square',
    title: 'Education Programs',
    eyebrow: 'Square · Education',
    lede: 'Structured learning paths, workshops, and materials that level people up.',
    updated: '',
    body: () => (
      <>
        <p>
          Our education programs are designed for people who want to go deeper — not just
          learn a skill but understand the system it operates within. Every program combines
          conceptual framing with hands-on practice.
        </p>
        <h2 id="formats">Formats</h2>
        <div className="dl">
          <span className="term">Workshops</span>
          <span className="desc">Half-day and full-day intensive sessions, delivered in-person or remotely.</span>
          <span className="term">Cohorts</span>
          <span className="desc">Six to twelve week programs with peer accountability and weekly live sessions.</span>
          <span className="term">Materials</span>
          <span className="desc">Written guides, toolkits, and reference documents available asynchronously.</span>
        </div>
        <h2 id="approach">Approach</h2>
        <p>
          We believe learning sticks when it's <strong>relevant, social, and applied</strong>.
          Every program is built around real problems, involves other learners, and ends
          with something the participant can use immediately.
        </p>
        <div className="callout">
          <span className="ico">!</span>
          <span>
            Programs are delivered in small cohorts by default. Bespoke delivery for
            organisations of ten or more is available — <A page="square-consulting">contact us via Consulting</A>.
          </span>
        </div>
      </>
    ),
  },
  {
    id: 'square-consulting',
    section: 'Square',
    title: 'Consulting',
    eyebrow: 'Square · Consulting',
    lede: 'Advisory work grounded in the knowledge and community of the full ecosystem.',
    updated: '',
    body: () => (
      <>
        <p>
          Consulting at SquareCircleTriangle is different from traditional advisory because
          it draws on a live network. When we engage with an organisation, we bring not just
          our own experience but the patterns, insights, and contacts from the wider
          Square–Circle–Triangle loop.
        </p>
        <h2 id="engagements">Engagement types</h2>
        <div className="tbl">
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Typical scope</th>
                <th>Outcome</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Strategy sprint</td>
                <td>2–4 weeks</td>
                <td>Prioritised roadmap + decision framework</td>
              </tr>
              <tr>
                <td>Embedded advisory</td>
                <td>3–6 months</td>
                <td>Ongoing guidance, monthly check-ins</td>
              </tr>
              <tr>
                <td>Programme design</td>
                <td>4–8 weeks</td>
                <td>Bespoke education programme for your org</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          All consulting work is scoped collaboratively. We don't sell hours — we scope
          to outcomes and price accordingly.
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
          <a className="card" href="#/circle-cohorts">
            <div className="card-icon">
              <svg viewBox="0 0 16 16">
                <circle className="fill" cx="8" cy="8" r="6.4" />
                <circle className="stroke" cx="8" cy="8" r="6.4" />
              </svg>
            </div>
            <h4>Cohorts</h4>
            <p>Peer groups formed around shared goals and moving through a program together.</p>
            <span className="arrow">View cohorts →</span>
          </a>
          <a className="card" href="#/circle-events">
            <div className="card-icon">
              <svg viewBox="0 0 16 16">
                <circle className="fill" cx="8" cy="8" r="6.4" />
                <circle className="stroke" cx="8" cy="8" r="6.4" />
              </svg>
            </div>
            <h4>Events</h4>
            <p>Gatherings, panels, and community sessions that bring the network together.</p>
            <span className="arrow">View events →</span>
          </a>
        </div>
        <p>
          Community is the medium that transforms individual learning into collective
          capacity. A well-formed Circle doesn't just support its members — it generates
          the insights and relationships that feed back into Square and Triangle.
        </p>
      </>
    ),
  },
  {
    id: 'circle-cohorts',
    section: 'Circle',
    title: 'Cohorts',
    eyebrow: 'Circle · Community',
    lede: 'Peer groups that move through programs together and hold each other accountable.',
    updated: '',
    body: () => (
      <>
        <p>
          Cohorts are the core social unit of SquareCircleTriangle. A cohort is a small
          group — typically eight to sixteen people — who share a context, commit to a
          program together, and stay connected beyond it.
        </p>
        <h2 id="how-they-work">How they work</h2>
        <p>
          Each cohort runs for a defined period, with a structured program and optional
          live sessions. Members are matched based on complementary experience and shared
          goals, not just professional background.
        </p>
        <div className="callout tip">
          <span className="ico">✓</span>
          <span>
            <strong>Alumni network.</strong> Past cohort members remain connected through
            the Circle network and are often the strongest source of referrals, collaborators,
            and co-founders for Triangle projects.
          </span>
        </div>
        <h2 id="joining">Joining a cohort</h2>
        <p>
          Cohorts form around specific programs or themes. Interested individuals apply
          with a brief statement of context and intent — we curate rather than first-come.
        </p>
      </>
    ),
  },
  {
    id: 'circle-events',
    section: 'Circle',
    title: 'Events',
    eyebrow: 'Circle · Community',
    lede: 'Gatherings that activate the network and surface new connections.',
    updated: '',
    body: () => (
      <>
        <p>
          Events are how the Circle stays alive between formal programs. From small
          roundtables to larger convenings, every event is designed around a question,
          not just a topic.
        </p>
        <h2 id="formats">Event formats</h2>
        <div className="dl">
          <span className="term">Roundtables</span>
          <span className="desc">Eight to twelve people, a single framing question, ninety minutes.</span>
          <span className="term">Open sessions</span>
          <span className="desc">Community-wide gatherings, typically quarterly. Open to the full network.</span>
          <span className="term">Field trips</span>
          <span className="desc">Visits to organisations, studios, or projects doing interesting work.</span>
        </div>
        <p>
          All events are summarised and shared with the network. No recordings — the
          transcript is a curated set of insights, not a replay.
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
    updated: '',
    body: () => (
      <>
        <p>
          DeckCRM is a lightweight CRM designed for relationship-led work. It's built around
          the insight that most valuable relationships live in email threads, meeting notes,
          and informal channels — not in structured records.
        </p>
        <div className="callout warn">
          <span className="ico">~</span>
          <span>DeckCRM is currently in private beta. <A page="circle-cohorts">Join the network</A> to get early access.</span>
        </div>
        <h2 id="principles">Design principles</h2>
        <ul>
          <li>Capture where you already work — email, notes, and calendar first.</li>
          <li>Surface what matters without requiring manual updates.</li>
          <li>Personal before organisational — your relationship graph, not the company's CRM.</li>
        </ul>
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
