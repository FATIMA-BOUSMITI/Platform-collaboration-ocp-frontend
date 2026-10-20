export function textWithMentions(
  text: string,
  ids: string[],
  people: Map<string, string>,
) {
  return [
    text.trim(),
    ...ids.map((id) => "@" + (people.get(id) || "Collaborateur")),
  ]
    .filter(Boolean)
    .join(" ");
}
export default function MentionPicker({
  people,
  selected,
  onChange,
  disabled = false,
}: {
  people: Map<string, string>;
  selected: string[];
  onChange: (ids: string[]) => void;
  disabled?: boolean;
}) {
  if (!people.size) return null;
  return (
    <details className="mention-picker">
      <summary>
        Mentionner un collaborateur
        {selected.length ? " (" + selected.length + ")" : ""}
      </summary>
      <div>
        {Array.from(people, ([id, name]) => (
          <label key={id}>
            <input
              type="checkbox"
              disabled={
                disabled || (!selected.includes(id) && selected.length >= 20)
              }
              checked={selected.includes(id)}
              onChange={(e) =>
                onChange(
                  e.target.checked
                    ? [...selected, id]
                    : selected.filter((v) => v !== id),
                )
              }
            />
            {name}
          </label>
        ))}
      </div>
    </details>
  );
}
