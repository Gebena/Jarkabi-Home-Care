type LexicalNode = {
  type?: string;
  text?: string;
  children?: LexicalNode[];
};

type LexicalValue = { root?: LexicalNode } | null | undefined;

/**
 * Flatten a Lexical document into paragraphs of plain text.
 *
 * Payload stores rich text as a Lexical tree, and rendering it as HTML needs
 * the converter package plus `dangerouslySetInnerHTML`. Article bodies here are
 * prose, so pulling the text out of each top-level block gives correct output
 * without injecting markup we have not sanitised.
 */
export function lexicalToParagraphs(value: unknown): string[] {
  const root = (value as LexicalValue)?.root;
  if (!root?.children) return [];

  return root.children
    .map((node) => collectText(node).replace(/\s+/g, " ").trim())
    .filter((text) => text.length > 0);
}

function collectText(node: LexicalNode): string {
  if (typeof node.text === "string") return node.text;
  if (!node.children) return "";
  return node.children.map(collectText).join("");
}
