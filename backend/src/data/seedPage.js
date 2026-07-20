const filler =
  "Lorem ipsum dolor sit amet consectetur. Massa nec vulputate amet enim turpis elit odio fusce. Nunc cursus aliquet arcu vitae dolor ac rutrum pulvinar orci. Tristique nulla sed at nisl justo ipsum accumsan sed a. Enim amet varius ligula egestas. Integer vestibulum elementum non fermentum.";

function paragraph(text = filler) {
  return {
    type: "paragraph",
    data: {
      text,
      html: `<p>${text}</p>`,
      json: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text }]
          }
        ]
      }
    }
  };
}

function header(number, title, anchor, level = 2) {
  return {
    type: "header",
    data: {
      number,
      title,
      anchor,
      level
    }
  };
}

export const seedPage = {
  slug: "ev",
  title: "EV",
  eyebrow: "Standards",
  category: "Standards",
  summary:
    "Lorem ipsum dolor sit amet consectetur. Gravida faucibus commodo leo eget commodo. Sit quis dolor non sed enim scelerisque.",
  version: {
    label: "v1.0.0",
    dateLabel: "12 Jul 2025",
    status: "Certified"
  },
  versions: [
    {
      label: "v1.0.0",
      status: "Certified",
      dateLabel: "12 Jul 2025",
      actions: [{ label: "View", description: "Current certified standard", href: "#introduction" }]
    },
    {
      label: "Public consultation",
      status: "Open",
      dateLabel: "12 May 2025 - 12 Jul 2025",
      actions: [
        { label: "View consultation", description: "Read public consultation draft", href: "#future-versions" },
        { label: "View Feedback", description: "Feedback summary and actions", href: "#version-control" }
      ]
    }
  ],
  status: "published",
  publishedAt: new Date("2025-07-12T00:00:00.000Z"),
  blocks: [
    header("1.0", "Introduction", "introduction"),
    paragraph(),
    paragraph(),
    paragraph(),
    paragraph(),
    header("2.0", "Future Versions", "future-versions"),
    paragraph(),
    paragraph(),
    paragraph(),
    paragraph(),
    header("2.1", "Future Versions", "future-versions-2-1", 3),
    paragraph(),
    paragraph(),
    paragraph(),
    paragraph(),
    header("2.1.1", "Future Versions", "future-versions-2-1-1", 4),
    paragraph(),
    header("2.1.2", "Future Versions", "future-versions-2-1-2", 4),
    paragraph(),
    header("2.2", "Future Versions", "future-versions-2-2", 3),
    paragraph(),
    paragraph(),
    paragraph(),
    paragraph(),
    header("3.0", "Future Versions", "future-versions-3"),
    paragraph(),
    header("3.1", "Future Versions", "future-versions-3-1", 3),
    paragraph(),
    header("3.1.1", "Future Versions", "future-versions-3-1-1", 4),
    paragraph(),
    header("3.1.2", "Future Versions", "future-versions-3-1-2", 4),
    paragraph(),
    header("3.2", "Future Versions", "future-versions-3-2", 3),
    {
      type: "table",
      data: {
        caption: "EV standard review milestones",
        headers: ["Milestone", "Owner", "Target"],
        rows: [
          ["Public consultation", "Standards team", "12 May 2025"],
          ["Technical review", "Science council", "28 Jun 2025"],
          ["Certified release", "Registry administrator", "12 Jul 2025"]
        ]
      }
    },
    {
      type: "list",
      data: {
        style: "unordered",
        items: [
          { text: "Methodology documentation must remain auditable." },
          {
            text: "Registry records should include nested project evidence.",
            children: [{ text: "Monitoring data" }, { text: "Retirement references" }]
          },
          { text: "Public consultation feedback is linked to version notes." }
        ]
      }
    },
    {
      type: "equation",
      data: {
        latex: "E_{reduction}=E_{baseline}-E_{project}",
        caption: "Emission reduction accounting equation"
      }
    }
  ]
};
