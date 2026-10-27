'use client';

import React from 'react';
import { jsPDF } from 'jspdf';

interface AgreementFormatterProps {
  agreement: {
    title: string;
    content: string;
  };
}

const AgreementFormatter: React.FC<AgreementFormatterProps> = ({ agreement }) => {
  // Parse the agreement content to render it with proper formatting
  const formatContent = (content: string) => {
    // First, process the content line by line to handle different cases
    const lines = content.split('\n');
    const processedLines = lines.map(line => {
      // Handle different asterisk scenarios

      // Check if line only contains asterisks (possibly with whitespace)
      if (/^\s*\*+\s*$/.test(line)) {
        return ''; // Remove the line completely
      }

      // Remove asterisks at beginning of lines (section markers)
      let processedLine = line.replace(/^\s*\*+\s*/, '');

      // Process mid-line asterisks for emphasis/formatting - convert to proper HTML
      processedLine = processedLine.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>'); // Bold
      processedLine = processedLine.replace(/\*([^*\n]+)\*/g, '<strong>$1</strong>');  // Also bold

      return processedLine;
    }).filter(line => line !== null && line !== undefined);

    // Join the lines back and handle placeholder text
    const formattedContent = processedLines.join('\n')
      .replace(/\[([^\]]+)\]/g, '<span class="placeholder-input">________________</span><span class="placeholder-text">$1</span>'); // Convert placeholders to fillable lines

    return formattedContent;
  };

  const downloadAsPDF = async () => {
    const element = document.getElementById('agreement-content');
    if (!element) return;

    try {
      // For PDF generation, create a clean version without HTML tags
      const cleanContent = agreement.content.split('\n').map(line => {
        // Skip lines with only asterisks
        if (/^\s*\*+\s*$/.test(line)) {
          return '';
        }

        // Remove asterisks at beginning and end of lines
        let processedLine = line.replace(/^\s*\*+\s*/, '').replace(/\s*\*+\s*$/, '');

        // Remove emphasis asterisks
        processedLine = processedLine.replace(/\*\*([^*]+)\*\*/g, '$1');
        processedLine = processedLine.replace(/\*([^*\n]+)\*/g, '$1');

        // Replace placeholders with fillable lines
        processedLine = processedLine.replace(/\[([^\]]+)\]/g, '________________');

        return processedLine;
      }).filter(line => line !== null && line !== undefined && line.trim() !== '').join('\n');

      // First handle the standalone section headings
      let formattedContent = cleanContent
        // Make sure standalone capitalized headings have proper spacing
        .replace(/([A-Z][A-Z\s]+):/g, '\n\n$1:\n');

      // Look for numbered section headings separately and format them correctly
      formattedContent = formattedContent
        // Make sure numbered section headings have proper formatting
        .replace(/\n\n(\d+)\.\s*\n\n([A-Z][A-Z\s]+):/g, '\n\n$1. $2:')
        // Clean up any triple or more line breaks
        .replace(/\n{3,}/g, '\n\n');

      // Create a new PDF document
      const pdf = new jsPDF('p', 'mm', 'a4');

      // Set document properties
      pdf.setProperties({
        title: agreement.title || 'Contrato Jurídico',
        subject: 'Documento de Contrato Jurídico',
        author: 'Pequi',
        creator: 'Criador de Documentos Pequi'
      });

      // Define margins and dimensions
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20; // 20mm margins
      const contentWidth = pageWidth - (margin * 2);
      let y = margin; // Starting y position

      // Add title
      pdf.setFont("times", "bold");
      pdf.setFontSize(16);
      pdf.setTextColor(0, 0, 0);

      const title = agreement.title?.toUpperCase() || 'CONTRATO JURÍDICO';
      const titleWidth = pdf.getStringUnitWidth(title) * 16 / pdf.internal.scaleFactor;
      const titleX = (pageWidth - titleWidth) / 2;
      pdf.text(title, titleX, y);
      y += 15;

      // Add content with word wrap
      pdf.setFont("times", "normal");
      pdf.setFontSize(12);

      // Split content into lines with proper wrapping
      const textLines = pdf.splitTextToSize(formattedContent, contentWidth);


      // Add text with pagination
      for (let i = 0; i < textLines.length; i++) {
        if (y > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }

        // Check if this is a section heading (all caps followed by colon)
        if (/^[0-9]+\.\s*[A-Z][A-Z\s]+:/.test(textLines[i]) || /^[A-Z][A-Z\s]+:/.test(textLines[i])) {
          pdf.setFont("times", "bold");
          pdf.text(textLines[i], margin, y);
          pdf.setFont("times", "normal");

          // Add extra space after headings
          y += 8; // Extra space
        } else {
          pdf.text(textLines[i], margin, y);
          y += 6; // Regular line height
        }
      }

      // Add signature lines at the end
      if (y > pageHeight - 50) {
        pdf.addPage();
        y = margin;
      }

      y += 20; // Space before signatures

      // Draw signature lines
      pdf.line(margin, y, margin + 70, y);
      pdf.line(pageWidth - margin - 70, y, pageWidth - margin, y);

      y += 5;
      pdf.setFont("times", "bold");
      pdf.setFontSize(11);
      pdf.text("Assinatura", margin, y);
      pdf.text("Assinatura", pageWidth - margin - 70, y);

      y += 15;
      pdf.line(margin, y, margin + 70, y);
      pdf.line(pageWidth - margin - 70, y, pageWidth - margin, y);

      y += 5;
      pdf.text("Nome completo", margin, y);
      pdf.text("Nome completo", pageWidth - margin - 70, y);

      y += 15;
      pdf.line(margin, y, margin + 70, y);
      pdf.line(pageWidth - margin - 70, y, pageWidth - margin, y);

      y += 5;
      pdf.text("Data", margin, y);
      pdf.text("Data", pageWidth - margin - 70, y);

      // Add page numbers and footer to all pages
      const totalPages = pdf.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);
        pdf.setTextColor(80, 80, 80); // Darker gray for better readability
        pdf.text(`Pequi | Contrato Jurídico | Gerado em ${new Date().toLocaleDateString('pt-BR')}`, margin, pageHeight - margin);
        pdf.text(`Página ${i} de ${totalPages}`, pageWidth - margin, pageHeight - margin, { align: 'right' });
      }

      // Save the PDF
      pdf.save(`${agreement.title.replace(/\s+/g, '-').toLowerCase()}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl border border-castanha-100 shadow-sm">
        <h2 className="text-xl font-bold text-foreground">{agreement.title}</h2>
        <button
          onClick={downloadAsPDF}
          className="flex items-center gap-2 px-5 py-2.5 bg-cerrado-800 hover:bg-cerrado-900 text-white rounded-lg transition-all shadow-md font-medium hover:scale-[1.02]"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4-4v12" />
          </svg>
          Baixar PDF
        </button>
      </div>

      <div
        id="agreement-content"
        className="bg-white text-ink p-12 rounded-2xl shadow-xl border border-castanha-100"
      >
        <div className="agreement-document">
          <h1 className="text-center text-2xl font-bold mb-8">{agreement.title}</h1>

          <div
            className="agreement-body"
            dangerouslySetInnerHTML={{ __html: formatContent(agreement.content) }}
          />

          <div className="signature-section mt-12 pt-6 border-t border-castanha-300">
            <div className="grid grid-cols-2 gap-12">
              <div className="signature-block">
                <div className="h-16 border-b border-cerrado-900 mb-2"></div>
                <p className="font-semibold">Assinatura do Locador</p>
                <p className="text-sm text-castanha-600">Data: ________________</p>
              </div>
              <div className="signature-block">
                <div className="h-16 border-b border-cerrado-900 mb-2"></div>
                <p className="font-semibold">Assinatura do Locatário</p>
                <p className="text-sm text-castanha-600">Data: ________________</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .agreement-document {
          font-family: 'Times New Roman', Times, serif;
          line-height: 1.6;
          color: #333;
        }
        
        .agreement-body {
          margin-bottom: 2rem;
        }
        
        .agreement-body h2 {
          font-size: 1.25rem;
          font-weight: bold;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        
        .agreement-body p {
          margin-bottom: 1rem;
          text-align: justify;
        }
        
        .placeholder-input {
          display: inline-block;
          min-width: 150px;
          border-bottom: 1px solid #000;
          margin-right: 5px;
        }
        
        .placeholder-text {
          color: #666;
          font-style: italic;
          font-size: 0.85em;
          display: none;
        }
        
        @media print {
          .placeholder-text {
            display: none;
          }
        }
        
        .signature-section {
          page-break-inside: avoid;
        }
      `}</style>
    </div>
  );
};

export default AgreementFormatter; 