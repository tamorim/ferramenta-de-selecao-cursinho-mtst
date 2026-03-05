type TableInfoProps = {
  notFoundCoordinatesCount: number;
  notFoundDirectionsCount: number;
  onDownload: () => void;
};

export default function TableInfo({
  notFoundCoordinatesCount,
  notFoundDirectionsCount,
  onDownload,
}: TableInfoProps) {
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

      {/* TODO: Fix generated sheet */}
      <div className="download-button-wrapper" style={{ display: "none" }}>
        <button className="download-button" onClick={onDownload}>
          Baixar planilha ordenada
        </button>
      </div>
    </>
  );
}
