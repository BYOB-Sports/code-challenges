export const CourtPageSection = (props) => {
  const { title, children } = props;

  const titleKey = title.split(" ").join("_");

  return (
    <div className="mb-3 pb-1 border-bottom border-2">
      <div className="h-title">
        <button
          className="me-1 btn btn-sm btn-outline-dark w-100"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#court_page_section_${titleKey}`}
          aria-expanded="false"
          aria-controls={`court_page_section_${titleKey}`}
        >
          <h2>{title}</h2>
        </button>
      </div>
      <div className="collapse py-1" id={`court_page_section_${titleKey}`}>
        {children}
      </div>
    </div>
  );
};
