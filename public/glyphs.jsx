/* eslint-disable */
// glyphs.jsx: shape icon glyphs, shared by the sidebar nav and card_grid blocks.
// Moved out of docs-content.jsx since that file is now replaced by API-fetched content.

window.SCT_GLYPHS = {
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
