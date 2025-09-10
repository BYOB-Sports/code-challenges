
export const QuickLine = (props) => {
  const { keys } = props;


  return (
    <div className="border-bottom border-primary border-3 pb-1 mb-2">
      <div className="d-flex flex-wrap">
        {keys.map((keyData) => {
          const {  value = "n/a", label ='n/a' } = keyData;


          return (
            <div
              key={label}
              className="border border-dark border-3 mb-1 rounded me-2 d-flex align-items-center "
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                // width,
              }}
            >
              <span className="p-1">{label}</span>
              <div
                style={
                  {
                    // minWidth: 100,
                  }
                }
                className="bg-secondary p-1 text-light"
              >
                {value}
              </div>
            </div>
          );
        })}
      </div>


    </div>
  );
};
