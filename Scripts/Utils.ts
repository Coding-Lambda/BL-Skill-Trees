namespace BLST {
    export const BASE_PATH = "/BL-Skill-Trees";

    export function createRootedPath(pathPart: string): string {
        let result = BASE_PATH;

        if (pathPart.length == 0 || pathPart[0] != "/") {
            result += "/";
        }

        result += pathPart;

        return result;
    }

    /**
     * Helper function to easily create css classes in preact
     * @param classNames
     */
    export function generateCssClass(...classNames: (string | false | null | undefined)[]): string {
        return classNames
            .filter(name => typeof name == "string")
            .join(" ");
    }

    export type Nullable<T> = T | null | undefined;

    export function stringEqualsIgnoreCase(a: Nullable<string>, b: Nullable<string>): boolean {
        return a == null || b == null ?
            a == b :
            a.toUpperCase() == b.toUpperCase(); // prone to the "Turkish i"-problem
    }

    export function arrayFirstOrNull<T>(array: T[], predicate: (item: T) => boolean): Nullable<T> {
        for (let item of array) {
            if (predicate(item))
                return item;
        }

        return null;
    }
}