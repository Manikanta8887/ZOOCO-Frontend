export default function FilterBar({ filter, setFilter }) {
    return (
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Filter by pet"
          value={filter.pet}
          onChange={(e) => setFilter({ ...filter, pet: e.target.value })}
          className="border p-2 rounded"
        />
        <select
          value={filter.category}
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          <option value="General">General</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Health">Health</option>
        </select>
      </div>
    );
  }
  