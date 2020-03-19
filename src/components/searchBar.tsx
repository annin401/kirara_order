import React from 'react';

// type SearchBarProps = {
//   onChange: () => void;
//   onSubmit: () => void;
// };

const SearchBar = (/*props: SearchBarProps*/) => {
  return (
    <form>
      <input
        type="search"
        name="title"
        autoComplete="off"
        placeholder="作品名を入力してください"
      />
    </form>
  );
};

export default SearchBar;
