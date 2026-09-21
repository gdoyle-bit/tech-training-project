import type { Direction } from "../types/recipe";

interface DirectionsListProps {
  directions: Direction[];
}

export default function DirectionsList({
  directions,
}: DirectionsListProps) {
  return (
    <section>
      <h2>Directions</h2>

      {directions.length === 0 ? (
        <p>No directions listed.</p>
      ) : (
        <ol>
          {directions.map((direction) => (
            <li key={direction.DirectionId}>
              {direction.Instruction}
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}