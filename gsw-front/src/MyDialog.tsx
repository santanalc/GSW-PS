import * as React from "react";

const title = "Hello React";

function MyDialog() {
  const [search, setSearch] = React.useState("");

  function handleChange(event: {
    target: { value: React.SetStateAction<string> };
  }) {
    setSearch(event.target.value);
  }

  return (
    <div>
      <Search value={search} onChange={handleChange}>
        Search:
      </Search>

      <p>Searches for {search ? search : "..."}</p>
    </div>
  );
}

function Search(prop: any) {
  return (
    <div>
      <label htmlFor="search">{prop.children}</label>
      <input
        id="search"
        type="text"
        value={prop.value}
        onChange={prop.onChange}
      />
    </div>
  );
}
export default MyDialog;