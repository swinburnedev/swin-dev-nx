export interface IChip {
  id: string,
  name: string,
  icon?: {
    description: string,
    url: string
  }
}

interface ChipsProps {
  chips: Array<IChip>;
}

export function Chips({chips}: ChipsProps) {
  return (
    <div className="flex flex-wrap space-x-2 justify-end">
      { chips.map(chip => {
        const { name, icon } = chip;
        return (
          <span
            className="rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max">
            { icon && <img className="rounded-full w-9 h-9 pl-3 max-w-none" alt={icon.description}
              src={icon.url} /> }
            <span className="flex items-center pl-2 pr-3 py-2">
              {name}
            </span>
          </span>
        )
      })}
    </div>
  );
}

export default Chips;
