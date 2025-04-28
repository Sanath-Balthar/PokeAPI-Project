const DisplayItems = ({ props }) => {
  return (
    <div className=" md:grid md:grid-cols-5 md:gap-20 my-10 md:p-5 rounded-2xl shadow-3xl">
      {props.length !== 0 ? (
        props.map((pokemon, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center m-5 p-2 rounded-xl shadow-2xl bg-white border-5 border-amber-400 hover:bg-amber-500 hover:border-amber-700"
            >
              <h1 className="text-center text-xl font-bold">{pokemon.name}</h1>
              <img src={pokemon.image} />
              <p>Id: {pokemon.id}</p>
              <p>
                Types:{" "}
                {pokemon.types.map((types) => types.type.name).join(", ")}
              </p>
            </div>
          );
        })
      ) : (
        <div className="w-full h-full text-center mt-10 ">No Pokemon Found</div>
      )}
    </div>
  );
};

export default DisplayItems;
