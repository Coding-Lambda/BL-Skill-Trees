namespace BLST.Views {
    export const GameInfo: preact.FunctionalComponent<Props> =
        ({ gameId }) => {
            let gameInfo = arrayFirstOrNull(Data.games, game => game.id == gameId);

            return (
                <div class="view-game-info">
                    {gameInfo == null ?
                        <h2>No game with id '{gameId}' was found</h2>
                        :
                        <Components.ClassList game={gameInfo} />
                    }
                    <Components.RenderJson data={gameInfo} />
                </div>
            );
        };

    interface Props extends preactRouter.RoutableProps {
        gameId?: string;
    }
}