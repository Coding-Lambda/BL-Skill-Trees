namespace BLST.Components {
    export const SkillVariable: preact.FunctionalComponent<Props> = ({ currentPoints, variable }) => {
        const hasPoints = currentPoints > 0;
        const pointsForCalculation = hasPoints ?
            currentPoints :
            1; // If 0 points invested, show stats of level 1

        let displayedValue: number;
        switch (variable.type) {
            case "calculated":
                displayedValue = variable.calculator(variable.baseValue, pointsForCalculation);
                break;
            case "linear":
                displayedValue = variable.baseValue + (variable.incrementPerPoint * pointsForCalculation);
                break;
            default:
                throw new Error("Not implemented");
        }

        return (
            <span class={generateCssClass(
                "component-skill-variable",
                `-type-${variable.type}`,
            )}>
                {variable.prefix}
                {displayedValue}
                {variable.suffix}
            </span>
        );
    };

    interface Props {
        children?: undefined;
        variable: Data.SkillVariable;
        currentPoints: number;
    }
}