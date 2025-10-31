import { FileText, Download } from 'lucide-react';

const PDFViewer = ({ url, title }) => {
  return (
    <div className="pdf-viewer-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileText size={24} />
          {title}
        </h3>
        <a
          href={url}
          download
          className="btn btn-outline"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Download size={16} />
          Download PDF
        </a>
      </div>
      <iframe
        src={url}
        className="pdf-embed"
        title={title}
      >
        <p>
          Your browser does not support PDFs.
          <a href={url} download> Download the PDF</a>
        </p>
      </iframe>
    </div>
  );
};

export default PDFViewer;
