export const ChartIframe = ({ chartHtml }: { chartHtml: string }) => {
  return (
    <iframe
      srcDoc={chartHtml}
      style={{ width: '100%', height: '500px' }}
      sandbox="allow-scripts allow-same-origin"
    />
  );
};
