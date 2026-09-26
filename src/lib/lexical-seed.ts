/** Minimal Lexical document for seeding counsel-approved legal copy into Payload. */
export function textToLexical(text: string) {
  const paragraphs = text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);

  return {
    root: {
      type: "root",
      children: paragraphs.map((paragraph) => ({
        type: "paragraph",
        children: [{ type: "text", text: paragraph, version: 1 }],
        direction: "ltr",
        format: "",
        indent: 0,
        version: 1,
      })),
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    },
  };
}
