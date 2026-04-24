"use client";

import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Loader2 } from 'lucide-react';

// On configure le worker ici
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfViewer() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(800);

  useEffect(() => {
    setContainerWidth(Math.min(window.innerWidth - 48, 1200));
  }, []);

  return (
    <div className="w-full bg-white flex justify-center">
      <Document
        file="/visitedusiege.pdf"
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading={
          <div className="flex flex-col items-center p-10">
            <Loader2 className="animate-spin text-blue-600 mb-2" />
            <p>Chargement du PDF...</p>
          </div>
        }
      >
        {Array.from(new Array(numPages || 0), (_, index) => (
          <div key={`page_${index + 1}`} className="mb-4 shadow-md">
            <Page 
              pageNumber={index + 1} 
              width={containerWidth}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </div>
        ))}
      </Document>
    </div>
  );
}