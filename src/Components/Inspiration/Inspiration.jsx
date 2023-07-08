import { inspirations } from "../../../data/food";

const Inspiration = () => {
  return (
    <div className="flex">
      <h3>Inspiration for your first order</h3>
      <div className="d-flex flex-col gap-5 mt-4">
        {inspirations.map((ins) => (
          <div key={ins.id} className="flex justify-content-center">
            <img
              width="130"
              height="130"
              style={{ borderRadius: "50%" }}
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

export default Inspiration;
