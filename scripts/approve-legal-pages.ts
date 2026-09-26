import { getPayloadClient } from "@/lib/payload";

async function main() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "legal-pages",
    limit: 50,
  });

  if (docs.length === 0) {
    console.log("No legal-pages records found.");
    return;
  }

  for (const doc of docs) {
    await payload.update({
      collection: "legal-pages",
      id: doc.id,
      data: {
        published: true,
        reviewRequired: false,
      },
    });
    console.log(`✓ Approved ${doc.slug}`);
  }

  console.log(`\nUpdated ${docs.length} legal page(s).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
