import Head from "next/head";
import React from "react";

export default function WebSiteSeo() {
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Licorería Spondulus",
            url: "https://www.licoreriaspondylus.com",
          }),
        }}
      />
    </Head>
  );
}
