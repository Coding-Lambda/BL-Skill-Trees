///<reference path="../DataTypes.ts" />
namespace BLST.Data.BL2 {
    export const maya: ClassInfo = {
        characterName: "Maya",
        className: "Siren",
        skillTrees: [
            {
                name: "Motion",
                color: "green",
                tiers: [
                    {
                        requiredTotalTreePoints: 0,
                        slots: [
                            {
                                name: "Ward",
                                iconUrl: "TODO",
                                maxPoints: 5,
                                textRenderer: props => {
                                    const {
                                        SkillVariable,
                                    } = Components;

                                    return (
                                        <span>
                                            <SkillVariable
                                                variable={props.variables![0]}
                                                currentPoints={props.currentPoints}
                                            />
                                            % Shield Capacity and <SkillVariable
                                                variable={props.variables![1]}
                                                currentPoints={props.currentPoints}
                                            />
                                            % Shield Recharge Delay
                                            {props.currentPoints == 0 &&
                                                ` ${PER_LEVEL}`
                                            }
                                            .
                                        </span>
                                    );
                                },
                                variables: [
                                    {
                                        type: "linear",
                                        baseValue: 0,
                                        incrementPerPoint: 5,
                                        prefix: "+ ",
                                    },
                                    {
                                        type: "linear",
                                        baseValue: 0,
                                        incrementPerPoint: 8,
                                        prefix: "- ",
                                    },
                                ],
                            },
                            EMPTY_SLOT,
                            {
                                name: "Accelerate",
                                iconUrl: "TODO",
                                maxPoints: 5,
                                textRenderer: props => (
                                    <span>
                                        TODO
                                    </span>
                                ),
                                variables: [

                                ],
                            },
                        ],
                    },
                ],
            },
            {
                name: "harmony",
                color: "blue",
                tiers: [

                ],
            },
            {
                name: "Cataclysm",
                color: "red",
                tiers: [

                ],
            },
        ],
    }
}