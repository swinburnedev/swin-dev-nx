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
    <div className="flex space-x-2 mt-4 md:justify-end md:mt-0">
      { chips.map(chip => {
        const { id, name, icon } = chip;
        return (
          <span
            key={id}
            className="rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center max-h-10">
            { icon && <img className="rounded-full w-9 h-9 pl-3 max-w-none" alt={icon.description}
              src={icon.url} /> }
            <span className="flex items-center pl-2 pr-4 py-2">
              {name}
            </span>
          </span>
        )
      })}
    </div>
  );
}

export default Chips;
