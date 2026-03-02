export default function TableInfo({
  notFoundCoordinatesCount,
  notFoundDirectionsCount,
  onDownload,
}) {
  return (
    <>
      <div className="table-not-found">
        <div>
          <span>Endereços não encontrados:</span>
          <span> {notFoundCoordinatesCount}</span>
        </div>

        <div>
          <span>Erros ao calcular distâncias:</span>
          <span> {notFoundDirectionsCount}</span>
        </div>
      </div>

      <div className="download-button-wrapper">
        <button className="download-button" onClick={onDownload}>
          Baixar planilha ordenada
        </button>
      </div>
    </>
  );
}
