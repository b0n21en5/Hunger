import { brands } from "../../../data/food";

const Brands = () => {
  return (
    <div className="flex" style={{ padding: "20px 82px" }}>
      <h3>Top brands for you</h3>
      <div className="d-flex flex-col gap-5 mt-4">
        {brands.map((ins) => (
          <div key={ins.id} className="flex justify-content-center">
            <img
              style={{
                width: "148px",
                height: "150px",
                background: "#f8f8f8 ",
                borderRadius: "50%",
                boxShadow: "rgba(0, 0, 0, 0.08) 0px 3px 12px 0px",
              }}
              src={ins.img}
              alt={ins.title}
              className="mb-1"
            />
            <div className="text-center font-weight-bold">{ins.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
