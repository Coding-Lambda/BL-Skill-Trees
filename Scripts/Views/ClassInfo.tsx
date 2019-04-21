namespace BLST.Views {
    export const ClassInfo: preact.FunctionalComponent<Props> =
        ({ className, gameId }) => {
            let gameInfo = arrayFirstOrNull(Data.games, game => game.id == gameId);

            if (gameInfo == null)
                throw "TODO";

            let classInfo = arrayFirstOrNull(gameInfo.classes, c => c.className == className);

            if (classInfo == null)
                throw "TODO";

            return (
                <Components.RenderJson data={classInfo} />
            );
        };

    interface Props extends preactRouter.RoutableProps {
        gameId?: string;
        className?: string;
    }
}