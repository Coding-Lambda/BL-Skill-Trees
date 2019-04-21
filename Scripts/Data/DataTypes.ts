namespace BLST.Data {
    export interface GameInfo {
        readonly id: string;
        readonly name: string;
        readonly classes: ClassInfo[];
    }

    export interface ClassInfo {
        readonly characterName: string;
        readonly className: string;
        // TODO: action skill
        readonly skillTrees: [SkillTree, SkillTree, SkillTree];
    }

    export interface SkillTree {
        readonly color: SkillTreeColor;
        readonly name: string;
        readonly tiers: [
            SkillTreeTier?,
            SkillTreeTier?,
            SkillTreeTier?,
            SkillTreeTier?,
            SkillTreeTier?,
            SkillTreeTier?,
        ];
    }

    export type SkillTreeColor = "red" | "green" | "blue";

    export interface SkillTreeTier {
        readonly slots: [
            Skill?,
            Skill?,
            Skill?,
        ];
        readonly requiredTotalTreePoints: number;
    }

    export const EMPTY_SLOT = undefined;

    export interface Skill {
        // Maybe used later, right now we identify by the name
        //readonly id: string;
        readonly name: string;
        readonly iconUrl: string;
        readonly maxPoints: number;
        readonly textRenderer: SkillTextRenderer;
        readonly variables?: SkillVariable[];
    }

    export type SkillTextRenderer = preact.FunctionalComponent<SkillTextRendererProps>;

    export interface SkillTextRendererProps {
        currentPoints: number,
        variables?: Skill["variables"],
    }

    export type SkillVariable = LinearSkillVariable | CalculatedSkillVariable;

    export interface LinearSkillVariable {
        readonly type: "linear";
        readonly baseValue: number;
        readonly prefix?: string;
        readonly suffix?: string;
        readonly incrementPerPoint: number;
    }

    export interface CalculatedSkillVariable {
        readonly type: "calculated";
        readonly baseValue: number;
        readonly prefix?: string;
        readonly suffix?: string;
        readonly calculator: SkillValueCalculator;
    }

    export type SkillValueCalculator = (base: number, currentPoints: number) => number;

    export const PER_LEVEL = "per level";
}