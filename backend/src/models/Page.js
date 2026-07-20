import mongoose from "mongoose";

const BlockSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: [
        "header",
        "paragraph",
        "list",
        "table",
        "equation",
        "callout",
        "divider",
      ],
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

const VersionSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Certified",
    },
    dateLabel: {
      type: String,
      default: "",
    },
    actions: [
      {
        label: String,
        description: String,
        href: String,
      },
    ],
  },
  { _id: false }
);

const PageSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    eyebrow: {
      type: String,
      default: "Standards",
      trim: true,
    },

    summary: {
      type: String,
      default: "",
      trim: true,
    },

    category: {
      type: String,
      default: "Standards",
      trim: true,
    },

    version: {
      label: {
        type: String,
        default: "v1.0.0",
      },
      dateLabel: {
        type: String,
        default: "12 Jul 2025",
      },
      status: {
        type: String,
        default: "Certified",
      },
    },

    versions: {
      type: [VersionSchema],
      default: [],
    },

    blocks: {
      type: [BlockSchema],
      default: [],
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    publishedAt: Date,

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

PageSchema.index({
  slug: 1,
  status: 1,
});

PageSchema.virtual("toc").get(function toc() {
  const blocks = Array.isArray(this.blocks) ? this.blocks : [];

  return blocks
    .filter((block) => block?.type === "header")
    .map((block) => ({
      id: block?.data?.anchor || "",
      label: `${block?.data?.number || ""} ${block?.data?.title || ""}`.trim(),
      level: block?.data?.level || 2,
    }));
});

PageSchema.set("toJSON", {
  virtuals: true,
});

PageSchema.set("toObject", {
  virtuals: true,
});

export const Page = mongoose.model("Page", PageSchema);